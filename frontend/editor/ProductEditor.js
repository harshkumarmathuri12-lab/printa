import { useEffect, useMemo, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { jsPDF } from 'jspdf';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  Download,
  Grid3X3,
  ImagePlus,
  Plus,
  Redo2,
  Save,
  ShoppingCart,
  Trash2,
  Type,
  Undo2
} from 'lucide-react';
import { useRouter } from 'next/router';
import { useCart } from '../lib/cart';
import { useCurrency } from '../lib/currency';

const GRID_SIZE = 24;

export default function ProductEditor({ product, templates, variantConfig }) {
  const router = useRouter();
  const canvasElementRef = useRef(null);
  const canvasRef = useRef(null);
  const historyRef = useRef([]);
  const redoRef = useRef([]);
  const skipHistoryRef = useRef(false);
  const fileRef = useRef(null);
  const snapRef = useRef(true);
  const [selected, setSelected] = useState(null);
  const [layers, setLayers] = useState([]);
  const [snap, setSnap] = useState(true);
  const [status, setStatus] = useState('Draft');
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    snapRef.current = snap;
  }, [snap]);

  const dimensions = useMemo(() => getWorkingDimensions(product), [product]);
  const unitPriceCents = useMemo(() => {
    const delta = Object.values(variantConfig || {}).reduce((sum, value) => {
      const variant = product.variants.find((candidate) => candidate.optionValue === value);
      return sum + (variant?.priceDeltaCents || 0);
    }, 0);
    return product.basePriceCents + delta;
  }, [product, variantConfig]);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasElementRef.current, {
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true
    });

    canvasRef.current = canvas;
    addBlankBackground(canvas, dimensions);

    const record = () => {
      if (skipHistoryRef.current) return;
      historyRef.current.push(JSON.stringify(canvas.toJSON(['name', 'locked'])));
      redoRef.current = [];
      refreshLayers();
      setStatus('Unsaved changes');
    };

    const handleSelection = () => {
      setSelected(canvas.getActiveObject() || null);
      refreshLayers();
    };

    canvas.on('object:added', record);
    canvas.on('object:modified', record);
    canvas.on('object:removed', record);
    canvas.on('selection:created', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleSelection);
    canvas.on('object:moving', (event) => {
      if (!snapRef.current || !event.target) return;
      event.target.set({
        left: Math.round(event.target.left / GRID_SIZE) * GRID_SIZE,
        top: Math.round(event.target.top / GRID_SIZE) * GRID_SIZE
      });
    });

    historyRef.current = [JSON.stringify(canvas.toJSON(['name', 'locked']))];
    refreshLayers();

    return () => {
      canvas.dispose();
      canvasRef.current = null;
    };
  }, [dimensions.height, dimensions.width]);

  function refreshLayers() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setLayers(
      canvas
        .getObjects()
        .map((object, index) => ({
          id: object.__uid || `${object.type}-${index}`,
          index,
          label: object.name || object.text || object.type,
          type: object.type,
          locked: object.locked || object.selectable === false
        }))
        .reverse()
    );
  }

  function addText() {
    const canvas = canvasRef.current;
    const text = new fabric.Textbox('Edit this text', {
      left: 96,
      top: 96,
      width: 360,
      fontSize: 42,
      fontFamily: 'Inter',
      fill: '#17211f',
      name: 'Text layer'
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
  }

  function addShape() {
    const canvas = canvasRef.current;
    const rect = new fabric.Rect({
      left: 120,
      top: 120,
      width: 220,
      height: 140,
      fill: '#1f6f68',
      rx: 8,
      ry: 8,
      name: 'Color block'
    });
    canvas.add(rect);
    canvas.setActiveObject(rect);
    canvas.renderAll();
  }

  function uploadImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      fabric.Image.fromURL(reader.result, (image) => {
        image.set({ left: 120, top: 120, name: file.name });
        image.scaleToWidth(Math.min(360, dimensions.width / 2));
        canvasRef.current.add(image);
        canvasRef.current.setActiveObject(image);
        canvasRef.current.renderAll();
      });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  }

  function applyTemplate(template) {
    const canvas = canvasRef.current;
    skipHistoryRef.current = true;
    canvas.loadFromJSON(template.fabricJson, () => {
      canvas.setWidth(dimensions.width);
      canvas.setHeight(dimensions.height);
      const bounds = getTemplateBounds(template.fabricJson);
      const scale = Math.min(dimensions.width / bounds.width, dimensions.height / bounds.height);
      canvas.getObjects().forEach((object) => {
        object.scaleX *= scale;
        object.scaleY *= scale;
        object.left *= scale;
        object.top *= scale;
        object.setCoords();
        if (!object.name) object.set('name', object.text || object.type);
      });
      canvas.renderAll();
      skipHistoryRef.current = false;
      historyRef.current.push(JSON.stringify(canvas.toJSON(['name', 'locked'])));
      redoRef.current = [];
      refreshLayers();
      setStatus(`Loaded ${template.name}`);
    });
  }

  function updateActive(props) {
    const canvas = canvasRef.current;
    const object = canvas.getActiveObject();
    if (!object) return;
    object.set(props);
    canvas.requestRenderAll();
    historyRef.current.push(JSON.stringify(canvas.toJSON(['name', 'locked'])));
    refreshLayers();
  }

  function deleteActive() {
    const canvas = canvasRef.current;
    const object = canvas.getActiveObject();
    if (!object || object.selectable === false) return;
    canvas.remove(object);
    setSelected(null);
    canvas.requestRenderAll();
  }

  function moveLayer(direction) {
    const canvas = canvasRef.current;
    const object = canvas.getActiveObject();
    if (!object) return;
    if (direction === 'up') canvas.bringForward(object);
    if (direction === 'down') canvas.sendBackwards(object);
    canvas.requestRenderAll();
    refreshLayers();
  }

  function undo() {
    const canvas = canvasRef.current;
    if (historyRef.current.length < 2) return;
    redoRef.current.push(historyRef.current.pop());
    loadHistoryState(historyRef.current[historyRef.current.length - 1], canvas);
  }

  function redo() {
    const canvas = canvasRef.current;
    const next = redoRef.current.pop();
    if (!next) return;
    historyRef.current.push(next);
    loadHistoryState(next, canvas);
  }

  function loadHistoryState(state, canvas) {
    skipHistoryRef.current = true;
    canvas.loadFromJSON(JSON.parse(state), () => {
      canvas.renderAll();
      skipHistoryRef.current = false;
      refreshLayers();
    });
  }

  function exportPng() {
    const dataUrl = getPngDataUrl();
    downloadDataUrl(dataUrl, `${product.slug}-design.png`);
  }

  function exportPdf() {
    const dataUrl = getPngDataUrl();
    const pdf = new jsPDF({
      orientation: dimensions.width > dimensions.height ? 'landscape' : 'portrait',
      unit: 'in',
      format: [product.printWidthIn + product.bleedIn * 2, product.printHeightIn + product.bleedIn * 2]
    });
    pdf.addImage(dataUrl, 'PNG', 0, 0, product.printWidthIn + product.bleedIn * 2, product.printHeightIn + product.bleedIn * 2);
    pdf.save(`${product.slug}-print-ready.pdf`);
  }

  function getPngDataUrl() {
    const targetWidth = Math.round((product.printWidthIn + product.bleedIn * 2) * (product.dpi || 300));
    const multiplier = Math.max(1, targetWidth / dimensions.width);
    return canvasRef.current.toDataURL({ format: 'png', multiplier, enableRetinaScaling: false });
  }

  function addToCart() {
    const canvas = canvasRef.current;
    const previewDataUrl = canvas.toDataURL({ format: 'png', multiplier: 0.5 });
    addItem({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      variantConfig,
      unitPriceCents,
      previewDataUrl,
      designSnapshot: canvas.toJSON(['name', 'locked'])
    });
    setStatus('Added to cart');
    router.push('/cart');
  }

  return (
    <section className="grid min-h-[calc(100vh-61px)] grid-cols-1 bg-[#eef1ec] lg:grid-cols-[300px_1fr_320px]">
      <aside className="border-b border-black/10 bg-white p-4 lg:border-b-0 lg:border-r">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-sea">Customize</p>
        <h1 className="mt-2 text-2xl font-black">{product.name}</h1>
        <p className="mt-1 text-sm text-black/60">{formatPrice(unitPriceCents)} each</p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <ToolButton icon={<Type size={18} />} label="Add text" onClick={addText} />
          <ToolButton icon={<Plus size={18} />} label="Shape" onClick={addShape} />
          <ToolButton icon={<ImagePlus size={18} />} label="Image" onClick={() => fileRef.current?.click()} />
          <ToolButton icon={<Grid3X3 size={18} />} label={snap ? 'Snap on' : 'Snap off'} active={snap} onClick={() => setSnap((value) => !value)} />
        </div>
        <input ref={fileRef} className="hidden" type="file" accept="image/*" onChange={uploadImage} />

        <div className="mt-6">
          <h2 className="text-sm font-black">Templates</h2>
          <div className="mt-3 space-y-2">
            {templates.map((template) => (
              <button className="w-full rounded-md border border-black/10 bg-paper p-3 text-left font-semibold hover:border-sea" key={template.id} onClick={() => applyTemplate(template)}>
                {template.name}
              </button>
            ))}
            {!templates.length && <p className="text-sm text-black/55">No templates for this product yet.</p>}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <IconButton label="Undo" onClick={undo}><Undo2 size={18} /></IconButton>
          <IconButton label="Redo" onClick={redo}><Redo2 size={18} /></IconButton>
          <IconButton label="PNG" onClick={exportPng}><Download size={18} /></IconButton>
          <IconButton label="PDF" onClick={exportPdf}><Save size={18} /></IconButton>
        </div>
      </aside>

      <div className="overflow-auto p-5">
        <div className="mx-auto flex min-h-full w-max items-center justify-center">
          <div className="editor-grid rounded-lg border border-black/10 bg-white p-6 shadow-panel">
            <canvas ref={canvasElementRef} />
          </div>
        </div>
      </div>

      <aside className="border-t border-black/10 bg-white p-4 lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-sea">State</p>
            <p className="text-sm font-semibold">{status}</p>
          </div>
          <button className="inline-flex items-center gap-2 rounded-md bg-coral px-4 py-2 font-black text-white" onClick={addToCart}>
            <ShoppingCart size={18} /> Cart
          </button>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-black">Properties</h2>
          <PropertyPanel selected={selected} updateActive={updateActive} deleteActive={deleteActive} moveLayer={moveLayer} />
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-black">Layers</h2>
          <div className="mt-3 max-h-80 overflow-auto rounded-md border border-black/10">
            {layers.map((layer) => (
              <button
                className="flex w-full items-center justify-between border-b border-black/10 px-3 py-2 text-left text-sm last:border-b-0 hover:bg-paper"
                key={`${layer.id}-${layer.index}`}
                onClick={() => {
                  const object = canvasRef.current.getObjects()[layer.index];
                  if (object?.selectable === false) return;
                  canvasRef.current.setActiveObject(object);
                  canvasRef.current.requestRenderAll();
                  setSelected(object);
                }}
              >
                <span className="truncate">{layer.label}</span>
                <span className="text-xs text-black/45">{layer.type}</span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

function PropertyPanel({ selected, updateActive, deleteActive, moveLayer }) {
  if (!selected) {
    return <p className="mt-3 rounded-md bg-paper p-3 text-sm text-black/60">Select an element to edit its color, type, alignment, and stacking order.</p>;
  }

  const isText = selected.type === 'textbox' || selected.type === 'text' || selected.type === 'i-text';

  return (
    <div className="mt-3 space-y-3">
      {isText && (
        <>
          <textarea
            className="min-h-24 w-full rounded-md border border-black/15 p-2 text-sm"
            defaultValue={selected.text}
            onBlur={(event) => updateActive({ text: event.target.value })}
          />
          <div className="grid grid-cols-2 gap-2">
            <input className="rounded-md border border-black/15 px-2 py-2" type="number" defaultValue={selected.fontSize || 36} onChange={(event) => updateActive({ fontSize: Number(event.target.value) })} />
            <select className="rounded-md border border-black/15 px-2 py-2" defaultValue={selected.fontFamily || 'Inter'} onChange={(event) => updateActive({ fontFamily: event.target.value })}>
              <option>Inter</option>
              <option>Arial</option>
              <option>Georgia</option>
              <option>Courier New</option>
            </select>
          </div>
          <div className="flex gap-2">
            <IconButton label="Left" onClick={() => updateActive({ textAlign: 'left' })}><AlignLeft size={17} /></IconButton>
            <IconButton label="Center" onClick={() => updateActive({ textAlign: 'center' })}><AlignCenter size={17} /></IconButton>
            <IconButton label="Right" onClick={() => updateActive({ textAlign: 'right' })}><AlignRight size={17} /></IconButton>
          </div>
        </>
      )}
      <label className="flex items-center justify-between rounded-md border border-black/10 px-3 py-2 text-sm font-semibold">
        Color
        <input type="color" defaultValue={selected.fill || '#17211f'} onChange={(event) => updateActive({ fill: event.target.value })} />
      </label>
      <div className="flex gap-2">
        <IconButton label="Forward" onClick={() => moveLayer('up')}><ArrowUp size={17} /></IconButton>
        <IconButton label="Backward" onClick={() => moveLayer('down')}><ArrowDown size={17} /></IconButton>
        <IconButton label="Delete" onClick={deleteActive}><Trash2 size={17} /></IconButton>
      </div>
    </div>
  );
}

function ToolButton({ icon, label, onClick, active }) {
  return (
    <button
      className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-md border px-2 text-sm font-bold ${
        active ? 'border-sea bg-sea text-white' : 'border-black/10 bg-paper hover:border-sea'
      }`}
      onClick={onClick}
      title={label}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function IconButton({ children, label, onClick }) {
  return (
    <button className="rounded-md border border-black/10 bg-white p-2 hover:bg-paper" onClick={onClick} title={label} aria-label={label}>
      {children}
    </button>
  );
}

function getWorkingDimensions(product) {
  const targetWidth = Math.round((product.printWidthIn + product.bleedIn * 2) * (product.dpi || 300));
  const targetHeight = Math.round((product.printHeightIn + product.bleedIn * 2) * (product.dpi || 300));
  const maxSide = 1200;
  const scale = Math.min(1, maxSide / Math.max(targetWidth, targetHeight));
  return {
    width: Math.round(targetWidth * scale),
    height: Math.round(targetHeight * scale)
  };
}

function addBlankBackground(canvas, dimensions) {
  const background = new fabric.Rect({
    left: 0,
    top: 0,
    width: dimensions.width,
    height: dimensions.height,
    fill: '#ffffff',
    selectable: false,
    evented: false,
    locked: true,
    name: 'Print background'
  });
  canvas.add(background);

  const guide = new fabric.Rect({
    left: GRID_SIZE,
    top: GRID_SIZE,
    width: dimensions.width - GRID_SIZE * 2,
    height: dimensions.height - GRID_SIZE * 2,
    fill: 'transparent',
    stroke: '#d1495b',
    strokeDashArray: [8, 8],
    selectable: false,
    evented: false,
    locked: true,
    name: 'Safe area'
  });
  canvas.add(guide);
}

function downloadDataUrl(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function getTemplateBounds(fabricJson) {
  const objects = fabricJson.objects || [];
  const width = Math.max(1, ...objects.map((object) => (object.left || 0) + (object.width || 0) * (object.scaleX || 1)));
  const height = Math.max(1, ...objects.map((object) => (object.top || 0) + (object.height || 0) * (object.scaleY || 1)));
  return { width, height };
}

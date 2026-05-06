'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, X } from 'lucide-react';
import { quantities } from '../lib/tshirtData';
import { useCartFlow } from './CartContext';

export function UploadModal({ product, onClose }) {
  const inputRef = useRef(null);
  const router = useRouter();
  const { design, setDesign } = useCartFlow();
  const [preview, setPreview] = useState(design.uploadedImage);
  const [designArea, setDesignArea] = useState(design.designArea || 'Full');
  const [quantity, setQuantity] = useState(design.quantity || 25);

  function handleFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setDesign({
        uploadedImage: reader.result,
        designArea,
        quantity,
        productId: product.id,
        productTitle: product.title,
        productImage: product.image
      });
    };
    reader.readAsDataURL(file);
  }

  function next() {
    setDesign({
      uploadedImage: preview,
      designArea,
      quantity,
      productId: product.id,
      productTitle: product.title,
      productImage: product.image
    });
    router.push('/editor');
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950/45">
      <button className="hidden flex-1 cursor-default md:block" aria-label="Close upload modal" onClick={onClose} />
      <section className="ml-auto flex h-full w-full max-w-5xl flex-col bg-white shadow-2xl md:w-[86vw]">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-500">Upload design</p>
            <h2 className="text-xl font-bold text-slate-950">{product.title}</h2>
          </div>
          <button className="rounded-md p-2 hover:bg-slate-100" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="grid min-h-0 flex-1 md:grid-cols-[1fr_320px]">
          <div className="flex min-h-[420px] items-center justify-center bg-slate-50 p-5">
            <div
              className="flex h-full min-h-[340px] w-full max-w-2xl flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white p-8 text-center"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                handleFile(event.dataTransfer.files?.[0]);
              }}
            >
              {preview ? (
                <img className="max-h-72 max-w-full object-contain" src={preview} alt="Uploaded design preview" />
              ) : (
                <>
                  <Upload className="text-slate-400" size={40} />
                  <h3 className="mt-4 text-lg font-bold">Drag and drop your artwork</h3>
                  <p className="mt-2 text-sm text-slate-500">PNG, JPG, or SVG artwork works best.</p>
                </>
              )}
              <input ref={inputRef} className="hidden" type="file" accept="image/*" onChange={(event) => handleFile(event.target.files?.[0])} />
              <button className="mt-6 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold hover:bg-slate-50" onClick={() => inputRef.current?.click()}>
                Choose file
              </button>
            </div>
          </div>

          <aside className="border-l border-slate-200 p-5">
            <label className="text-sm font-bold text-slate-700">Design Area</label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {['Full', 'Left chest'].map((area) => (
                <button
                  key={area}
                  className={`rounded-md border px-3 py-2 text-sm font-bold ${designArea === area ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white'}`}
                  onClick={() => {
                    setDesignArea(area);
                    setDesign({ designArea: area });
                  }}
                >
                  {area}
                </button>
              ))}
            </div>

            <label className="mt-6 block text-sm font-bold text-slate-700" htmlFor="modal-quantity">
              Quantity
            </label>
            <select
              id="modal-quantity"
              className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold"
              value={quantity}
              onChange={(event) => {
                const nextQuantity = Number(event.target.value);
                setQuantity(nextQuantity);
                setDesign({ quantity: nextQuantity });
              }}
            >
              {quantities.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              className="mt-8 w-full rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={!preview}
              onClick={next}
            >
              Next
            </button>
          </aside>
        </div>
      </section>
    </div>
  );
}

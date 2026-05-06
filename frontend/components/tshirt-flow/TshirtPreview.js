export function TshirtPreview({ image, color = 'White', side = 'Front', compact = false }) {
  const shirtColor = {
    White: '#ffffff',
    Black: '#111827',
    Navy: '#1e3a8a',
    'Heather Gray': '#cbd5e1',
    Charcoal: '#374151',
    Forest: '#166534',
    Maroon: '#7f1d1d',
    'Royal Blue': '#2563eb',
    Red: '#dc2626',
    Olive: '#4d7c0f',
    Stone: '#d6d3d1'
  }[color] || '#ffffff';

  return (
    <div className={`relative mx-auto flex ${compact ? 'h-72 w-64' : 'h-[440px] w-full max-w-[420px]'} items-center justify-center`}>
      <div
        className="absolute left-1/2 top-6 h-16 w-36 -translate-x-1/2 rounded-t-[56px] border border-slate-200"
        style={{ backgroundColor: shirtColor }}
      />
      <div
        className="absolute left-8 top-24 h-40 w-20 -rotate-12 rounded-[28px] border border-slate-200"
        style={{ backgroundColor: shirtColor }}
      />
      <div
        className="absolute right-8 top-24 h-40 w-20 rotate-12 rounded-[28px] border border-slate-200"
        style={{ backgroundColor: shirtColor }}
      />
      <div
        className="relative h-[82%] w-[62%] rounded-b-[42px] rounded-t-[28px] border border-slate-200 shadow-sm"
        style={{ backgroundColor: shirtColor }}
      >
        <div className="absolute left-1/2 top-0 h-16 w-24 -translate-x-1/2 rounded-b-full border-x border-b border-slate-200 bg-[#f7f8fa]" />
        <div className="absolute left-1/2 top-28 flex h-40 w-36 -translate-x-1/2 items-center justify-center rounded-md border border-dashed border-slate-400 bg-white/10 p-2">
          {image ? <img className="max-h-full max-w-full object-contain" src={image} alt={`${side} custom design`} /> : <span className="text-center text-xs font-semibold text-slate-400">Design area</span>}
        </div>
      </div>
    </div>
  );
}

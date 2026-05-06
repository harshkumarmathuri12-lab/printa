'use client';

import { Image, Shapes, Type } from 'lucide-react';
import { useCartFlow } from './CartContext';
import { TshirtPreview } from './tshirt-flow/TshirtPreview';

export function EditorCanvas() {
  const { design, setDesign } = useCartFlow();

  return (
    <div className="grid min-h-[calc(100vh-65px)] bg-white lg:grid-cols-[220px_1fr_280px]">
      <aside className="border-b border-slate-200 bg-white p-4 lg:border-b-0 lg:border-r">
        <div className="grid grid-cols-3 gap-2 lg:grid-cols-1">
          {[
            { label: 'Text', icon: Type },
            { label: 'Uploads', icon: Image },
            { label: 'Graphics', icon: Shapes }
          ].map(({ label, icon: Icon }) => (
            <button key={label} className="flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-3 text-sm font-bold hover:bg-slate-50 lg:justify-start">
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </aside>

      <section className="flex min-h-[520px] items-center justify-center bg-slate-100 p-4 sm:p-8">
        <div className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <TshirtPreview image={design.uploadedImage} color={design.color} side={design.side} />
        </div>
      </section>

      <aside className="border-t border-slate-200 bg-white p-5 lg:border-l lg:border-t-0">
        <h2 className="text-lg font-bold">Print side</h2>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {['Front', 'Back'].map((side) => (
            <button
              key={side}
              className={`rounded-md border px-4 py-3 text-sm font-bold ${design.side === side ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white'}`}
              onClick={() => setDesign({ side })}
            >
              {side}
            </button>
          ))}
        </div>
        <div className="mt-6 rounded-md bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-bold text-slate-950">{design.designArea} print</p>
          <p className="mt-1">{design.quantity} shirts selected</p>
        </div>
      </aside>
    </div>
  );
}

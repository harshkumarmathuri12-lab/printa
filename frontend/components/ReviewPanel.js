'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { useCartFlow } from './CartContext';
import { TshirtPreview } from './tshirt-flow/TshirtPreview';

export function ReviewPanel() {
  const router = useRouter();
  const { design } = useCartFlow();
  const [approved, setApproved] = useState(false);
  const checks = ['Text clarity', 'Spelling', 'Image quality'];

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_360px]">
      <section className="rounded-lg border border-slate-200 bg-white p-5">
        <TshirtPreview image={design.uploadedImage} color={design.color} side={design.side} />
      </section>
      <aside className="rounded-lg border border-slate-200 bg-white p-5">
        <h1 className="text-2xl font-black">Review your design</h1>
        <div className="mt-5 space-y-3">
          {checks.map((check) => (
            <div key={check} className="flex items-center gap-3 rounded-md bg-slate-50 p-3 font-semibold">
              <CheckCircle2 className="text-emerald-600" size={20} />
              {check}
            </div>
          ))}
        </div>
        <label className="mt-6 flex items-start gap-3 rounded-md border border-slate-200 p-4 text-sm font-semibold">
          <input className="mt-1 h-4 w-4" type="checkbox" checked={approved} onChange={(event) => setApproved(event.target.checked)} />
          I approve design
        </label>
        <button
          className="mt-6 w-full rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={!approved}
          onClick={() => router.push('/final')}
        >
          Continue
        </button>
      </aside>
    </div>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { EditorCanvas } from '../../components/EditorCanvas';
import { Shell } from '../../components/tshirt-flow/Shell';
import { useCartFlow } from '../../components/CartContext';

export default function EditorPage() {
  const router = useRouter();
  const { design } = useCartFlow();

  return (
    <Shell>
      <EditorCanvas />
      <div className="sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-end">
          <button
            className="rounded-md bg-slate-950 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!design.uploadedImage}
            onClick={() => router.push('/review')}
          >
            Next
          </button>
        </div>
      </div>
    </Shell>
  );
}

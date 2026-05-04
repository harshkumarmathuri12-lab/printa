import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '../lib/currency';

export function ProductCard({ product }) {
  const { formatPrice } = useCurrency();

  return (
    <article className="rounded-lg border border-black/10 bg-white p-4 shadow-panel">
      <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-paper">
        <img className="h-36 w-36 object-contain" src={product.previewImageUrl} alt="" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="mt-1 min-h-12 text-sm leading-6 text-black/65">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold">{formatPrice(product.basePriceCents)}</span>
          <Link className="inline-flex items-center gap-2 rounded-md bg-sea px-3 py-2 text-sm font-bold text-white" href={`/products/${product.id}`}>
            Start <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

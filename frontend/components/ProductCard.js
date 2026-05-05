import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCurrency } from '../lib/currency';

export function ProductCard({ product }) {
  const { formatPrice } = useCurrency();

  return (
    <article className="group rounded-[16px] bg-white p-4 shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 ease-in-out hover:-translate-y-[5px] hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
      <div className="flex aspect-[4/3] items-center justify-center rounded-[12px] bg-[#f8f9fb] p-4">
        <img className="h-32 w-32 object-contain transition-transform duration-300 ease-in-out group-hover:scale-105 sm:h-36 sm:w-36" src={product.previewImageUrl} alt="" />
      </div>
      <div className="mt-4">
        <h3 className="text-[14px] font-medium leading-5 text-ink">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-black/60">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#e6f7ff] px-3 py-1.5 text-[12px] font-semibold leading-none text-[#0070f3]">
            {formatPrice(product.basePriceCents)}
          </span>
          <Link className="inline-flex items-center gap-2 rounded-lg bg-[#111] px-4 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-black" href={`/products/${product.id}`}>
            Start <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

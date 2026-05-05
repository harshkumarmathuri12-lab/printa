import Link from 'next/link';
import { ArrowRight, Heart } from 'lucide-react';
import { useCurrency } from '../lib/currency';

export function ProductCard({ product }) {
  const { formatPrice } = useCurrency();

  return (
    <article className="group relative rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
      <button className="absolute right-6 top-6 z-10 rounded-full bg-white p-2 text-gray-500 shadow-sm transition hover:text-black" aria-label={`Save ${product.name}`}>
        <Heart size={16} />
      </button>
      <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 p-6">
        <img className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105" src={product.previewImageUrl} alt="" />
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm font-medium leading-5 text-ink">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{product.description}</p>
        <p className="mt-3 text-sm font-semibold text-gray-600">{formatPrice(product.basePriceCents)}</p>
        <Link className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-80" href={`/products/${product.id}`}>
            Start <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

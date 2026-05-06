'use client';

import Link from 'next/link';
import { ArrowRight, Heart, Star } from 'lucide-react';
import { useCurrency } from '../lib/currency';

export function ProductCard({ product, href, tshirtFlow = false }) {
  const currencyContext = useCurrency?.();
  const price = product.price ? `₹${product.price}` : currencyContext?.formatPrice(product.basePriceCents);
  const title = product.title || product.name;
  const image = product.image || product.previewImageUrl;
  const description = product.description;

  if (tshirtFlow) {
    return (
      <Link
        href={href || `/tshirts/${product.id}`}
        className="group block rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
      >
        <div className="flex aspect-[4/3] items-center justify-center rounded-md bg-slate-50 p-6">
          <img className="h-full max-h-44 w-full object-contain transition group-hover:scale-[1.02]" src={image} alt={title} />
        </div>
        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold leading-6 text-slate-950">{title}</h3>
            <span className="shrink-0 text-sm font-bold text-slate-950">{price}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
            <Star size={15} className="fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-slate-300">|</span>
            <span>Customizable</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <article className="group relative rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-lg">
      <button className="absolute right-6 top-6 z-10 rounded-full bg-white p-2 text-gray-500 shadow-sm transition hover:text-black" aria-label={`Save ${title}`}>
        <Heart size={16} />
      </button>
      <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-100 p-6">
        <img className="h-24 w-24 object-contain transition-transform duration-300 group-hover:scale-105" src={image} alt="" />
      </div>
      <div className="mt-3 text-center">
        <h3 className="text-sm font-medium leading-5 text-ink">{title}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-500">{description}</p>
        <p className="mt-3 text-sm font-semibold text-gray-600">{price}</p>
        <Link className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:opacity-80" href={href || `/products/${product.id}`}>
          Start <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
}

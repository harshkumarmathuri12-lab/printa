import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Shell } from '../components/tshirt-flow/Shell';

export default function HomePage() {
  return (
    <Shell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-16">
        <div>
          <h1 className="text-4xl font-black leading-tight tracking-normal text-slate-950 sm:text-5xl">Custom print products</h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">Choose a category, upload artwork, review your design, and add a production-ready item to cart.</p>
          <Link href="/tshirts" className="mt-7 inline-flex items-center gap-2 rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white">
            Shop T-Shirts <ArrowRight size={17} />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link href="/tshirts" className="group rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md">
            <div className="flex aspect-square items-center justify-center rounded-md bg-slate-50 p-6">
              <img className="h-full max-h-52 object-contain transition group-hover:scale-[1.03]" src="/images/products/t-shirt.svg" alt="T-Shirts" />
            </div>
            <h2 className="mt-4 text-xl font-black">T-Shirts</h2>
          </Link>
          {['Business Cards', 'Posters', 'Mugs'].map((name) => (
            <div key={name} className="rounded-lg border border-slate-200 bg-white p-5 opacity-70">
              <div className="aspect-square rounded-md bg-slate-100" />
              <h2 className="mt-4 text-xl font-black">{name}</h2>
            </div>
          ))}
        </div>
      </section>
    </Shell>
  );
}

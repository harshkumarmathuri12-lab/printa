import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { getCatalogFallback } from '../lib/api';

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCatalogFallback().then((data) => setCategories(data.categories));
  }, []);

  return (
    <Layout>
      <section className="bg-[#f9fafb]">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-6 py-12 md:grid-cols-2 md:items-center lg:py-16">
          <div className="relative min-h-[320px] overflow-hidden rounded-[24px] bg-gray-100 p-6 shadow-sm">
            <div className="absolute inset-x-8 top-8 h-28 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.1)]" />
            <div className="absolute bottom-8 left-8 right-20 rounded-2xl bg-[#dbeafe] p-6">
              <div className="h-6 w-40 rounded-full bg-[#0070f3]" />
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="h-24 rounded-xl bg-white shadow-sm" />
                <div className="h-24 rounded-xl bg-white shadow-sm" />
                <div className="h-24 rounded-xl bg-white shadow-sm" />
              </div>
            </div>
          </div>
          <div className="rounded-[16px] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
            <p className="inline-flex rounded-full bg-[#e6f7ff] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#0070f3]">
              Design + print platform
            </p>
            <h1 className="mt-4 max-w-xl text-4xl font-black leading-tight md:text-5xl">
              Custom printed products with a production-ready editor.
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-gray-600">
              Pick a product, customize a template, export high-resolution artwork, and move straight into checkout.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white transition hover:opacity-80" href="#products">
                Start designing
              </a>
              <a className="rounded-lg bg-black px-5 py-3 text-sm font-bold text-white transition hover:opacity-80" href="/dashboard">
                View dashboard
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-[1200px] px-6 py-12">
        {categories.map((category) => (
          <div className="mt-12 first:mt-0" key={category.id}>
            <h2 className="mb-6 text-2xl font-bold leading-tight">{category.name}</h2>
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
              {category.products.map((product) => (
                <ProductCard product={product} key={product.id} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </Layout>
  );
}

import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
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
        <h2 className="mb-8 text-3xl font-bold leading-tight text-black">Explore all categories</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-9 md:grid-cols-4">
          {categories.map((category) => {
            const product = category.products[0];

            return (
              <a className="group block" href={product ? `/products/${product.id}` : '#'} key={category.id}>
                <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[18px] border border-gray-300 bg-white p-5 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-100 p-5">
                    {product ? (
                      <img className="h-full max-h-36 w-full object-contain transition-transform duration-300 group-hover:scale-105" src={product.previewImageUrl} alt="" />
                    ) : null}
                  </div>
                </div>
                <h3 className="mt-4 text-left text-lg font-bold leading-7 text-black">{category.name}</h3>
              </a>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

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
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-[1fr_420px] md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Design + print platform</p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              Custom printed products with a production-ready editor.
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-black/65">
              Pick a product, customize a template, export high-resolution artwork, and move straight into checkout.
            </p>
          </div>
          <div className="rounded-lg border border-black/10 bg-paper p-5">
            <div className="rounded-md bg-white p-4 shadow-panel">
              <div className="h-8 w-44 rounded bg-sea" />
              <div className="mt-7 h-4 w-full rounded bg-black/10" />
              <div className="mt-3 h-4 w-2/3 rounded bg-black/10" />
              <div className="mt-8 grid grid-cols-3 gap-3">
                <div className="h-20 rounded bg-coral/85" />
                <div className="h-20 rounded bg-sea/85" />
                <div className="h-20 rounded bg-ink/85" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        {categories.map((category) => (
          <div className="mb-10" key={category.id}>
            <h2 className="text-2xl font-black">{category.name}</h2>
            <div className="mt-4 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
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

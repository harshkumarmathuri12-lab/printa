import { ProductCard } from '../../components/ProductCard';
import { Shell } from '../../components/tshirt-flow/Shell';
import { tshirtProducts } from '../../lib/tshirtData';

export default function TshirtsPage() {
  return (
    <Shell>
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <p className="text-sm font-bold text-slate-500">Custom apparel</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">T-Shirt designs</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Pick a style, upload artwork, place it on the shirt, and review before adding to cart.</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tshirtProducts.map((product) => (
            <ProductCard key={product.id} product={product} href={`/tshirts/${product.id}`} tshirtFlow />
          ))}
        </div>
      </section>
    </Shell>
  );
}

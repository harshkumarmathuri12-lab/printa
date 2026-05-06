'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Shell } from '../../components/tshirt-flow/Shell';
import { TshirtPreview } from '../../components/tshirt-flow/TshirtPreview';
import { useCartFlow } from '../../components/CartContext';
import { getTshirtProduct, quantities, stockOptions } from '../../lib/tshirtData';

export default function FinalPage() {
  const router = useRouter();
  const { design, setDesign, addToCart } = useCartFlow();
  const product = getTshirtProduct(design.productId) || getTshirtProduct('classic-crew');
  const stock = stockOptions.find((option) => option.id === design.stock) || stockOptions[0];
  const price = useMemo(() => (product.price + stock.delta) * design.quantity, [product.price, stock.delta, design.quantity]);

  function handleAddToCart() {
    addToCart({
      productId: product.id,
      designImage: design.uploadedImage,
      quantity: design.quantity,
      variant: design.stock,
      productTitle: product.title,
      color: design.color,
      price
    });
    router.push('/cart');
  }

  return (
    <Shell>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-28 pt-8 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <TshirtPreview image={design.uploadedImage} color={design.color} side={design.side} />
        </div>
        <aside className="rounded-lg border border-slate-200 bg-white p-5">
          <h1 className="text-2xl font-black">Final configuration</h1>
          <p className="mt-2 text-slate-600">{product.title}</p>

          <label className="mt-6 block text-sm font-bold text-slate-700" htmlFor="final-quantity">
            Quantity
          </label>
          <select
            id="final-quantity"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold"
            value={design.quantity}
            onChange={(event) => setDesign({ quantity: Number(event.target.value) })}
          >
            {quantities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <p className="mt-6 text-sm font-bold text-slate-700">Stock selection</p>
          <div className="mt-2 grid gap-2">
            {stockOptions.map((option) => (
              <button
                key={option.id}
                className={`flex items-center justify-between rounded-md border px-4 py-3 text-left text-sm font-bold ${design.stock === option.id ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white'}`}
                onClick={() => setDesign({ stock: option.id })}
              >
                <span>{option.label}</span>
                <span>{option.delta ? `+₹${option.delta}/shirt` : 'Included'}</span>
              </button>
            ))}
          </div>
        </aside>
      </section>
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-4 py-3 shadow-[0_-8px_24px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Total</p>
            <p className="text-2xl font-black">₹{price.toLocaleString('en-IN')}</p>
          </div>
          <button
            className="rounded-md bg-slate-950 px-6 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            disabled={!design.uploadedImage}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Shell>
  );
}

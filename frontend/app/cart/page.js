'use client';

import Link from 'next/link';
import { Shell } from '../../components/tshirt-flow/Shell';
import { TshirtPreview } from '../../components/tshirt-flow/TshirtPreview';
import { useCartFlow } from '../../components/CartContext';

export default function CartPage() {
  const { cart, removeFromCart } = useCartFlow();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <Shell>
      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <h1 className="text-3xl font-black">Cart</h1>
        {cart.length === 0 ? (
          <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center">
            <p className="font-semibold text-slate-600">Your cart is empty.</p>
            <Link className="mt-5 inline-flex rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white" href="/tshirts">
              Shop T-Shirts
            </Link>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {cart.map((item) => (
              <article key={item.lineId} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-[180px_1fr_auto]">
                <TshirtPreview image={item.designImage} color={item.color} compact />
                <div>
                  <h2 className="text-xl font-black">{item.productTitle}</h2>
                  <p className="mt-2 text-sm font-semibold text-slate-600">Product id: {item.productId}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">Quantity: {item.quantity}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">Variant: {item.variant}</p>
                </div>
                <div className="flex items-start justify-between gap-4 sm:block sm:text-right">
                  <p className="text-xl font-black">₹{item.price.toLocaleString('en-IN')}</p>
                  <button className="mt-3 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold hover:bg-slate-50" onClick={() => removeFromCart(item.lineId)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
            <div className="flex justify-end rounded-lg bg-white p-4 text-2xl font-black">Total: ₹{total.toLocaleString('en-IN')}</div>
          </div>
        )}
      </section>
    </Shell>
  );
}

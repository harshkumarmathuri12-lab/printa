import { Trash2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { useCart } from '../lib/cart';
import { useCurrency } from '../lib/currency';

export default function CartPage() {
  const { items, removeItem, clear } = useCart();
  const { formatPrice } = useCurrency();
  const subtotal = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-4xl font-black">Cart</h1>
        <div className="mt-6 space-y-4">
          {items.map((item) => (
            <article className="grid gap-4 rounded-lg border border-black/10 bg-white p-4 md:grid-cols-[160px_1fr_auto]" key={item.id}>
              <img className="h-32 w-40 rounded-md border border-black/10 object-cover" src={item.previewDataUrl} alt="" />
              <div>
                <h2 className="text-xl font-bold">{item.productName}</h2>
                <p className="mt-1 text-sm text-black/60">Quantity: {item.quantity}</p>
                <p className="mt-1 text-sm text-black/60">Variants: {Object.values(item.variantConfig || {}).join(', ')}</p>
              </div>
              <div className="flex items-center gap-3 md:flex-col md:items-end">
                <strong>{formatPrice(item.unitPriceCents * item.quantity)}</strong>
                <button className="rounded-md border border-black/10 p-2" onClick={() => removeItem(item.id)} aria-label="Remove item">
                  <Trash2 size={18} />
                </button>
              </div>
            </article>
          ))}
        </div>
        {!items.length && <p className="mt-6 rounded-lg border border-black/10 bg-white p-6">Your cart is empty.</p>}
        <aside className="mt-8 rounded-lg border border-black/10 bg-white p-5">
          <div className="flex items-center justify-between text-lg">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            <input className="rounded-md border border-black/15 px-3 py-2" placeholder="Full name" />
            <input className="rounded-md border border-black/15 px-3 py-2" placeholder="Street address" />
            <input className="rounded-md border border-black/15 px-3 py-2" placeholder="City" />
            <input className="rounded-md border border-black/15 px-3 py-2" placeholder="Postal code" />
          </div>
          <button className="mt-5 rounded-md bg-coral px-5 py-3 font-black text-white" disabled={!items.length} onClick={clear}>
            Pay with Stripe
          </button>
        </aside>
      </section>
    </Layout>
  );
}

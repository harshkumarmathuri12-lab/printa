import { Layout } from '../components/Layout';
import { useCart } from '../lib/cart';

export default function DashboardPage() {
  const { items } = useCart();

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-4xl font-black">Dashboard</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-lg border border-black/10 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-sea">Saved designs</p>
            <div className="mt-3 text-4xl font-black">{items.length}</div>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-sea">Orders</p>
            <div className="mt-3 text-4xl font-black">0</div>
          </div>
          <div className="rounded-lg border border-black/10 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-sea">Print jobs</p>
            <div className="mt-3 text-4xl font-black">0</div>
          </div>
        </div>

        <h2 className="mt-10 text-2xl font-black">Recent designs</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {items.map((item) => (
            <article className="rounded-lg border border-black/10 bg-white p-4" key={item.id}>
              <img className="aspect-video w-full rounded-md border border-black/10 object-cover" src={item.previewDataUrl} alt="" />
              <h3 className="mt-3 font-bold">{item.productName}</h3>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

import Link from 'next/link';
import { ShoppingCart, UserRound } from 'lucide-react';
import { useCart } from '../lib/cart';
import { useCurrency } from '../lib/currency';

export function Layout({ children }) {
  const { items } = useCart();
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="min-h-screen bg-[#fbfbf8]">
      <header className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-xl font-black tracking-normal text-ink">
            printa
          </Link>
          <nav className="flex items-center gap-2 text-sm font-semibold">
            <Link className="rounded-md px-3 py-2 hover:bg-black/5" href="/">
              Products
            </Link>
            <select
              className="rounded-md border border-black/10 bg-white px-2 py-2 font-bold"
              value={currency}
              onChange={(event) => setCurrency(event.target.value)}
              aria-label="Currency"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
            <Link className="rounded-md px-3 py-2 hover:bg-black/5" href="/dashboard" aria-label="Dashboard">
              <UserRound size={18} />
            </Link>
            <Link className="flex items-center gap-2 rounded-md bg-ink px-3 py-2 text-white" href="/cart">
              <ShoppingCart size={17} />
              <span>{items.length}</span>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

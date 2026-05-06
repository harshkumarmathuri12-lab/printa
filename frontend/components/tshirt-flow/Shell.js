'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartFlow } from '../CartContext';

export function Shell({ children }) {
  const { cart } = useCartFlow();

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="text-xl font-black tracking-normal">
            Printa
          </Link>
          <nav className="flex items-center gap-2 text-sm font-semibold">
            <Link className="rounded-md px-3 py-2 hover:bg-slate-100" href="/tshirts">
              T-Shirts
            </Link>
            <Link className="flex items-center gap-2 rounded-md bg-slate-950 px-3 py-2 text-white" href="/cart">
              <ShoppingCart size={17} />
              <span>{cart.length}</span>
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}

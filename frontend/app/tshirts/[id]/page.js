'use client';

import { notFound } from 'next/navigation';
import { useState } from 'react';
import { Truck } from 'lucide-react';
import { Shell } from '../../../components/tshirt-flow/Shell';
import { UploadModal } from '../../../components/UploadModal';
import { TshirtPreview } from '../../../components/tshirt-flow/TshirtPreview';
import { getTshirtProduct, quantities } from '../../../lib/tshirtData';
import { useCartFlow } from '../../../components/CartContext';

export default function ProductDetailPage({ params }) {
  const product = getTshirtProduct(params.id);
  const [modalOpen, setModalOpen] = useState(false);
  const { design, setDesign } = useCartFlow();

  if (!product) notFound();

  const selectedColor = design.productId === product.id ? design.color : product.colors[0];
  const selectedQuantity = design.productId === product.id ? design.quantity : 25;

  function openUpload() {
    setDesign({
      productId: product.id,
      productTitle: product.title,
      productImage: product.image,
      color: selectedColor,
      quantity: selectedQuantity
    });
    setModalOpen(true);
  }

  return (
    <Shell>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_440px]">
        <div className="grid gap-4 sm:grid-cols-[96px_1fr]">
          <div className="hidden gap-3 sm:grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex aspect-square items-center justify-center rounded-md border border-slate-200 bg-white p-3">
                <img className="h-full object-contain" src={product.image} alt="" />
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <TshirtPreview image={design.productId === product.id ? design.uploadedImage : ''} color={selectedColor} />
          </div>
        </div>

        <aside className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-black tracking-normal text-slate-950">{product.title}</h1>
          <p className="mt-2 text-slate-600">{product.description}</p>
          <p className="mt-5 text-2xl font-black">₹{product.price}</p>
          <div className="mt-5 flex gap-3 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-900">
            <Truck size={19} />
            {product.delivery}
          </div>

          <div className="mt-6">
            <p className="text-sm font-bold text-slate-700">Color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`rounded-md border px-3 py-2 text-sm font-bold ${selectedColor === color ? 'border-slate-950 bg-slate-950 text-white' : 'border-slate-300 bg-white'}`}
                  onClick={() => setDesign({ color, productId: product.id, productTitle: product.title, productImage: product.image })}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <label className="mt-6 block text-sm font-bold text-slate-700" htmlFor="quantity">
            Quantity
          </label>
          <select
            id="quantity"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-semibold"
            value={selectedQuantity}
            onChange={(event) => setDesign({ quantity: Number(event.target.value), productId: product.id })}
          >
            {quantities.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <button className="rounded-md border border-slate-950 px-5 py-3 text-sm font-bold hover:bg-slate-50" onClick={openUpload}>
              Browse designs
            </button>
            <button className="rounded-md bg-slate-950 px-5 py-3 text-sm font-bold text-white" onClick={openUpload}>
              Upload design
            </button>
          </div>
        </aside>
      </section>
      {modalOpen ? <UploadModal product={product} onClose={() => setModalOpen(false)} /> : null}
    </Shell>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowRight, Check } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Layout } from '../../components/Layout';
import { getProductFallback } from '../../lib/api';
import { useCurrency } from '../../lib/currency';

export default function ProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [variantConfig, setVariantConfig] = useState({});
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (router.query.id) getProductFallback(router.query.id).then((data) => setProduct(data.product));
  }, [router.query.id]);

  const groupedVariants = useMemo(() => {
    if (!product) return {};
    return product.variants.reduce((groups, variant) => {
      groups[variant.optionType] = groups[variant.optionType] || [];
      groups[variant.optionType].push(variant);
      return groups;
    }, {});
  }, [product]);

  useEffect(() => {
    if (product) {
      const defaults = Object.entries(groupedVariants).reduce((config, [type, variants]) => {
        config[type] = variants[0].optionValue;
        return config;
      }, {});
      setVariantConfig(defaults);
    }
  }, [product, groupedVariants]);

  if (!product) return <Layout><div className="mx-auto max-w-7xl p-8">Loading product...</div></Layout>;

  return (
    <Layout>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[520px_1fr]">
        <div className="rounded-lg border border-black/10 bg-paper p-8">
          <img className="mx-auto h-80 w-80 object-contain" src={product.previewImageUrl} alt="" />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-sea">Select product</p>
          <h1 className="mt-2 text-4xl font-black">{product.name}</h1>
          <p className="mt-3 text-lg leading-8 text-black/65">{product.description}</p>
          <div className="mt-6 text-2xl font-black">{formatPrice(product.basePriceCents)}</div>

          <div className="mt-8 space-y-6">
            {Object.entries(groupedVariants).map(([type, variants]) => (
              <div key={type}>
                <h2 className="text-sm font-black uppercase tracking-[0.12em]">{type}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {variants.map((variant) => {
                    const active = variantConfig[type] === variant.optionValue;
                    return (
                      <button
                        className={`inline-flex items-center gap-2 rounded-md border px-4 py-2 font-semibold ${
                          active ? 'border-sea bg-sea text-white' : 'border-black/15 bg-white'
                        }`}
                        key={variant.id}
                        onClick={() => setVariantConfig((current) => ({ ...current, [type]: variant.optionValue }))}
                      >
                        {active && <Check size={16} />}
                        {variant.name}
                        {variant.priceDeltaCents > 0 ? ` +${formatPrice(variant.priceDeltaCents)}` : ''}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <Link
            className="mt-10 inline-flex items-center gap-2 rounded-md bg-coral px-5 py-3 text-base font-black text-white"
            href={{ pathname: `/editor/${product.id}`, query: { variants: JSON.stringify(variantConfig) } }}
          >
            Customize <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

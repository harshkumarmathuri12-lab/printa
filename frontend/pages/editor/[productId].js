import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import { getProductFallback, getTemplatesFallback } from '../../lib/api';

const ProductEditor = dynamic(() => import('../../editor/ProductEditor'), {
  ssr: false,
  loading: () => <div className="p-8">Loading design editor...</div>
});

export default function EditorPage() {
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    if (!router.query.productId) return;
    getProductFallback(router.query.productId).then((data) => {
      setProduct(data.product);
      getTemplatesFallback(data.product.id).then((templateData) => setTemplates(templateData.templates));
    });
  }, [router.query.productId]);

  if (!product) return <Layout><div className="mx-auto max-w-7xl p-8">Preparing editor...</div></Layout>;

  return (
    <Layout>
      <ProductEditor product={product} templates={templates} variantConfig={parseVariants(router.query.variants)} />
    </Layout>
  );
}

function parseVariants(value) {
  if (!value || typeof value !== 'string') return {};
  try {
    return JSON.parse(value);
  } catch {
    return {};
  }
}

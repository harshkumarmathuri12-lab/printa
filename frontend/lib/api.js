const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export async function api(path, options = {}) {
  const token = typeof window !== 'undefined' ? window.localStorage.getItem('vistaclone_token') : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
}

export async function getCatalogFallback() {
  try {
    return await api('/catalog');
  } catch {
    return import('./mockData').then((module) => ({ categories: module.categories }));
  }
}

export async function getProductFallback(productId) {
  try {
    return await api(`/catalog/products/${productId}`);
  } catch {
    const { products } = await import('./mockData');
    const product = products.find((candidate) => candidate.id === productId || candidate.slug === productId) || products[0];
    return { product };
  }
}

export async function getTemplatesFallback(productId) {
  try {
    return await api(`/templates?productId=${productId}`);
  } catch {
    const { templates } = await import('./mockData');
    return { templates: templates.filter((template) => template.productId === productId) };
  }
}

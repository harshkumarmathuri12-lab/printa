import { categories, products } from '../models/memoryStore.js';

export function listCatalog() {
  return categories.map((category) => ({
    ...category,
    products: products.filter((product) => product.categorySlug === category.slug)
  }));
}

export function listProducts() {
  return products;
}

export function getProduct(productIdOrSlug) {
  const product = products.find(
    (candidate) => candidate.id === productIdOrSlug || candidate.slug === productIdOrSlug
  );

  if (!product) {
    const err = new Error('Product not found');
    err.status = 404;
    throw err;
  }

  return product;
}

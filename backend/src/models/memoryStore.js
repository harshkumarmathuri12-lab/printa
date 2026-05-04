import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));
const sampleData = JSON.parse(readFileSync(resolve(currentDir, '../../seed/sample-data.json'), 'utf8'));
const sampleTemplates = JSON.parse(readFileSync(resolve(currentDir, '../../seed/templates.json'), 'utf8'));

export const users = [
  {
    id: 'admin-demo',
    email: 'admin@vistaclone.dev',
    passwordHash: '$2a$10$YBzUlQ9G7oCexvW8Y66IlO9MS.ficB2vNlKpBW8W67I2ccyTVeR3W',
    name: 'Admin',
    role: 'admin'
  }
];

export const categories = sampleData.categories.map((category, index) => ({
  id: category.slug,
  ...category,
  sortOrder: index
}));

export const products = sampleData.products.map((product) => ({
  ...product,
  id: product.id,
  variants: product.variants.map((variant, index) => ({
    id: `${product.id}-${variant.optionType}-${index}`,
    productId: product.id,
    ...variant
  }))
}));

export const templates = sampleTemplates;
export const designs = [];
export const carts = new Map();
export const orders = [];
export const printJobs = [];

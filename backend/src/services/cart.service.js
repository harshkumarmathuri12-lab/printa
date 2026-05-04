import { randomUUID } from 'crypto';
import { carts } from '../models/memoryStore.js';
import { getProduct } from './catalog.service.js';

function getOrCreateCart(userId) {
  if (!carts.has(userId)) {
    carts.set(userId, { id: randomUUID(), userId, items: [] });
  }
  return carts.get(userId);
}

export function getCart(userId) {
  return getOrCreateCart(userId);
}

export function addCartItem(userId, item) {
  const product = getProduct(item.productId);
  const variantDelta = Object.values(item.variantConfig || {}).reduce((sum, value) => {
    const variant = product.variants.find((candidate) => candidate.optionValue === value);
    return sum + (variant?.priceDeltaCents || 0);
  }, 0);

  const cart = getOrCreateCart(userId);
  const cartItem = {
    id: randomUUID(),
    productId: product.id,
    productName: product.name,
    designId: item.designId,
    quantity: item.quantity || 1,
    variantConfig: item.variantConfig || {},
    designSnapshot: item.designSnapshot,
    previewImageKey: item.previewImageKey || null,
    unitPriceCents: product.basePriceCents + variantDelta
  };
  cart.items.push(cartItem);
  return cart;
}

export function removeCartItem(userId, itemId) {
  const cart = getOrCreateCart(userId);
  cart.items = cart.items.filter((item) => item.id !== itemId);
  return cart;
}

export function clearCart(userId) {
  const cart = getOrCreateCart(userId);
  cart.items = [];
  return cart;
}

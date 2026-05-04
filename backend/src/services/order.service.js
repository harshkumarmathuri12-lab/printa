import { randomUUID } from 'crypto';
import Stripe from 'stripe';
import { orders } from '../models/memoryStore.js';
import { clearCart, getCart } from './cart.service.js';
import { enqueuePrintJobs } from './render.service.js';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export async function checkout(userId, { shippingAddress }) {
  const cart = getCart(userId);
  if (!cart.items.length) {
    const err = new Error('Cart is empty');
    err.status = 400;
    throw err;
  }

  const subtotalCents = cart.items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
  const shippingCents = subtotalCents > 5000 ? 0 : 699;
  const taxCents = Math.round(subtotalCents * 0.0825);
  const totalCents = subtotalCents + shippingCents + taxCents;
  const paymentIntent = stripe
    ? await stripe.paymentIntents.create({ amount: totalCents, currency: 'usd', automatic_payment_methods: { enabled: true } })
    : { id: `pi_mock_${randomUUID()}`, client_secret: 'mock_client_secret' };

  const order = {
    id: randomUUID(),
    userId,
    status: 'pending_payment',
    subtotalCents,
    shippingCents,
    taxCents,
    totalCents,
    stripePaymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret,
    shippingAddress,
    items: cart.items.map((item) => ({ ...item, id: randomUUID(), orderItemId: randomUUID() })),
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  clearCart(userId);
  enqueuePrintJobs(order);
  return order;
}

export function listUserOrders(userId) {
  return orders.filter((order) => order.userId === userId);
}

export function listOrders() {
  return orders;
}

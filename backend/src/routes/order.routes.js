import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { checkout, listUserOrders } from '../services/order.service.js';

export const orderRouter = Router();

const checkoutSchema = z.object({
  shippingAddress: z.object({
    name: z.string(),
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    postalCode: z.string(),
    country: z.string().default('US')
  })
});

orderRouter.use(requireAuth);

orderRouter.get('/', (req, res) => {
  res.json({ orders: listUserOrders(req.user.id) });
});

orderRouter.post('/checkout', async (req, res, next) => {
  try {
    const payload = checkoutSchema.parse(req.body);
    res.status(201).json({ order: await checkout(req.user.id, payload) });
  } catch (err) {
    next(err);
  }
});

import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { addCartItem, getCart, removeCartItem } from '../services/cart.service.js';

export const cartRouter = Router();

const cartItemSchema = z.object({
  productId: z.string(),
  designId: z.string().optional(),
  quantity: z.number().int().positive().default(1),
  variantConfig: z.record(z.string()).default({}),
  designSnapshot: z.record(z.any()),
  previewImageKey: z.string().optional().nullable()
});

cartRouter.use(requireAuth);

cartRouter.get('/', (req, res) => {
  res.json({ cart: getCart(req.user.id) });
});

cartRouter.post('/items', (req, res, next) => {
  try {
    const payload = cartItemSchema.parse(req.body);
    res.status(201).json({ cart: addCartItem(req.user.id, payload) });
  } catch (err) {
    next(err);
  }
});

cartRouter.delete('/items/:itemId', (req, res) => {
  res.json({ cart: removeCartItem(req.user.id, req.params.itemId) });
});

import { Router } from 'express';
import { z } from 'zod';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { products, templates, users } from '../models/memoryStore.js';
import { listOrders } from '../services/order.service.js';

export const adminRouter = Router();

adminRouter.use(requireAuth, requireAdmin);

adminRouter.get('/summary', (_req, res) => {
  res.json({
    counts: {
      products: products.length,
      templates: templates.length,
      users: users.length,
      orders: listOrders().length
    }
  });
});

adminRouter.get('/orders', (_req, res) => {
  res.json({ orders: listOrders() });
});

adminRouter.get('/users', (_req, res) => {
  res.json({ users: users.map(({ passwordHash, ...user }) => user) });
});

adminRouter.post('/products', (req, res) => {
  const product = z
    .object({
      id: z.string(),
      categorySlug: z.string(),
      slug: z.string(),
      name: z.string(),
      description: z.string(),
      basePriceCents: z.number().int(),
      previewImageUrl: z.string(),
      printWidthIn: z.number(),
      printHeightIn: z.number(),
      bleedIn: z.number().default(0.125),
      variants: z.array(z.record(z.any())).default([])
    })
    .parse(req.body);

  products.push(product);
  res.status(201).json({ product });
});

adminRouter.post('/templates', (req, res) => {
  const template = z
    .object({
      id: z.string(),
      productId: z.string(),
      name: z.string(),
      thumbnailUrl: z.string().optional(),
      fabricJson: z.record(z.any())
    })
    .parse(req.body);

  templates.push(template);
  res.status(201).json({ template });
});

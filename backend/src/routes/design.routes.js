import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { listUserDesigns, saveDesign } from '../services/design.service.js';

export const designRouter = Router();

const designSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  templateId: z.string().optional().nullable(),
  name: z.string().optional(),
  fabricJson: z.record(z.any()),
  previewImageKey: z.string().optional().nullable()
});

designRouter.use(requireAuth);

designRouter.get('/', (req, res) => {
  res.json({ designs: listUserDesigns(req.user.id) });
});

designRouter.post('/', (req, res, next) => {
  try {
    const payload = designSchema.parse(req.body);
    res.status(201).json({ design: saveDesign(req.user.id, payload) });
  } catch (err) {
    next(err);
  }
});

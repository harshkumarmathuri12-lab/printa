import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { getProduct } from '../services/catalog.service.js';
import { listPrintJobs, renderPreviewFromJson } from '../services/render.service.js';

export const renderRouter = Router();

const renderSchema = z.object({
  productId: z.string(),
  designJson: z.record(z.any())
});

renderRouter.post('/print-ready', requireAuth, async (req, res, next) => {
  try {
    const payload = renderSchema.parse(req.body);
    const product = getProduct(payload.productId);
    res.status(202).json(await renderPreviewFromJson({ designJson: payload.designJson, product }));
  } catch (err) {
    next(err);
  }
});

renderRouter.get('/jobs', requireAuth, (req, res) => {
  res.json({ jobs: listPrintJobs() });
});

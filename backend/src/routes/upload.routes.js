import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { createUploadUrl } from '../services/upload.service.js';

export const uploadRouter = Router();

const uploadSchema = z.object({
  folder: z.enum(['uploads', 'previews', 'print-files']).default('uploads'),
  contentType: z.string().min(3)
});

uploadRouter.post('/signed-url', requireAuth, async (req, res, next) => {
  try {
    res.json(await createUploadUrl(uploadSchema.parse(req.body)));
  } catch (err) {
    next(err);
  }
});

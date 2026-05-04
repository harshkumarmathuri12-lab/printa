import { Router } from 'express';
import { templates } from '../models/memoryStore.js';

export const templateRouter = Router();

templateRouter.get('/', (req, res) => {
  const { productId } = req.query;
  const scoped = productId ? templates.filter((template) => template.productId === productId) : templates;
  res.json({ templates: scoped });
});

templateRouter.get('/:id', (req, res) => {
  const template = templates.find((candidate) => candidate.id === req.params.id);
  if (!template) return res.status(404).json({ message: 'Template not found' });
  return res.json({ template });
});

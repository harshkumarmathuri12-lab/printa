import { Router } from 'express';
import { getProduct, listCatalog, listProducts } from '../services/catalog.service.js';

export const catalogRouter = Router();

catalogRouter.get('/', (_req, res) => {
  res.json({ categories: listCatalog() });
});

catalogRouter.get('/products', (_req, res) => {
  res.json({ products: listProducts() });
});

catalogRouter.get('/products/:id', (req, res, next) => {
  try {
    res.json({ product: getProduct(req.params.id) });
  } catch (err) {
    next(err);
  }
});

import { Router } from 'express';
import { z } from 'zod';
import { requireAuth } from '../middleware/auth.js';
import { login, publicUser, signup } from '../services/auth.service.js';

export const authRouter = Router();

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(2).optional()
});

authRouter.post('/signup', async (req, res, next) => {
  try {
    const payload = credentialsSchema.extend({ name: z.string().min(2) }).parse(req.body);
    res.status(201).json(await signup(payload));
  } catch (err) {
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const payload = credentialsSchema.omit({ name: true }).parse(req.body);
    res.json(await login(payload));
  } catch (err) {
    next(err);
  }
});

authRouter.get('/me', requireAuth, (req, res) => {
  res.json({ user: publicUser(req.user) });
});

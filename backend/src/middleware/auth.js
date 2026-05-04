import jwt from 'jsonwebtoken';
import { users } from '../models/memoryStore.js';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Missing bearer token' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret');
    const user = users.find((candidate) => candidate.id === payload.sub);
    if (!user) return res.status(401).json({ message: 'Invalid user' });
    req.user = user;
    return next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  return next();
}

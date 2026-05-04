import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { users } from '../models/memoryStore.js';

function publicUser(user) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}

function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '7d'
  });
}

export async function signup({ email, password, name }) {
  const normalizedEmail = email.toLowerCase();
  if (users.some((user) => user.email === normalizedEmail)) {
    const err = new Error('Email is already registered');
    err.status = 409;
    throw err;
  }

  const user = {
    id: randomUUID(),
    email: normalizedEmail,
    passwordHash: await bcrypt.hash(password, 10),
    name,
    role: 'customer'
  };
  users.push(user);

  return { user: publicUser(user), token: signToken(user) };
}

export async function login({ email, password }) {
  const user = users.find((candidate) => candidate.email === email.toLowerCase());
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    throw err;
  }

  return { user: publicUser(user), token: signToken(user) };
}

export { publicUser };

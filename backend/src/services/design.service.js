import { randomUUID } from 'crypto';
import { designs } from '../models/memoryStore.js';

export function listUserDesigns(userId) {
  return designs.filter((design) => design.userId === userId);
}

export function saveDesign(userId, payload) {
  const now = new Date().toISOString();

  if (payload.id) {
    const existing = designs.find((design) => design.id === payload.id && design.userId === userId);
    if (!existing) {
      const err = new Error('Design not found');
      err.status = 404;
      throw err;
    }
    Object.assign(existing, {
      name: payload.name ?? existing.name,
      fabricJson: payload.fabricJson ?? existing.fabricJson,
      previewImageKey: payload.previewImageKey ?? existing.previewImageKey,
      updatedAt: now
    });
    return existing;
  }

  const design = {
    id: randomUUID(),
    userId,
    productId: payload.productId,
    templateId: payload.templateId || null,
    name: payload.name || 'Untitled design',
    fabricJson: payload.fabricJson,
    previewImageKey: payload.previewImageKey || null,
    status: 'draft',
    createdAt: now,
    updatedAt: now
  };
  designs.push(design);
  return design;
}

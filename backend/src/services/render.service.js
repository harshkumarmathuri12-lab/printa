import { randomUUID } from 'crypto';
import { printJobs } from '../models/memoryStore.js';

export function enqueuePrintJobs(order) {
  const jobs = order.items.map((item) => ({
    id: randomUUID(),
    orderId: order.id,
    orderItemId: item.orderItemId,
    status: 'queued',
    inputDesign: item.designSnapshot,
    outputPdfKey: null,
    outputPngKey: null,
    createdAt: new Date().toISOString()
  }));
  printJobs.push(...jobs);
  return jobs;
}

export function listPrintJobs() {
  return printJobs;
}

export async function renderPreviewFromJson({ designJson, product }) {
  return {
    status: 'queued',
    message: 'Production renderer placeholder. Use Puppeteer or node-canvas worker for 300 DPI PDF/PNG.',
    targetPixels: {
      width: Math.round((product.printWidthIn + product.bleedIn * 2) * product.dpi),
      height: Math.round((product.printHeightIn + product.bleedIn * 2) * product.dpi)
    },
    designJson
  };
}

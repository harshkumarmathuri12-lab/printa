import { Router } from 'express';
import { authRouter } from './auth.routes.js';
import { catalogRouter } from './catalog.routes.js';
import { templateRouter } from './template.routes.js';
import { designRouter } from './design.routes.js';
import { cartRouter } from './cart.routes.js';
import { orderRouter } from './order.routes.js';
import { uploadRouter } from './upload.routes.js';
import { renderRouter } from './render.routes.js';
import { adminRouter } from './admin.routes.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/catalog', catalogRouter);
router.use('/templates', templateRouter);
router.use('/designs', designRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);
router.use('/uploads', uploadRouter);
router.use('/render', renderRouter);
router.use('/admin', adminRouter);

import { Router } from 'express';
import mongoose from 'mongoose';
import authRoutes from '../modules/auth/auth.routes.js';
import usersRoutes from '../modules/users/users.routes.js';

const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', db: mongoose.connection.readyState === 1 ? 'up' : 'down', uptime: process.uptime() });
});

router.use('/auth', authRoutes);
router.use('/users', usersRoutes);

export default router;

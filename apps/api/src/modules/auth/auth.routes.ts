import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validate } from '../../middlewares/validate.js';
import * as controller from './auth.controller.js';
import { loginSchema, registerSchema } from './auth.schema.js';

const router = Router();

// Stricter limit on credential endpoints to slow down brute force
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: true, legacyHeaders: false });

router.post('/register', authLimiter, validate(registerSchema), controller.register);
router.post('/login', authLimiter, validate(loginSchema), controller.login);
router.post('/logout', controller.logout);

export default router;

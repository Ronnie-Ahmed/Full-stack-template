import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const COOKIE_NAME = 'token';

export const requireAuth: RequestHandler = (req, _res, next) => {
  const bearer = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : undefined;
  const token = req.cookies?.[COOKIE_NAME] ?? bearer;
  if (!token) return next(ApiError.unauthorized());

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as { sub: string; role: 'user' | 'admin' };
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next(ApiError.unauthorized('Invalid or expired token'));
  }
};

export const requireRole =
  (...roles: Array<'user' | 'admin'>): RequestHandler =>
  (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) return next(ApiError.forbidden());
    next();
  };

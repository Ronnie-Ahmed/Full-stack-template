import type { CookieOptions, Response } from 'express';
import { env, isProd } from '../../config/env.js';
import { COOKIE_NAME } from '../../middlewares/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import * as authService from './auth.service.js';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: 'lax',
  maxAge: env.JWT_EXPIRES_DAYS * 24 * 60 * 60 * 1000,
  path: '/',
};

const setAuthCookie = (res: Response, token: string) => res.cookie(COOKIE_NAME, token, cookieOptions);

export const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  setAuthCookie(res, token);
  res.status(201).json({ user });
});

export const login = asyncHandler(async (req, res) => {
  const { user, token } = await authService.login(req.body);
  setAuthCookie(res, token);
  res.json({ user });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: undefined });
  res.status(204).end();
});

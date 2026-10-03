import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { ApiError } from '../../utils/ApiError.js';
import { UserModel } from '../users/user.model.js';

const toPublic = (u: { _id: unknown; name: string; email: string; role: string }) => ({
  id: String(u._id),
  name: u.name,
  email: u.email,
  role: u.role,
});

export function signToken(id: string, role: string) {
  return jwt.sign({ role }, env.JWT_SECRET, {
    subject: id,
    expiresIn: env.JWT_EXPIRES_DAYS * 24 * 60 * 60,
  });
}

export async function register(input: { name: string; email: string; password: string }) {
  if (await UserModel.exists({ email: input.email })) throw ApiError.conflict('Email already in use');
  const password = await bcrypt.hash(input.password, 12);
  const user = await UserModel.create({ ...input, password });
  return { user: toPublic(user), token: signToken(String(user._id), user.role) };
}

export async function login(input: { email: string; password: string }) {
  const user = await UserModel.findOne({ email: input.email }).select('+password');
  const ok = user && (await bcrypt.compare(input.password, user.password));
  if (!user || !ok) throw ApiError.unauthorized('Invalid email or password');
  return { user: toPublic(user), token: signToken(String(user._id), user.role) };
}

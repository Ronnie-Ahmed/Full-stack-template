import { Router } from 'express';
import { requireAuth } from '../../middlewares/auth.js';
import { asyncHandler } from '../../utils/asyncHandler.js';
import { ApiError } from '../../utils/ApiError.js';
import { UserModel } from './user.model.js';

const router = Router();

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.user!.id).lean();
    if (!user) throw ApiError.notFound('User not found');
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  }),
);

export default router;

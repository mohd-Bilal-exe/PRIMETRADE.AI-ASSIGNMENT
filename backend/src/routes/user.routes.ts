import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware.js';
import { getUserProfile, updateUserProfile } from '../services/user.service.js';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

const router = Router();

// GET /backend/users/profile
router.get('/profile', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const user = await getUserProfile(userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to fetch profile',
    });
  }
});

// PUT /backend/users/profile
router.put(
  '/profile',
  authMiddleware,
  [
    body('name')
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage('Name must be at least 2 characters long'),
    handleValidationErrors,
  ],
  async (req: AuthRequest, res: Response) => {
    try {
      const userId = req.user!.userId;
      const updates = req.body;

      const user = await updateUserProfile(userId, updates);

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message || 'Failed to update profile',
      });
    }
  }
);

export default router;

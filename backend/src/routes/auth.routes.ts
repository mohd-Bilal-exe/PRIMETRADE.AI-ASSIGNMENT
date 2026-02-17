import { Router, Request, Response } from 'express';
import { loginUser, registerUser } from '../services/auth.service.js';
import { loginValidation, signupValidation } from '../middlewares/validate.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

// POST /backend/auth/signup
router.post('/signup', signupValidation, async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const result = await registerUser({ email, password, name });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed',
    });
  }
});

// POST /backend/auth/login
router.post('/login', loginValidation, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Login failed',
    });
  }
});
// POST /backend/auth/checkAuth
router.get('/checkAuth', authMiddleware, async (req: Request, res: Response) => {
  try {
   
    res.status(200).json({
      success: true,
      message: 'Token available',
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message || 'Token not available/ Expired.',
    });
  }
});

export default router;

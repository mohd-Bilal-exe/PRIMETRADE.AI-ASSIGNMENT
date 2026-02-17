import { Router, Response } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/auth.middleware.js';
import { body } from 'express-validator';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../services/task.service.js';
import { handleValidationErrors } from '../middlewares/validate.middleware.js';

const router = Router();

// All routes are protected
router.use(authMiddleware);

// Task validation rules
const taskValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must be at most 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must be at most 1000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Status must be pending, in-progress, or completed'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Priority must be low, medium, or high'),
  handleValidationErrors,
];

// POST /backend/tasks - Create task
router.post('/', taskValidation, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const task = await createTask(userId, req.body);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create task',
    });
  }
});

// GET /backend/tasks - Get all tasks with filters
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { status, priority, search, page = '1', limit = '10' } = req.query;

    const filters = {
      status: status as string,
      priority: priority as string,
      search: search as string,
    };

    const result = await getTasks(
      userId,
      filters,
      parseInt(page as string),
      parseInt(limit as string)
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to fetch tasks',
    });
  }
});

// GET /backend/tasks/:id - Get single task
router.get('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const task = await getTaskById(userId, id as string);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Task not found',
    });
  }
});

// PUT /backend/tasks/:id - Update task
router.put('/:id', taskValidation, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const task = await updateTask(userId, id as string, req.body);

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task,
    });
  } catch (error: any) {
    console.error('Failed to update task:', error); 
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update task',
    });
  }
});

// DELETE /backend/tasks/:id - Delete task
router.delete('/:id', async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const { id } = req.params;

    const result = await deleteTask(userId, id as string);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || 'Failed to delete task',
    });
  }
});

export default router;

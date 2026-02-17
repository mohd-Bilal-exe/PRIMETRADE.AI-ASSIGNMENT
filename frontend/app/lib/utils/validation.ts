import { z } from 'zod';

// Authenticatiion schemas
export const signupSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/\d/, 'Password must contain at least one number'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

// User schema
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be at most 50 characters'),
});

// Tasks schemas
export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be at most 200 characters'),
  description: z.string().max(1000, 'Description must be at most 1000 characters').optional(),
  status: z.enum(['pending', 'in-progress', 'completed']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

export const updateTaskSchema = createTaskSchema;

// Type exports
export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Loader2, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { useAuthStore } from '@/app/lib/store/authStore';
import { signupSchema, SignupInput } from '@/app/lib/utils/validation';
import BackButton from '../lib/components/BackButton';

export default function Signup() {
  const [error, setError] = useState('');
  const { signup, isAuthenticated, isLoading: authLoading, isHydrated } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const password = watch('password', '');

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, authLoading, router]);

  const onSubmit = async (data: SignupInput) => {
    try {
      setError('');
      await signup(data.email, data.password, data.name);
    } catch (err: any) {
      setError(err.message || 'Signup failed. Please try again.');
    }
  };

  if (authLoading || !isHydrated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900 dark:text-neutral-50" />
      </div>
    );
  }

  const getPasswordStrength = () => {
    if (!password) return { label: '', color: '' };
    if (password.length < 6) return { label: 'Weak', color: 'text-red-500' };
    if (password.length < 10 && /\d/.test(password)) return { label: 'Medium', color: 'text-yellow-500' };
    if (password.length >= 10 && /\d/.test(password) && /[A-Z]/.test(password))
      return { label: 'Strong', color: 'text-emerald-500' };
    return { label: 'Medium', color: 'text-yellow-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4 py-12">
      <BackButton path='/'/>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50 tracking-tight">Create account</h1>
          <p className="text-neutral-500 dark:text-neutral-400 mt-2">Join us and start managing your tasks</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all outline-none ${
                    errors.name ? 'border-red-300 focus:ring-red-200' : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                  {...register('name')}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all outline-none ${
                    errors.email ? 'border-red-300 focus:ring-red-200' : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                  {...register('email')}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all outline-none ${
                    errors.password ? 'border-red-300 focus:ring-red-200' : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                  {...register('password')}
                />
              </div>
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
              {password && (
                <div className="flex items-center gap-2 mt-1">
                    <div className="h-1 flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full transition-all duration-300 ${
                                passwordStrength.label === 'Weak' ? 'bg-red-500 w-1/3' : 
                                passwordStrength.label === 'Medium' ? 'bg-yellow-500 w-2/3' : 
                                'bg-emerald-500 w-full'
                            }`}
                        />
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>
                        {passwordStrength.label}
                    </span>
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Check className="h-5 w-5 text-neutral-400" />
                </div>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all outline-none ${
                    errors.confirmPassword ? 'border-red-300 focus:ring-red-200' : 'border-neutral-200 dark:border-neutral-700'
                  }`}
                  {...register('confirmPassword')}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-neutral-500 dark:text-neutral-400">Already have an account? </span>
            <Link href="/login" className="font-medium text-neutral-900 dark:text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

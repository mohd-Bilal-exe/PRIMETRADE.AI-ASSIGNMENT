'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/app/lib/store/authStore';
import { updateProfileSchema, UpdateProfileInput } from '@/app/lib/utils/validation';
import { Loader2, User, Mail, Calendar, Save } from 'lucide-react';
import api from '@/app/lib/services/api';

export default function Profile() {
  const { user,  } = useAuthStore();
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user?.name || '',
    },
  });

  const onSubmit = async (data: UpdateProfileInput) => {
    try {
      setError('');
      setSuccess('');
      await api.put('/users/profile', data);
      
      
      if (user) {
          const updatedUser = { ...user, name: data.name };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          useAuthStore.setState({ user: updatedUser });
      }

      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (!user) {
      return (
        <div className="flex justify-center items-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-neutral-500" />
        </div>
      )
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">Profile Settings</h1>
        <p className="text-neutral-500 dark:text-neutral-400 mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Card */}
        <div className="md:col-span-1">
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center mb-4 text-3xl font-bold text-neutral-500 dark:text-neutral-400">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{user.name}</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">{user.email}</p>
            
            <div className="mt-6 w-full pt-6 border-t border-neutral-100 dark:border-neutral-700">
              <div className="flex items-center justify-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                <Calendar className="h-4 w-4" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Form */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-50 mb-6">General Information</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {success && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 px-4 py-3 rounded-lg text-sm">
                  {success}
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Email Address</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                    type="email"
                    value={user.email}
                    disabled
                    className="block w-full pl-10 pr-3 py-2.5 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 text-neutral-500 dark:text-neutral-500 cursor-not-allowed text-sm"
                    />
                </div>
                <p className="text-xs text-neutral-500 max-w-xs">Email address cannot be changed for security reasons.</p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">Full Name</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                    type="text"
                    placeholder="John Doe"
                    className={`block w-full pl-10 pr-3 py-2.5 border rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all outline-none text-sm ${
                        errors.name ? 'border-red-300 focus:ring-red-200' : 'border-neutral-200 dark:border-neutral-700'
                    }`}
                    {...register('name')}
                    />
                </div>
                {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-900 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                    <Save className="h-4 w-4 mr-2" />
                    )}
                    Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

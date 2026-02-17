'use client';
import { Bell, Sun, Moon, Menu, AlertTriangle } from 'lucide-react';
import { useAuthStore } from '@/app/lib/store/authStore';
import { useUIStore } from '@/app/lib/store/uiStore';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function TopNav() {
  const { user } = useAuthStore();
  const { toggleSidebar } = useUIStore();
  const { theme, setTheme } = useTheme();
  const router = useRouter(); 
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-md p-1 hover:bg-neutral-100 dark:hover:bg-neutral-800 md:hidden"
        >
          <Menu className="h-6 w-6 text-neutral-600 dark:text-neutral-300" />
        </button>
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Tasks</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-3">
             <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <button onClick={()=>{ router.push('/dashboard/profile')}} className="flex h-full w-full items-center justify-center text-xs font-medium text-neutral-500 dark:text-neutral-300 cursor-pointer">
                  {user?.name?.charAt(0) || 'U'}
                </button>
             </div>
          </div>
        </div>
      </div>
    </header>
  );
}

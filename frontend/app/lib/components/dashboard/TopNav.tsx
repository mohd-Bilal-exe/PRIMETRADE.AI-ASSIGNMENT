'use client';

import React from 'react';
import { Search, Bell, Sun, Moon, Menu } from 'lucide-react';
import { useAuthStore } from '@/app/lib/store/authStore';
import { useUIStore } from '@/app/lib/store/uiStore';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';

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
        {/* Breadcrumbs could go here */}
        <h1 className="text-xl font-semibold text-neutral-900 dark:text-white">Tasks</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-neutral-200 bg-neutral-50 pl-9 pr-4 text-sm outline-none focus:border-neutral-300 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:focus:border-neutral-600"
          />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button className="rounded-full p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800">
            <Bell className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-3">
             <div className="h-8 w-8 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                {/* Avatar placeholder */}
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

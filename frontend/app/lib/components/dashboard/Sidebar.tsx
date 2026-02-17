'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, User, LogOut, X } from 'lucide-react'; // Layout for Tasks (Board), User for Profile
import { useAuthStore } from '@/app/lib/store/authStore';
import { useUIStore } from '@/app/lib/store/uiStore';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const navItems = [
  { name: 'Tasks', href: '/dashboard', icon: Layout },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { isSidebarOpen, closeSidebar } = useUIStore();

  return (
    <>
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
        />
      )}
      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 flex h-full w-64 flex-col border-r bg-white transition-transform duration-300 dark:bg-neutral-900 dark:border-neutral-800 md:static md:translate-x-0",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b dark:border-neutral-800">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-neutral-900 dark:text-white">
            <span>PrimeTrade.ai</span>
          </Link>
          <button 
            onClick={closeSidebar}
            className="rounded-md p-1 md:hidden hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <X className="h-5 w-5 text-neutral-500" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => closeSidebar()} // Close sidebar on nav click (mobile UX)
                className={twMerge(
                  clsx(
                    'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-white'
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                  )
                )}
              >
                <Icon
                  className={clsx(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-400 group-hover:text-neutral-500 dark:text-neutral-500 dark:group-hover:text-neutral-300'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4 dark:border-neutral-800">
           <button
              onClick={logout}
              className="flex w-full items-center gap-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors dark:hover:bg-red-900/10"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
        </div>
      </div>
    </>
  );
}

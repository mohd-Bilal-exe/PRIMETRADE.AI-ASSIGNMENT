'use client';

import React from 'react';
import ProtectedRoute from '@/app/lib/components/ProtectedRoute';
import { Sidebar } from '@/app/lib/components/dashboard/Sidebar';
import { TopNav } from '@/app/lib/components/dashboard/TopNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen text-neutral-900 bg-white dark:bg-neutral-900 dark:text-neutral-50 overflow-hidden transition-colors duration-500 ease-in-out">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-auto ">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

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
      <div className="flex h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 overflow-hidden">
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

'use client';

import { KanbanBoard } from '@/app/lib/components/dashboard/KanbanBoard';

export default function DashboardPage() {
  return (
    <div className="h-full w-full bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50">
      <KanbanBoard />
    </div>
  );
}

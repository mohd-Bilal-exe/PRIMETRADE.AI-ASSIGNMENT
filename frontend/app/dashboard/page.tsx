'use client';

import { KanbanBoard } from '@/app/lib/components/dashboard/KanbanBoard';

export default function DashboardPage() {
  return (
    <div className="h-full w-full  text-neutral-900  dark:text-neutral-50 overflow-x-auto scroll">
      <KanbanBoard />
    </div>
  );
}

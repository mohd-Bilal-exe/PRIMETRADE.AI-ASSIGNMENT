import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, isHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (isHydrated && !isLoading && !isAuthenticated) {
      console.error('Redirecting to Login');
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, isHydrated, router]);

  if (!isHydrated || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900 dark:text-neutral-50" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

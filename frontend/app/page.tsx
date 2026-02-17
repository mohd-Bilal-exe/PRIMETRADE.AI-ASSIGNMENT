'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Search, Shield, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/app/lib/store/authStore';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-neutral-50 dark:bg-neutral-900">
        <Loader2 className="h-8 w-8 animate-spin text-neutral-900 dark:text-neutral-50" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 selection:bg-neutral-200 dark:selection:bg-neutral-700">
      <nav className="fixed w-full z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight">PrimeTrade.ai</span>
            </div>
            <div className="flex gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-medium bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-lg hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
      
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 text-neutral-900 dark:text-white">
            Manage tasks with <br className="hidden sm:block" />
            <span className="text-neutral-500 dark:text-neutral-400">unmatched clarity.</span>
          </h1>
          
          <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A drag and drop task management system.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-neutral-900 dark:bg-neutral-50 text-white dark:text-neutral-900 rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-all shadow-lg shadow-neutral-500/20 dark:shadow-neutral-900/40"
            >
              Start for free <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-medium bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all"
            >
              Live Demo
            </Link>
          </div>
        </motion.div>
      </div>
      <div className="py-24 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <FeatureCard 
              icon={<CheckCircle2 className="h-6 w-6 text-neutral-900 dark:text-white" />}
              title="Kanban Boards"
              description="Visualize workflow with customizable boards. Drag and drop tasks to track progress effortlessly."
            />
            <FeatureCard 
              icon={<Search className="h-6 w-6 text-neutral-900 dark:text-white" />}
              title="Smart Filtering"
              description="Find exactly what you need with powerful search capabilities and advanced filtering options."
            />
            <FeatureCard 
              icon={<Shield className="h-6 w-6 text-neutral-900 dark:text-white" />}
              title="Enterprise Security"
              description="Bank-grade encryption and secure authentication keep your team's data safe and private."
            />
          </motion.div>
        </div>
      </div>
      <footer className="bg-neutral-50 dark:bg-neutral-900 py-12 border-t border-neutral-200 dark:border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row  items-center gap-6 justify-center">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} PrimeTrade.ai. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors group">
      <div className="h-12 w-12 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-3">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

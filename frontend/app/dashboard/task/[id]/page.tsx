'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, Save, ArrowLeft, AlertCircle, Clock, Trash2, Tag, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '@/app/lib/services/api';
import BackButton from '@/app/lib/components/BackButton';
import { Task } from '@/app/lib/types';
import ReactMarkdown from 'react-markdown';
import clsx from 'clsx';

export default function TaskDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Form states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<string>('pending');
    const [priority, setPriority] = useState<string>('medium');

    useEffect(() => {
        fetchTask();
    }, [id]);

    const fetchTask = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/tasks/${id}`);
            const data = response.data.data;
            setTask(data);

            // Initialize form
            setTitle(data.title);
            setDescription(data.description || '');
            setStatus(data.status);
            setPriority(data.priority);
        } catch (err: any) {
            console.error('Failed to fetch task:', err);
            setError('Failed to load task details');
            toast.error('Failed to load task');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!title.trim()) {
            toast.error('Title is required');
            return;
        }

        try {
            setSaving(true);
            await api.put(`/tasks/${id}`, {
                title,
                description,
                status,
                priority
            });

            toast.success('Saved');
            setIsEditing(false);
        } catch (err: any) {
            console.error('Failed to update task:', err);
            if (err.response?.data?.errors) {
                err.response.data.errors.forEach((error: any) => {
                    toast.error(error.msg);
                });
            } else {
                toast.error(err.response?.data?.message || 'Failed to update task');
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            await api.delete(`/tasks/${id}`);
            toast.success("Task deleted");
            router.push('/dashboard');
        } catch (error) {
            toast.error("Failed to delete task");
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-neutral-900">
                <Loader2 className="h-8 w-8 animate-spin text-neutral-900 dark:text-white" />
            </div>
        );
    }

    if (error || !task) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 px-4">
                <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Error Loading Task</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">{error || 'Task not found'}</p>
                <BackButton path="/dashboard" className="static transform-none" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50">
            <header className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="p-2 -ml-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-500"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </button>
                        <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
                            <span className="hidden sm:inline">Last edited {task.updatedAt ? new Date(task.updatedAt).toLocaleDateString() : 'today'}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleDelete}
                            className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete Task"
                        >
                            <Trash2 className="h-5 w-5" />
                        </button>
                        <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-700 mx-1"></div>
                        <button
                            onClick={() => handleUpdate()}
                            disabled={saving}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-all disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="h-4 w-4" />
                                    Save
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div className="group">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full text-4xl sm:text-5xl font-bold bg-transparent border-none placeholder-neutral-300 dark:placeholder-neutral-700 focus:ring-0 p-0 text-neutral-900 dark:text-white"
                            placeholder="Task Title"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-4 sm:gap-8 pb-6 border-b border-neutral-100 dark:border-neutral-800">

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 min-w-[80px]">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="text-sm font-medium">Status</span>
                            </div>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className={clsx(
                                    "bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer py-1 pl-2 pr-8 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                                    status === 'completed' ? 'text-green-600 dark:text-green-400' :
                                        status === 'in-progress' ? 'text-blue-600 dark:text-blue-400' :
                                            'text-neutral-600 dark:text-neutral-300'
                                )}
                            >
                                <option value="pending">Todo</option>
                                <option value="in-progress">In Progress</option>
                                <option value="completed">Done</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 min-w-[80px]">
                                <Tag className="h-4 w-4" />
                                <span className="text-sm font-medium">Priority</span>
                            </div>
                            <select
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                                className={clsx(
                                    "bg-transparent border-none text-sm font-medium focus:ring-0 cursor-pointer py-1 pl-2 pr-8 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors",
                                    priority === 'high' ? 'text-red-500' :
                                        priority === 'medium' ? 'text-orange-500' :
                                            'text-blue-500'
                                )}
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3 text-neutral-500 dark:text-neutral-400">
                            <div className="flex items-center gap-2 min-w-[80px]">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">Created</span>
                            </div>
                            <span className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div className="min-h-[400px]">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">Description</h3>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                            >
                                {isEditing ? 'Preview' : 'Edit'}
                            </button>
                        </div>
                        {isEditing ? (
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-[60vh] bg-transparent border rounded-xl border-neutral-200 dark:border-neutral-800 p-4 text-base leading-relaxed text-neutral-700 dark:text-neutral-300 resize-none placeholder-neutral-300 dark:placeholder-neutral-700 focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:border-transparent transition-all outline-none"
                                placeholder="Review the project requirements and create a timeline..."
                            />
                        ) : (
                            <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300">
                                <ReactMarkdown>{description || '*No description provided.*'}</ReactMarkdown>
                            </div>
                        )}
                    </div>

                </motion.div>
            </main>
        </div>
    );
}

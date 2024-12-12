'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { Task } from '@/types/task';
import Layout from '@/components/Layout';

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('#3B82F6');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/tasks/${params.id}`);
        if (!response.ok) {
          throw new Error('Task not found');
        }
        const taskData = await response.json();
        setTask(taskData);
        setTitle(taskData.title);
        setColor(taskData.color);
      } catch (error) {
        setError('Failed to load task');
        console.error('Failed to fetch task:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateTask(Number(params.id), { title, color });
      router.push('/');
    } catch (error) {
      console.error('Failed to update task:', error);
      setError('Failed to update task');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center">
          <p className="text-white">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center">
          <p className="mb-4 text-red-500">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="text-[#0EA5E9] hover:text-[#0284C7] transition-colors"
          >
            Return to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4">
        <button
          onClick={() => router.back()}
          className="mb-8 text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-xl font-bold">←</span>
        </button>

        <form onSubmit={handleSubmit} className="mt-12 space-y-8">
          <div className="mx-auto w-full max-w-md">
            <label className="mb-2 block text-sm font-bold text-[#0EA5E9]">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Brush your teeth"
              className="w-full rounded-lg bg-[#1E1E1E] p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#0EA5E9]"
              required
            />
          </div>

          <div className="mx-auto w-full max-w-md">
            <label className="mb-2 block text-sm font-bold text-[#0EA5E9]">
              Color
            </label>
            <div className="flex justify-center gap-2">
              {['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#6366F1', '#A855F7', '#EC4899', '#78716C'].map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`h-8 w-8 rounded-full transition-transform ${
                    color === c ? 'ring-2 ring-white scale-110' : ''
                  }`}
                  style={{ backgroundColor: c }}
                  onClick={() => setColor(c)}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
          <button
  type="submit"
  className="flex w-full items-center justify-center gap-1 rounded-lg bg-[#0EA5E9] py-3 text-white transition-colors hover:bg-[#0284C7]"
>
  <span className="font-bold">Save Changes</span>
  <svg 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M13.3333 14H2.66667C2.29848 14 2 13.7015 2 13.3333V2.66667C2 2.29848 2.29848 2 2.66667 2H11.3333L14 4.66667V13.3333C14 13.7015 13.7015 14 13.3333 14Z" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M11.3333 14V9.33333H4.66667V14" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M4.66667 2V4.66667H10.6667" 
      stroke="currentColor" 
      strokeWidth="2"
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
</button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
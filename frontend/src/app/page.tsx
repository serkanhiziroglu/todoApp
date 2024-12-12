'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import TaskItem from '@/components/TaskItem';
import { Task } from '@/types/task';
import { api } from '@/lib/api';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  useEffect(() => {
    api.getTasks().then(setTasks);
  }, []);

  const handleToggle = async (id: number) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updatedTask = await api.updateTask(id, {
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <Layout>
<button
  onClick={() => router.push('/tasks/new')}
  className="mb-8 flex w-full items-center justify-center gap-1 rounded-lg bg-[#0EA5E9] py-3 text-white transition-colors hover:bg-[#0284C7]"
>
  <span className="font-bold">Create Task</span>
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 20 20" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 6V14M6 10H14"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</button>

      <div className="mb-6 flex justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#0EA5E9]">Tasks</span>
          <span className="rounded bg-[#1A1A1A] px-2 py-0.5 text-sm text-gray-400">
            {tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#A855F7]">Completed</span>
          <span className="rounded bg-[#1A1A1A] px-2 py-0.5 text-sm text-gray-400">
            {completedCount} of {tasks.length}
          </span>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="py-12 text-center">
          <svg 
            className="mx-auto mb-4 h-16 w-16 text-gray-400"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-gray-400">You don't have any tasks registered yet.</p>
          <p className="text-sm text-gray-500">Create tasks and organize your to-do items.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
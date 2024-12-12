'use client';

import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('input')) {
      return;
    }
    router.push(`/tasks/${task.id}/edit`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-[#1A1A1A] rounded-lg py-6 px-4 flex items-center justify-between group hover:bg-[#2D2D2D] transition-colors cursor-pointer"
      style={{ 
        borderLeft: `4px solid ${task.color}`,
        borderTop: `1px solid rgba(${task.color.replace(/[^\d,]/g, '')}, 0.1)`
      }}
    >
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative flex items-center justify-center" onClick={e => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="peer w-5 h-5 appearance-none rounded-full border-2 transition-colors"
            style={{ 
              borderColor: task.color,
              backgroundColor: task.completed ? task.color : 'transparent'
            }}
          />
          <svg 
            className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M10 3L4.5 8.5L2 6" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
          {task.title}
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="text-gray-400 hover:text-white ml-4"
      >
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 16 16" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M2 4H14M5.333 4V2.667C5.333 2.298 5.631 2 6 2H10C10.368 2 10.667 2.298 10.667 2.667V4M6.667 7.333V11.333M9.333 7.333V11.333M12 4V13.333C12 13.702 11.702 14 11.333 14H4.667C4.298 14 4 13.702 4 13.333V4" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
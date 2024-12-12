'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Layout from '@/components/Layout';

export default function NewTaskPage() {
 const router = useRouter();
 const [title, setTitle] = useState('');
 const [color, setColor] = useState('#3B82F6');

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   try {
     await api.createTask({ title, color });
     router.push('/');
   } catch (error) {
     console.error('Failed to create task:', error);
   }
 };

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
             {['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#6366F1', '#A855F7', '#EC4899', '#92400E'].map((c) => (
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
             <span className="font-bold">Add Task</span>
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
         </div>
       </form>
     </div>
   </Layout>
 );
}
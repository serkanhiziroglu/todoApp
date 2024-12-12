'use client';

import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <header className="mb-8 flex justify-center">
          <div className="flex items-center gap-2">
            <span className="text-xl text-[#0EA5E9]">🚀</span>
            <h1 className="text-2xl font-bold">
              <span className="text-[#0EA5E9]">Todo</span>
              <span className="text-[#A855F7]">App</span>
            </h1>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
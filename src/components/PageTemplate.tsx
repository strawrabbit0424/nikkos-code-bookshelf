// src/components/PageTemplate.tsx
import React from 'react';

type PageTemplateProps = {
  children: React.ReactNode;
};

export function PageTemplate({ children }: PageTemplateProps) {
  return (
    <div className="h-full bg-[#1e212e] text-palenight-text rounded-lg shadow-2xl border border-palenight-border/20 overflow-hidden flex flex-col">
      {/* Sin encabezado ni título: solo el contenido puro */}
      <div className="flex-1 p-6 lg:p-10 overflow-y-auto no-scrollbar leading-relaxed text-base lg:text-lg">
        {children}
      </div>
    </div>
  );
}
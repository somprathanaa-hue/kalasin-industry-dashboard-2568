import type { ReactNode } from 'react';

interface BentoCardProps {
  children: ReactNode;
  className?: string;
}

export const BentoCard = ({ children, className = '' }: BentoCardProps) => (
  <div
    className={`rounded-2xl border border-sky-400/15 bg-slate-900/70 shadow-[0_0_32px_-16px_rgba(56,189,248,0.45)] backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-sky-400/35 ${className}`}
  >
    {children}
  </div>
);

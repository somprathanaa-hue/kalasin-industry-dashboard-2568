import type { ReactNode } from 'react';
import { BentoCard } from '@/components/BentoCard';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  isEmpty?: boolean;
  children: ReactNode;
}

export const ChartCard = ({ title, subtitle, className = '', isEmpty = false, children }: ChartCardProps) => (
  <BentoCard className={`flex flex-col p-5 sm:p-6 ${className}`}>
    <div className="mb-4">
      <h2 className="text-base font-bold text-slate-100 sm:text-lg">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
    </div>
    {isEmpty ? (
      <div className="flex flex-1 items-center justify-center py-16 text-sm text-slate-400">
        ไม่มีข้อมูลตามตัวกรองที่เลือก
      </div>
    ) : (
      <div className="flex-1">{children}</div>
    )}
  </BentoCard>
);

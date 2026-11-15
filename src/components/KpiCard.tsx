import { ArrowDownRight, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { BentoCard } from '@/components/BentoCard';
import { formatPercent } from '@/utils/format';

interface KpiCardProps {
  label: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  change: number | null;
  className?: string;
}

export const KpiCard = ({ label, value, unit, icon: Icon, change, className = '' }: KpiCardProps) => {
  const isUp = change !== null && change >= 0;
  return (
    <BentoCard className={`group relative overflow-hidden p-5 sm:p-6 ${className}`}>
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-sky-400/10 blur-2xl transition duration-500 group-hover:bg-sky-400/20" />
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400/10 text-sky-400 ring-1 ring-sky-400/20">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        {change !== null && (
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
              isUp ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-300'
            }`}
          >
            {isUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {formatPercent(change)}
          </span>
        )}
      </div>
      <p className="relative mt-5 text-sm text-slate-400">{label}</p>
      <p className="relative mt-1 flex items-baseline gap-2">
        <span className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl">{value}</span>
        <span className="text-sm text-slate-400">{unit}</span>
      </p>
    </BentoCard>
  );
};

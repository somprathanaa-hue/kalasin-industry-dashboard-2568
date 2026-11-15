import { RotateCcw } from 'lucide-react';
import type { DashboardFilters } from '@/types/dashboard';
import { FILTER_YEARS, DISTRICTS, INDUSTRY_TYPES } from '@/data/mockData';
import { ALL } from '@/utils/dashboardStats';

interface FilterBarProps {
  filters: DashboardFilters;
  defaultFilters: DashboardFilters;
  onChange: (next: DashboardFilters) => void;
}

const selectClass =
  'w-full rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30';

export const FilterBar = ({ filters, defaultFilters, onChange }: FilterBarProps) => {
  const isDefault =
    filters.year === defaultFilters.year &&
    filters.district === defaultFilters.district &&
    filters.industry === defaultFilters.industry;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur-sm sm:p-5">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-end">
        <div className="md:col-span-4">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">ปีงบประมาณ</span>
          <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950/80 p-1 ring-1 ring-slate-800">
            {FILTER_YEARS.map((year) => (
              <button
                key={year}
                type="button"
                onClick={() => onChange({ ...filters, year })}
                className={`rounded-lg px-2 py-2 text-sm font-medium transition ${
                  filters.year === year
                    ? 'bg-sky-500 text-slate-950 shadow-[0_0_16px_-2px_rgba(56,189,248,0.7)]'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        <label className="md:col-span-3">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">อำเภอ</span>
          <select
            className={selectClass}
            value={filters.district}
            onChange={(event) => onChange({ ...filters, district: event.target.value })}
          >
            <option value={ALL}>ทั้งหมด</option>
            {DISTRICTS.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>

        <label className="md:col-span-3">
          <span className="mb-2 block text-xs font-medium uppercase tracking-wide text-slate-400">ประเภทอุตสาหกรรม</span>
          <select
            className={selectClass}
            value={filters.industry}
            onChange={(event) => onChange({ ...filters, industry: event.target.value })}
          >
            <option value={ALL}>ทั้งหมด</option>
            {INDUSTRY_TYPES.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </label>

        <div className="md:col-span-2">
          <button
            type="button"
            onClick={() => onChange(defaultFilters)}
            disabled={isDefault}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-sky-400/30 px-4 py-2.5 text-sm font-medium text-sky-300 transition hover:bg-sky-400/10 hover:text-sky-200 disabled:cursor-not-allowed disabled:border-slate-700 disabled:text-slate-500 disabled:hover:bg-transparent"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            รีเซ็ตฟิลเตอร์
          </button>
        </div>
      </div>
    </section>
  );
};

import { useMemo, useState } from 'react';
import { Banknote, Building2, Coins, Users } from 'lucide-react';
import type { DashboardFilters } from '@/types/dashboard';
import { DEFAULT_YEAR, FACTORIES } from '@/data/mockData';
import { DashboardHeader } from '@/components/DashboardHeader';
import { FilterBar } from '@/components/FilterBar';
import { KpiCard } from '@/components/KpiCard';
import { FactoryTable } from '@/components/FactoryTable';
import { MonthlyTrendChart } from '@/components/charts/MonthlyTrendChart';
import { DistrictBarChart } from '@/components/charts/DistrictBarChart';
import { IndustryDonutChart } from '@/components/charts/IndustryDonutChart';
import { OutputBarChart } from '@/components/charts/OutputBarChart';
import {
  ALL,
  buildDistrictCounts,
  buildFactoryRows,
  buildIndustryBreakdown,
  buildMonthlyTrend,
  percentChange,
  summarizeYear,
} from '@/utils/dashboardStats';
import { formatInteger } from '@/utils/format';

const DEFAULT_FILTERS: DashboardFilters = { year: DEFAULT_YEAR, district: ALL, industry: ALL };

export default function App() {
  const [filters, setFilters] = useState<DashboardFilters>(DEFAULT_FILTERS);

  const view = useMemo(() => {
    const current = summarizeYear(FACTORIES, filters, filters.year);
    const previous = summarizeYear(FACTORIES, filters, filters.year - 1);
    return {
      current,
      previous,
      monthly: buildMonthlyTrend(FACTORIES, filters),
      districts: buildDistrictCounts(FACTORIES, filters),
      industries: buildIndustryBreakdown(FACTORIES, filters),
      latest: buildFactoryRows(FACTORIES, filters, 'latest', 10),
      topOutput: buildFactoryRows(FACTORIES, filters, 'output', 10),
    };
  }, [filters]);

  const { current, previous } = view;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-sky-500/10 to-transparent" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl" />

      <main className="relative mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <DashboardHeader />

        <FilterBar filters={filters} defaultFilters={DEFAULT_FILTERS} onChange={setFilters} />

        <section aria-label="ตัวชี้วัดหลัก" className="space-y-3">
          <p className="text-sm text-slate-400">เปรียบเทียบกับปี {filters.year - 1}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <KpiCard
              label="จำนวนโรงงาน"
              value={formatInteger(current.factories)}
              unit="แห่ง"
              icon={Building2}
              change={percentChange(current.factories, previous.factories)}
            />
            <KpiCard
              label="จำนวนแรงงาน"
              value={formatInteger(current.employees)}
              unit="คน"
              icon={Users}
              change={percentChange(current.employees, previous.employees)}
            />
            <KpiCard
              label="เงินลงทุน"
              value={formatInteger(current.investment)}
              unit="ล้านบาท"
              icon={Banknote}
              change={percentChange(current.investment, previous.investment)}
            />
            <KpiCard
              label="มูลค่าผลผลิต"
              value={formatInteger(current.output)}
              unit="ล้านบาท"
              icon={Coins}
              change={percentChange(current.output, previous.output)}
            />
          </div>
        </section>

        <section aria-label="กราฟสถิติ" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <MonthlyTrendChart data={view.monthly} className="sm:col-span-2 lg:col-span-3" />
          <IndustryDonutChart data={view.industries} className="sm:col-span-2 lg:col-span-1" />
          <DistrictBarChart data={view.districts} className="sm:col-span-1 lg:col-span-2" />
          <OutputBarChart data={view.industries} className="sm:col-span-1 lg:col-span-2" />
          <FactoryTable latest={view.latest} topOutput={view.topOutput} />
        </section>
      </main>
    </div>
  );
}

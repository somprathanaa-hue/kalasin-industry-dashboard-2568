import type { DashboardFilters, Factory, FactoryRow, IndustryType } from '@/types/dashboard';
import { INDUSTRY_TYPES, DISTRICTS } from '@/data/mockData';

export const ALL = 'all';

export const MONTH_LABELS = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.',
];

const inScope = (factory: Factory, filters: DashboardFilters) =>
  (filters.district === ALL || factory.district === filters.district) &&
  (filters.industry === ALL || factory.industry === filters.industry);

const activeInYear = (factory: Factory, year: number) => factory.openYear <= year;

const scopedFactories = (factories: Factory[], filters: DashboardFilters, year: number) =>
  factories.filter((factory) => activeInYear(factory, year) && inScope(factory, filters));

export const summarizeYear = (
  factories: Factory[],
  filters: DashboardFilters,
  year: number,
) => {
  const summary = { factories: 0, employees: 0, investment: 0, output: 0 };
  for (const factory of scopedFactories(factories, filters, year)) {
    const metrics = factory.yearly[year];
    summary.factories += 1;
    summary.employees += metrics.employees;
    summary.investment += metrics.investment;
    summary.output += metrics.output;
  }
  return summary;
};

export const buildMonthlyTrend = (factories: Factory[], filters: DashboardFilters) =>
  MONTH_LABELS.map((month, index) => {
    const monthNumber = index + 1;
    const count = factories.filter(
      (factory) =>
        inScope(factory, filters) &&
        (factory.openYear < filters.year ||
          (factory.openYear === filters.year && factory.openMonth <= monthNumber)),
    ).length;
    return { month, factories: count };
  });

export const buildDistrictCounts = (factories: Factory[], filters: DashboardFilters) => {
  const counts = new Map<string, number>(DISTRICTS.map((district) => [district, 0]));
  for (const factory of scopedFactories(factories, filters, filters.year)) {
    counts.set(factory.district, (counts.get(factory.district) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([district, count]) => ({ district, factories: count }))
    .sort((a, b) => b.factories - a.factories)
    .slice(0, 10);
};

export const buildIndustryBreakdown = (factories: Factory[], filters: DashboardFilters) => {
  const breakdown = new Map<IndustryType, { factories: number; output: number }>(
    INDUSTRY_TYPES.map((industry) => [industry, { factories: 0, output: 0 }]),
  );
  for (const factory of scopedFactories(factories, filters, filters.year)) {
    const entry = breakdown.get(factory.industry);
    if (!entry) continue;
    entry.factories += 1;
    entry.output += factory.yearly[filters.year].output;
  }
  return INDUSTRY_TYPES.map((industry) => {
    const entry = breakdown.get(industry);
    return {
      industry,
      factories: entry?.factories ?? 0,
      output: Math.round((entry?.output ?? 0) * 10) / 10,
    };
  });
};

const toRow = (factory: Factory, year: number): FactoryRow => ({
  id: factory.id,
  name: factory.name,
  district: factory.district,
  industry: factory.industry,
  employees: factory.yearly[year].employees,
  output: factory.yearly[year].output,
  status: factory.status,
  openYear: factory.openYear,
  openMonth: factory.openMonth,
});

export const buildFactoryRows = (
  factories: Factory[],
  filters: DashboardFilters,
  sortBy: 'latest' | 'output',
  limit: number,
): FactoryRow[] => {
  const rows = scopedFactories(factories, filters, filters.year).map((factory) =>
    toRow(factory, filters.year),
  );
  rows.sort((a, b) =>
    sortBy === 'output'
      ? b.output - a.output
      : b.openYear - a.openYear || b.openMonth - a.openMonth,
  );
  return rows.slice(0, limit);
};

export const percentChange = (current: number, previous: number): number | null => {
  if (previous === 0) return null;
  return ((current - previous) / previous) * 100;
};

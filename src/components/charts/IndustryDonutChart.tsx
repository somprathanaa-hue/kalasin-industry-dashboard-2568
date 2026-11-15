import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { IndustryPoint } from '@/types/dashboard';
import { ChartCard } from '@/components/ChartCard';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { INDUSTRY_COLORS } from '@/components/charts/chartTheme';

interface IndustryDonutChartProps {
  data: IndustryPoint[];
  className?: string;
}

export const IndustryDonutChart = ({ data, className }: IndustryDonutChartProps) => {
  const total = data.reduce((sum, point) => sum + point.factories, 0);
  const slices = data.map((point, index) => ({
    ...point,
    color: INDUSTRY_COLORS[index % INDUSTRY_COLORS.length],
  }));

  return (
    <ChartCard
      title="สัดส่วนตามประเภทอุตสาหกรรม"
      subtitle="สัดส่วนจำนวนโรงงานแต่ละประเภท"
      className={className}
      isEmpty={total === 0}
    >
      <div className="relative h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices.filter((slice) => slice.factories > 0)}
              dataKey="factories"
              nameKey="industry"
              innerRadius="62%"
              outerRadius="92%"
              paddingAngle={3}
              stroke="none"
              animationDuration={1000}
            >
              {slices
                .filter((slice) => slice.factories > 0)
                .map((slice) => (
                  <Cell key={slice.industry} fill={slice.color} />
                ))}
            </Pie>
            <Tooltip content={<ChartTooltip unit=" โรงงาน" />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-100">{total.toLocaleString('th-TH-u-nu-latn')}</span>
          <span className="text-xs text-slate-400">โรงงาน</span>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {slices
          .filter((slice) => slice.factories > 0)
          .map((slice) => (
            <li key={slice.industry} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex min-w-0 items-center gap-2 text-slate-300">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: slice.color }} />
                <span className="truncate">{slice.industry}</span>
              </span>
              <span className="shrink-0 font-medium text-slate-100">
                {((slice.factories / total) * 100).toFixed(1)}%
              </span>
            </li>
          ))}
      </ul>
    </ChartCard>
  );
};

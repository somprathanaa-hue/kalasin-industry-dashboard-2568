import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { MonthlyPoint } from '@/types/dashboard';
import { ChartCard } from '@/components/ChartCard';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { AXIS_TICK, GRID_STROKE, NEON_BLUE } from '@/components/charts/chartTheme';
import { formatInteger } from '@/utils/format';

interface MonthlyTrendChartProps {
  data: MonthlyPoint[];
  className?: string;
}

export const MonthlyTrendChart = ({ data, className }: MonthlyTrendChartProps) => {
  const isEmpty = data.every((point) => point.factories === 0);
  return (
    <ChartCard
      title="แนวโน้มจำนวนโรงงานรายเดือน"
      subtitle="จำนวนโรงงานสะสมที่เปิดดำเนินการ ณ สิ้นแต่ละเดือน"
      className={className}
      isEmpty={isEmpty}
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={NEON_BLUE.sky} stopOpacity={0.5} />
                <stop offset="100%" stopColor={NEON_BLUE.blue} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID_STROKE} vertical={false} />
            <XAxis dataKey="month" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip cursor={{ stroke: NEON_BLUE.sky, strokeOpacity: 0.3 }} content={<ChartTooltip unit=" โรงงาน" />} />
            <Area
              type="monotone"
              dataKey="factories"
              name="โรงงานสะสม"
              stroke={NEON_BLUE.sky}
              strokeWidth={2.5}
              fill="url(#trendGradient)"
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

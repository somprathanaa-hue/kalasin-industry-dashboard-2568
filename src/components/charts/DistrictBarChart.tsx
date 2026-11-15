import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { DistrictPoint } from '@/types/dashboard';
import { ChartCard } from '@/components/ChartCard';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { AXIS_TICK, GRID_STROKE, NEON_BLUE } from '@/components/charts/chartTheme';

interface DistrictBarChartProps {
  data: DistrictPoint[];
  className?: string;
}

export const DistrictBarChart = ({ data, className }: DistrictBarChartProps) => {
  const isEmpty = data.every((point) => point.factories === 0);
  return (
    <ChartCard
      title="จำนวนโรงงานแยกตามอำเภอ"
      subtitle="10 อันดับอำเภอที่มีโรงงานมากที่สุด"
      className={className}
      isEmpty={isEmpty}
    >
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 56 }}>
            <defs>
              <linearGradient id="districtGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={NEON_BLUE.sky} stopOpacity={0.95} />
                <stop offset="100%" stopColor={NEON_BLUE.blue} stopOpacity={0.55} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={GRID_STROKE} vertical={false} />
            <XAxis
              dataKey="district"
              tick={{ ...AXIS_TICK, fontSize: 11 }}
              interval={0}
              angle={-35}
              textAnchor="end"
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={AXIS_TICK} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip cursor={{ fill: 'rgba(56, 189, 248, 0.08)' }} content={<ChartTooltip unit=" โรงงาน" />} />
            <Bar dataKey="factories" name="โรงงาน" fill="url(#districtGradient)" radius={[6, 6, 0, 0]} animationDuration={1000} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

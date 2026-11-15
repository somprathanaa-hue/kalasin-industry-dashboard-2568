import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { IndustryPoint } from '@/types/dashboard';
import { ChartCard } from '@/components/ChartCard';
import { ChartTooltip } from '@/components/charts/ChartTooltip';
import { AXIS_TICK, INDUSTRY_COLORS } from '@/components/charts/chartTheme';

interface OutputBarChartProps {
  data: IndustryPoint[];
  className?: string;
}

export const OutputBarChart = ({ data, className }: OutputBarChartProps) => {
  const sorted = [...data].sort((a, b) => b.output - a.output);
  const isEmpty = sorted.every((point) => point.output === 0);

  return (
    <ChartCard
      title="มูลค่าผลผลิตแยกตามประเภท"
      subtitle="หน่วย: ล้านบาท"
      className={className}
      isEmpty={isEmpty}
    >
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sorted} layout="vertical" margin={{ top: 4, right: 16, left: 4, bottom: 0 }}>
            <XAxis type="number" tick={AXIS_TICK} axisLine={false} tickLine={false} />
            <YAxis
              type="category"
              dataKey="industry"
              width={150}
              tick={{ ...AXIS_TICK, fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip cursor={{ fill: 'rgba(56, 189, 248, 0.08)' }} content={<ChartTooltip unit=" ล้านบาท" />} />
            <Bar dataKey="output" name="มูลค่าผลผลิต" radius={[0, 6, 6, 0]} animationDuration={1000}>
              {sorted.map((point, index) => (
                <Cell key={point.industry} fill={INDUSTRY_COLORS[index % INDUSTRY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  );
};

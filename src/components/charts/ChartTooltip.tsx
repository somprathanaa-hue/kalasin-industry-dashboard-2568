interface TooltipEntry {
  name?: string;
  value?: number | string;
  color?: string;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string | number;
  unit?: string;
}

export const ChartTooltip = ({ active, payload, label, unit = '' }: ChartTooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-sky-400/25 bg-slate-950/95 px-3 py-2 shadow-xl">
      {label !== undefined && <p className="mb-1 text-xs font-medium text-slate-300">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} className="flex items-center gap-2 text-sm font-semibold text-slate-100">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="font-normal text-slate-400">{entry.name}:</span>
          {typeof entry.value === 'number' ? entry.value.toLocaleString('th-TH-u-nu-latn') : entry.value}
          {unit}
        </p>
      ))}
    </div>
  );
};

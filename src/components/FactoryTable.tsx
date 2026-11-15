import { useState } from 'react';
import type { FactoryRow, FactoryStatus } from '@/types/dashboard';
import { BentoCard } from '@/components/BentoCard';
import { formatDecimal, formatInteger } from '@/utils/format';

interface FactoryTableProps {
  latest: FactoryRow[];
  topOutput: FactoryRow[];
}

type TableMode = 'latest' | 'output';

const TABS: { value: TableMode; label: string }[] = [
  { value: 'latest', label: 'โรงงานล่าสุด' },
  { value: 'output', label: 'อันดับผลผลิตสูงสุด' },
];

const STATUS_STYLES: Record<FactoryStatus, { label: string; className: string }> = {
  operating: { label: 'ดำเนินการ', className: 'bg-emerald-500/15 text-emerald-400 ring-emerald-400/30' },
  expanding: { label: 'ขยายกำลังผลิต', className: 'bg-sky-500/15 text-sky-300 ring-sky-400/30' },
  paused: { label: 'หยุดชั่วคราว', className: 'bg-amber-500/15 text-amber-300 ring-amber-400/30' },
};

export const FactoryTable = ({ latest, topOutput }: FactoryTableProps) => {
  const [mode, setMode] = useState<TableMode>('latest');
  const rows = mode === 'latest' ? latest : topOutput;

  return (
    <BentoCard className="overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-bold text-slate-100 sm:text-lg">รายชื่อโรงงาน</h2>
          <p className="mt-1 text-sm text-slate-400">แสดงสูงสุด 10 รายการตามตัวกรองที่เลือก</p>
        </div>
        <div role="tablist" className="inline-flex rounded-xl bg-slate-950/80 p-1 ring-1 ring-slate-800">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              role="tab"
              aria-selected={mode === tab.value}
              onClick={() => setMode(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                mode === tab.value ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:text-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="py-16 text-center text-sm text-slate-400">ไม่มีข้อมูลตามตัวกรองที่เลือก</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-slate-400">
              <tr className="border-b border-slate-800">
                <th className="px-5 py-3 font-medium sm:px-6">โรงงาน</th>
                <th className="px-5 py-3 font-medium">อำเภอ</th>
                <th className="px-5 py-3 font-medium">ประเภท</th>
                <th className="px-5 py-3 text-right font-medium">แรงงาน (คน)</th>
                <th className="px-5 py-3 text-right font-medium">ผลผลิต (ล้านบาท)</th>
                <th className="px-5 py-3 font-medium sm:px-6">สถานะ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {rows.map((row) => {
                const status = STATUS_STYLES[row.status];
                return (
                  <tr key={row.id} className="transition hover:bg-sky-400/5">
                    <td className="px-5 py-4 font-medium text-slate-100 sm:px-6">
                      <span className="block max-w-[260px] truncate">{row.name}</span>
                      <span className="text-xs text-slate-500">{row.id}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-300">{row.district}</td>
                    <td className="px-5 py-4 text-slate-300">{row.industry}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-slate-100">{formatInteger(row.employees)}</td>
                    <td className="px-5 py-4 text-right tabular-nums text-slate-100">{formatDecimal(row.output)}</td>
                    <td className="px-5 py-4 sm:px-6">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${status.className}`}>
                        {status.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </BentoCard>
  );
};

import { Factory as FactoryIcon } from 'lucide-react';

export const DashboardHeader = () => (
  <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-blue-600 text-slate-950 shadow-[0_0_24px_-4px_rgba(56,189,248,0.8)]">
        <FactoryIcon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <h1 className="text-xl font-bold leading-tight text-slate-50 sm:text-2xl lg:text-3xl">
          แดชบอร์ดสถิติอุตสาหกรรม จังหวัดกาฬสินธุ์ ปี 2568
        </h1>
        <p className="mt-1 text-sm text-slate-400">ข้อมูลตัวอย่างเพื่อสาธิต</p>
      </div>
    </div>
  </header>
);

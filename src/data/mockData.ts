import type { Factory, FactoryStatus, IndustryType, YearlyMetrics } from '@/types/dashboard';

// Years are Buddhist Era (พ.ศ.). 2565 is the baseline used for year-over-year comparison of 2566.
export const FILTER_YEARS = [2566, 2567, 2568] as const;
export const DEFAULT_YEAR = 2568;
const DATA_YEARS = [2565, 2566, 2567, 2568];

export const DISTRICTS: string[] = [
  'เมืองกาฬสินธุ์',
  'นามน',
  'กมลาไสย',
  'ร่องคำ',
  'กุฉินารายณ์',
  'เขาวง',
  'ยางตลาด',
  'ห้วยเม็ก',
  'สหัสขันธ์',
  'คำม่วง',
  'ท่าคันโท',
  'หนองกุงศรี',
  'สมเด็จ',
  'ห้วยผึ้ง',
  'สามชัย',
  'นาคู',
  'ดอนจาน',
  'ฆ้องชัย',
];

export const INDUSTRY_TYPES: IndustryType[] = [
  'อาหารและเครื่องดื่ม',
  'แปรรูปการเกษตร',
  'ผลิตภัณฑ์จากยางและพลาสติก',
  'ผลิตภัณฑ์โลหะ',
  'สิ่งทอ (ผ้าไหมแพรวา)',
  'เฟอร์นิเจอร์และไม้',
  'อื่น ๆ',
];

const INDUSTRY_SCALE: Record<IndustryType, number> = {
  'อาหารและเครื่องดื่ม': 1.2,
  'แปรรูปการเกษตร': 1,
  'ผลิตภัณฑ์จากยางและพลาสติก': 1.3,
  'ผลิตภัณฑ์โลหะ': 1.6,
  'สิ่งทอ (ผ้าไหมแพรวา)': 0.7,
  'เฟอร์นิเจอร์และไม้': 0.6,
  'อื่น ๆ': 0.5,
};

const NAME_PREFIXES = [
  'กาฬสินธุ์', 'อีสานพัฒนา', 'ไทยเจริญ', 'ศรีสงคราม', 'ทุ่งทอง',
  'แพรวา', 'ภูพาน', 'ลำปาว', 'สยามรุ่งเรือง', 'ธนพัฒน์',
  'เกษตรทรัพย์', 'มงคลชัย', 'ไผ่ทอง', 'สมบูรณ์', 'ดอกคำ',
  'ลำน้ำปาว', 'วังขอนขว้าง', 'บุญล้น', 'ศิริมงคล', 'ประชาพัฒน์',
];

const NAME_SUFFIXES = [
  'อินเตอร์ฟู้ด', 'แปรรูป', 'ยางพารา', 'เมทัล', 'ไหมไทย',
  'เฟอร์นิเจอร์', 'ไม้', 'ผลิตภัณฑ์', 'อุตสาหกรรม', 'เทรดดิ้ง',
  'โปรดักส์', 'ฟาร์ม', 'เครื่องดื่ม', 'พลาสติก', 'ทอผ้า',
  'สตีล', 'ข้าว', 'คราฟต์', 'ผลไม้', 'ซัพพลาย',
];

const FACTORY_COUNT = 400;

const createRandom = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const random = createRandom(2568);

const pick = <T,>(items: readonly T[]): T =>
  items[Math.floor(random() * items.length)];

const round1 = (value: number) => Math.round(value * 10) / 10;

const statusFromRoll = (roll: number): FactoryStatus => {
  if (roll < 0.7) return 'operating';
  if (roll < 0.9) return 'expanding';
  return 'paused';
};

const createFactory = (index: number): Factory => {
  const industry = pick(INDUSTRY_TYPES);
  const scale = INDUSTRY_SCALE[industry];
  const openYear = 2540 + Math.floor(random() * 29);
  const openMonth = 1 + Math.floor(random() * 12);
  const baseEmployees = (15 + random() * 120) * scale;
  const baseInvestment = (5 + random() * 40) * scale;
  const baseOutput = (8 + random() * 60) * scale;
  const status = statusFromRoll(random());

  const yearly: Record<number, YearlyMetrics> = {};
  for (const year of DATA_YEARS) {
    if (openYear > year) continue;
    const growth = 1 + (year - 2565) * 0.05 + (random() - 0.5) * 0.1;
    yearly[year] = {
      employees: Math.round(baseEmployees * growth),
      investment: round1(baseInvestment * growth),
      output: round1(baseOutput * growth),
    };
  }

  return {
    id: `F${String(index + 1).padStart(4, '0')}`,
    name: `บริษัท ${NAME_PREFIXES[index % 20]} ${NAME_SUFFIXES[Math.floor(index / 20) % 20]} จำกัด`,
    district: pick(DISTRICTS),
    industry,
    openYear,
    openMonth,
    status,
    yearly,
  };
};

export const FACTORIES: Factory[] = Array.from({ length: FACTORY_COUNT }, (_, index) =>
  createFactory(index),
);

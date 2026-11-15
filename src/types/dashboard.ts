export type IndustryType =
  | 'อาหารและเครื่องดื่ม'
  | 'แปรรูปการเกษตร'
  | 'ผลิตภัณฑ์จากยางและพลาสติก'
  | 'ผลิตภัณฑ์โลหะ'
  | 'สิ่งทอ (ผ้าไหมแพรวา)'
  | 'เฟอร์นิเจอร์และไม้'
  | 'อื่น ๆ';

export type FactoryStatus = 'operating' | 'expanding' | 'paused';

export interface YearlyMetrics {
  employees: number;
  investment: number;
  output: number;
}

export interface Factory {
  id: string;
  name: string;
  district: string;
  industry: IndustryType;
  openYear: number;
  openMonth: number;
  status: FactoryStatus;
  yearly: Record<number, YearlyMetrics>;
}

export interface DashboardFilters {
  year: number;
  district: string;
  industry: string;
}

export interface KpiSummary {
  factories: number;
  employees: number;
  investment: number;
  output: number;
}

export interface MonthlyPoint {
  month: string;
  factories: number;
}

export interface DistrictPoint {
  district: string;
  factories: number;
}

export interface IndustryPoint {
  industry: IndustryType;
  factories: number;
  output: number;
}

export interface FactoryRow {
  id: string;
  name: string;
  district: string;
  industry: IndustryType;
  employees: number;
  output: number;
  status: FactoryStatus;
  openYear: number;
  openMonth: number;
}

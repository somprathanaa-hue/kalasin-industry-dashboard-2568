const numberFormatter = new Intl.NumberFormat('th-TH-u-nu-latn', { maximumFractionDigits: 0 });
const decimalFormatter = new Intl.NumberFormat('th-TH-u-nu-latn', { maximumFractionDigits: 1 });

export const formatInteger = (value: number) => numberFormatter.format(value);

export const formatDecimal = (value: number) => decimalFormatter.format(value);

export const formatPercent = (value: number) => `${value >= 0 ? '+' : ''}${decimalFormatter.format(value)}%`;

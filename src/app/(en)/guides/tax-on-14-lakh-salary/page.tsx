import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(14);

export default function Tax14LakhGuide() {
  return <SalaryTaxGuide lakh={14} />;
}

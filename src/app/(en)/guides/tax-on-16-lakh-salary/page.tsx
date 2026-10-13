import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(16);

export default function Tax16LakhGuide() {
  return <SalaryTaxGuide lakh={16} />;
}

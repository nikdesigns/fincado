import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(20);

export default function Tax20LakhGuide() {
  return <SalaryTaxGuide lakh={20} />;
}

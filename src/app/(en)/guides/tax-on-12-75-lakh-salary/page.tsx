import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(12.75);

export default function Tax12_75LakhGuide() {
  return <SalaryTaxGuide lakh={12.75} />;
}

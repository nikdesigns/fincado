import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(12);

export default function Tax12LakhGuide() {
  return <SalaryTaxGuide lakh={12} />;
}

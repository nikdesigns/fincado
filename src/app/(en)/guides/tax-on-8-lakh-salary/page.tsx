import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(8);

export default function Tax8LakhGuide() {
  return <SalaryTaxGuide lakh={8} />;
}

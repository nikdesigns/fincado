import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(75);

export default function Tax75LakhGuide() {
  return <SalaryTaxGuide lakh={75} />;
}

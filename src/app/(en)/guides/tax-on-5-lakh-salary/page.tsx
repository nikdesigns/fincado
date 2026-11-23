import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(5);

export default function Tax5LakhGuide() {
  return <SalaryTaxGuide lakh={5} />;
}

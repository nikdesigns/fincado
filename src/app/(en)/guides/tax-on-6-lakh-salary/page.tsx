import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(6);

export default function Tax6LakhGuide() {
  return <SalaryTaxGuide lakh={6} />;
}

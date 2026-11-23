import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(60);

export default function Tax60LakhGuide() {
  return <SalaryTaxGuide lakh={60} />;
}

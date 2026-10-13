import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(18);

export default function Tax18LakhGuide() {
  return <SalaryTaxGuide lakh={18} />;
}

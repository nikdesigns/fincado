import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(24);

export default function Tax24LakhGuide() {
  return <SalaryTaxGuide lakh={24} />;
}

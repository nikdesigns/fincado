import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(28);

export default function Tax28LakhGuide() {
  return <SalaryTaxGuide lakh={28} />;
}

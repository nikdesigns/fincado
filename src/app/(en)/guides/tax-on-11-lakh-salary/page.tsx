import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(11);

export default function Tax11LakhGuide() {
  return <SalaryTaxGuide lakh={11} />;
}

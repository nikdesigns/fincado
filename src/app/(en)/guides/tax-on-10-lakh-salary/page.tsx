import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(10);

export default function Tax10LakhGuide() {
  return <SalaryTaxGuide lakh={10} />;
}

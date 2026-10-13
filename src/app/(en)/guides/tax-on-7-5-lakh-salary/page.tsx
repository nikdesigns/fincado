import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(7.5);

export default function Tax7_5LakhGuide() {
  return <SalaryTaxGuide lakh={7.5} />;
}

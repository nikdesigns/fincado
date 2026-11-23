import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(7);

export default function Tax7LakhGuide() {
  return <SalaryTaxGuide lakh={7} />;
}

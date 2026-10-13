import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(40);

export default function Tax40LakhGuide() {
  return <SalaryTaxGuide lakh={40} />;
}

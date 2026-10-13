import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(9);

export default function Tax9LakhGuide() {
  return <SalaryTaxGuide lakh={9} />;
}

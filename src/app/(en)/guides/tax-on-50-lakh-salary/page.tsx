import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(50);

export default function Tax50LakhGuide() {
  return <SalaryTaxGuide lakh={50} />;
}

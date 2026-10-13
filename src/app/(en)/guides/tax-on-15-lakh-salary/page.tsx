import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(15);

export default function Tax15LakhGuide() {
  return <SalaryTaxGuide lakh={15} />;
}

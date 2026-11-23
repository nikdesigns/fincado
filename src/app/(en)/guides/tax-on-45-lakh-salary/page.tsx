import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(45);

export default function Tax45LakhGuide() {
  return <SalaryTaxGuide lakh={45} />;
}

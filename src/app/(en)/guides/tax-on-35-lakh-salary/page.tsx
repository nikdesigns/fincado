import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(35);

export default function Tax35LakhGuide() {
  return <SalaryTaxGuide lakh={35} />;
}

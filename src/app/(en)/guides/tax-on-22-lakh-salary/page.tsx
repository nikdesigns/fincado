import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(22);

export default function Tax22LakhGuide() {
  return <SalaryTaxGuide lakh={22} />;
}

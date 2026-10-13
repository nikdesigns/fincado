import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(30);

export default function Tax30LakhGuide() {
  return <SalaryTaxGuide lakh={30} />;
}

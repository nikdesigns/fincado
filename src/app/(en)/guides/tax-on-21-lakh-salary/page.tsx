import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(21);

export default function Tax21LakhGuide() {
  return <SalaryTaxGuide lakh={21} />;
}

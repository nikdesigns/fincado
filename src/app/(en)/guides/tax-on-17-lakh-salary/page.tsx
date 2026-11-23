import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(17);

export default function Tax17LakhGuide() {
  return <SalaryTaxGuide lakh={17} />;
}

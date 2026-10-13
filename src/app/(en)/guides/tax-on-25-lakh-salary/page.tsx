import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(25);

export default function Tax25LakhGuide() {
  return <SalaryTaxGuide lakh={25} />;
}

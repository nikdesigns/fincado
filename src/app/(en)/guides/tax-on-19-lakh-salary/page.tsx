import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(19);

export default function Tax19LakhGuide() {
  return <SalaryTaxGuide lakh={19} />;
}

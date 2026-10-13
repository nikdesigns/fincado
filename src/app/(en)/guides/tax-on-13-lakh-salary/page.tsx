import SalaryTaxGuide, { salaryTaxMetadata } from '@/components/guides/SalaryTaxGuide';

export const metadata = salaryTaxMetadata(13);

export default function Tax13LakhGuide() {
  return <SalaryTaxGuide lakh={13} />;
}

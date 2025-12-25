import Link from 'next/link';

export default function RelatedCalculators() {
  return (
    <section className="mt-10 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Related Calculators</h3>

      <ul className="space-y-2 text-blue-600">
        <li>
          <Link href="/home-loan-emi-calculator">Home Loan EMI Calculator</Link>
        </li>
        <li>
          <Link href="/personal-loan-emi-calculator">
            Personal Loan EMI Calculator
          </Link>
        </li>
        <li>
          <Link href="/loan-prepayment-calculator">
            Loan Prepayment Calculator
          </Link>
        </li>
      </ul>
    </section>
  );
}

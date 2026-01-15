import Link from 'next/link';

export default function RelatedCalculators() {
  return (
    <section className="mt-10 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Related Loan Calculators</h3>

      <ul className="space-y-2 text-blue-600">
        <li>
          <Link href="/emi-calculator/">Loan EMI Calculator</Link>
        </li>

        <li>
          <Link href="/loans/home-loan/">Home Loan EMI Calculator</Link>
        </li>

        <li>
          <Link href="/loans/personal-loan/">Personal Loan EMI Calculator</Link>
        </li>
      </ul>
    </section>
  );
}

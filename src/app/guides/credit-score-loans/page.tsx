import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'How Credit Score Affects Your Loan Interest Rate in India | Fincado',
  description:
    'Learn how your CIBIL credit score impacts loan approval, interest rates, EMI and eligibility in India.',
};

export default function CreditScoreLoans() {
  return (
    <section className="article">
      <h1>How Credit Score Affects Your Loan Interest Rate in India</h1>

      <p>
        Your credit score is one of the most important factors that decide
        whether your loan gets approved and at what interest rate.
      </p>

      <h2>What Is a Credit Score?</h2>
      <p>
        A credit score is a 3-digit number that reflects your creditworthiness.
        In India, CIBIL scores range from 300 to 900.
      </p>

      <h2>Ideal Credit Score for Loans</h2>
      <ul>
        <li>750+ – Excellent</li>
        <li>700–749 – Good</li>
        <li>650–699 – Average</li>
        <li>Below 650 – Poor</li>
      </ul>

      <h2>How Credit Score Affects Interest Rates</h2>
      <ul>
        <li>High score = Lower interest rate</li>
        <li>Low score = Higher interest rate</li>
        <li>Very poor score = Loan rejection</li>
      </ul>

      <h2>How to Improve Your Credit Score</h2>
      <ul>
        <li>Pay EMIs on time</li>
        <li>Reduce credit card utilization</li>
        <li>Avoid too many loan applications</li>
        <li>Check your credit report regularly</li>
      </ul>

      <h2>Credit Score & EMI Relationship</h2>
      <p>
        Even a 1% reduction in interest rate can save you lakhs over a long-term
        loan. Use our <a href="/emi-calculator">EMI Calculator</a> to see the
        difference.
      </p>

      <h2>Conclusion</h2>
      <p>
        A good credit score not only increases loan approval chances but also
        helps you save massive interest over time.
      </p>
    </section>
  );
}

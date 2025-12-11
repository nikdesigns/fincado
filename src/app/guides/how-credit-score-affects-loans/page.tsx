import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'How Credit Score Affects Your Loan Eligibility and Interest Rates in India | Fincado',
  description:
    'Understand the direct impact of your CIBIL score (credit score) on loan approval, interest rates, and loan amount. Learn why a score above 750 is essential for getting the best loan offers.',
};

export default function CreditScoreImpactPage() {
  return (
    <main className="container">
      <div style={{ minWidth: 0 }}>
        <h1>
          🎯 How Your Credit Score Affects Your Loan Eligibility and Interest
          Rate
        </h1>

        <p style={{ maxWidth: 700 }}>
          Your **Credit Score** (commonly referred to as CIBIL Score in India)
          is the single most important factor determining your financial fate
          when applying for any form of credit—be it a Home Loan, Personal Loan,
          or Credit Card. Understand the **three critical ways** your score
          dictates the terms of your loan.
        </p>

        {/* Adsense-friendly placement */}
        <div
          className="ad-box"
          style={{
            margin: '20px 0',
            textAlign: 'center',
            border: '1px dashed #ccc',
            padding: '10px',
          }}
        >
          **Advertisement (Adsense Banner 1)**
        </div>

        <section className="article">
          <h2>1. The Direct Impact: Loan Approval and Rejection</h2>
          <p>
            When a bank receives your loan application, the credit score acts as
            the first filter. It provides the lender with an immediate snapshot
            of your past repayment behaviour and financial discipline.
          </p>

          <h3>Minimum Score Thresholds (Indicative)</h3>
          <table>
            <thead>
              <tr>
                <th>Loan Type</th>
                <th>Preferred Score Range (CIBIL)</th>
                <th>Approval Probability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>**Home Loan / Car Loan**</td>
                <td>750 and above</td>
                <td>High (Low-Risk Borrower)</td>
              </tr>
              <tr>
                <td>**Personal Loan**</td>
                <td>730 and above</td>
                <td>Moderate to High</td>
              </tr>
              <tr>
                <td>**Credit Card**</td>
                <td>700 and above</td>
                <td>Acceptable</td>
              </tr>
            </tbody>
          </table>

          <p>
            **The Hard Truth:** If your score is **below 650**, most major banks
            (like SBI, HDFC, ICICI) will likely reject your unsecured loan
            application outright. For secured loans, they may require a
            co-applicant or guarantor.
          </p>

          <hr />

          <h2>2. The Financial Impact: Interest Rates and Cost of Borrowing</h2>
          <p>
            The difference between a score of 720 and 780 might seem small, but
            it can cost you lakhs of rupees in interest over the life of a
            long-term loan. Lenders follow a risk-based pricing model:
          </p>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          >
            <div>
              <h3>High Score (750+)</h3>
              <ul>
                <li>
                  **Best Rate:** You qualify for the bank's most competitive,
                  lowest-offered interest rate (e.g., 8.5% for a Home Loan).
                </li>
                <li>
                  **Lower EMI:** A 0.5% lower rate significantly reduces your
                  monthly EMI and total interest outgo.
                </li>
                <li>
                  **Savings:** Over a 20-year home loan, a high score can save
                  you ₹5 Lakh to ₹10 Lakh in interest.
                </li>
              </ul>
            </div>
            <div>
              <h3>Low Score (650–700)</h3>
              <ul>
                <li>
                  **Higher Rate:** You are placed in a higher risk bracket,
                  leading to a higher rate (e.g., 9.5% to 11% for a Home Loan).
                </li>
                <li>
                  **Higher EMI:** Your monthly payments are substantially
                  higher.
                </li>
                <li>
                  **Hidden Cost:** Even if approved, you pay a "risk premium"
                  for the entire duration of the loan.
                </li>
              </ul>
            </div>
          </div>

          <hr />

          <h2>
            3. The Indirect Impact: Loan Amount, Tenure, and Processing Fees
          </h2>
          <p>
            The credit score affects more than just approval and rate—it impacts
            every term and condition of the loan agreement:
          </p>

          <h3>A. Loan Amount and LTV Ratio</h3>
          <ul>
            <li>
              **High Score:** Banks are willing to lend you a higher amount
              (higher LTV or Loan-to-Value for property loans) because they
              trust your ability to repay.
            </li>
            <li>
              **Low Score:** The bank might reduce the loan amount offered,
              forcing you to arrange a larger down payment.
            </li>
          </ul>

          <h3>B. Processing Fees and Documentation</h3>
          <ul>
            <li>
              **High Score:** You may be offered a discounted or completely
              waived processing fee (which can be up to 2% of the loan amount).
            </li>
            <li>
              **Low Score:** The bank may demand extra collateral, a co-signer,
              or a longer, more exhaustive documentation process.
            </li>
          </ul>

          <h3>C. Negotiation Power</h3>
          <ul>
            <li>
              A CIBIL score of 800+ gives you **strong negotiation power**. You
              can leverage this to bargain for a lower interest rate, better
              pre-payment terms, or lower processing fees with your lender.
            </li>
          </ul>

          <hr />

          <h2>4. Key Credit Score Factors Lenders Focus On</h2>
          <p>
            Lenders aren't just looking at the final number; they analyze the
            underlying factors of your credit report:
          </p>
          <ol>
            <li>
              **Payment History (35% Weight):** Are all past and current EMIs
              and Credit Card bills paid on time? Even a single missed payment
              severely harms your score.
            </li>
            <li>
              **Credit Utilisation Ratio (30% Weight):** Are you using too much
              of your available credit? Keep the usage of your credit card limit
              **below 30%**.
            </li>
            <li>
              **Credit Age/History (15% Weight):** How long have you responsibly
              managed credit? Longer history is better.
            </li>
            <li>
              **Credit Mix (10% Weight):** Do you have a healthy mix of secured
              (Home/Car) and unsecured (Personal Loan/Credit Card) credit?
            </li>
          </ol>

          <hr />

          <h2>Conclusion: Invest in Your Score, Not Just Your Savings</h2>
          <p>
            Think of your credit score as a crucial financial asset. Maintaining
            a score of 750 or above is not just about getting a loan; it's about
            **saving money** and ensuring instant access to capital when you
            need it most. Check your report regularly for free and resolve any
            discrepancies immediately.
          </p>

          <h2>Related Tools & Resources</h2>
          <ul>
            <li>
              <a href="/credit-score">Free Credit Score Check</a> - Check your
              CIBIL score and monitor its growth.
            </li>
            <li>
              <a href="/emi-calculator">EMI Calculator</a> - See how a higher
              interest rate impacts your monthly payment.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

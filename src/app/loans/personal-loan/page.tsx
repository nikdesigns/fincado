import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Loan – Interest Rates, EMI & Eligibility | Fincado',
  description:
    'Compare personal loan interest rates, EMI, eligibility and best offers from top banks in India.',
};

export default function PersonalLoanPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16,
        alignItems: 'start',
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1>Personal Loan – Interest Rates, EMI & Eligibility</h1>

        <p style={{ maxWidth: 700 }}>
          Compare personal loan interest rates from top Indian banks. Check EMI,
          eligibility, documents required and apply with confidence.
        </p>

        <div className="ad-box">Ad will appear here</div>

        <section className="article">
          <h2>What is a Personal Loan?</h2>
          <p>
            A personal loan is an unsecured loan used for medical expenses,
            travel, weddings, education and emergencies.
          </p>

          <h2>Personal Loan Interest Rates in India</h2>
          <p>Rates usually range between 10.5% to 22% per annum.</p>

          <h2>Eligibility Criteria</h2>
          <ul>
            <li>Age: 21–60 years</li>
            <li>Monthly income proof</li>
            <li>Good credit score</li>
          </ul>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <a href="/emi-calculator">EMI Calculator</a>
            </li>
            <li>
              <a href="/credit-score">Credit Score Check</a>
            </li>
          </ul>
        </section>

        <div className="ad-box">Ad will appear here</div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Ad</div>

        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>Popular Tools</h3>
          <ul className="side-links">
            <li>
              <a href="/emi-calculator">EMI Calculator</a>
            </li>
            <li>
              <a href="/home-loans">Home Loan</a>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

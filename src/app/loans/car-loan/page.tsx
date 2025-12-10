// ./src/app/loans/car-loan/page.tsx
import type { Metadata } from 'next';
import CarLoanClient from './CarLoanClient';

export const metadata: Metadata = {
  title: 'Car Loan Calculator – Calculate Car Loan EMI | Fincado',
  description:
    'Free India-focused car loan EMI calculator. Compute monthly EMI, total interest, and amortization schedule for car loans.',
};

export default function CarLoanPage() {
  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Car Loan EMI Calculator — Fincado',
    description:
      'Calculate car loan EMI, total interest and total repayment with an India-focused calculator. Includes amortization schedule and eligibility hint.',
    url: 'https://your-site.example/loans/car-loan',
  };

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <h1>Car Loan EMI Calculator — Estimate Monthly Payment</h1>
        <p style={{ maxWidth: 700 }}>
          Use this free car loan calculator to estimate your monthly EMI, total
          interest payable, and view the amortization schedule. Works for loans
          in India — includes down payment, tenure in years/months, and custom
          interest rates.
        </p>

        {/* Above fold ad placeholder */}
        <div className="ad-box" style={{ margin: '20px 0' }}>
          Ad will appear here (Above the fold)
        </div>

        <CarLoanClient />

        {/* Mid content ad placeholder */}
        <div className="ad-box" style={{ marginTop: 28 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 28 }}>
          <h2>How the Car Loan EMI is calculated</h2>
          <p>
            EMI (Equated Monthly Installment) is calculated using the standard
            reducing-balance formula. Monthly rate = annualRate / 12 / 100. If
            interest rate is 0, EMI is simple principal / months.
          </p>

          <h3>Important Notes</h3>
          <ul>
            <li>Down payment reduces the principal immediately.</li>
            <li>
              Processing fees, insurance, and add-ons are not included in EMI
              computation — add them to vehicle price if required.
            </li>
            <li>
              Use the amortization schedule below to see principal and interest
              breakdown for each month.
            </li>
          </ul>
        </section>

        {/* Before footer ad */}
        <div className="ad-box" style={{ marginTop: 32 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="ad-box" style={{ position: 'sticky', top: 20 }}>
          Sticky Sidebar Ad
        </div>

        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>Quick Tools</h3>
          <ul className="side-links">
            <li>
              <a href="/emi-calculator">EMI Calculator</a>
            </li>
            <li>
              <a href="/loans/personal-loan">Personal Loan</a>
            </li>
            <li>
              <a href="/loans/home-loan">Home Loan</a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Structured data script */}
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

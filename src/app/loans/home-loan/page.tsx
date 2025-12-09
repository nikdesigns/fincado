import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home Loan – Interest Rates, EMI & Eligibility | Fincado',
  description:
    'Compare home loan interest rates from top banks. Check EMI, eligibility, documents and best offers.',
};

export default function HomeLoanPage() {
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
        <h1>Home Loan – Interest Rates, EMI & Best Offers</h1>

        <p style={{ maxWidth: 700 }}>
          Compare the lowest home loan interest rates in India and calculate EMI
          instantly.
        </p>

        <div className="ad-box">Ad will appear here</div>

        <section className="article">
          <h2>What is a Home Loan?</h2>
          <p>
            A home loan is used to purchase or construct residential property.
          </p>

          <h2>Home Loan Interest Rates</h2>
          <p>Rates generally range between 8.5% to 11.5%.</p>

          <h2>Eligibility & Documents</h2>
          <ul>
            <li>Income proof</li>
            <li>Property documents</li>
            <li>Credit score above 700</li>
          </ul>
        </section>

        <div className="ad-box">Ad will appear here</div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Ad</div>
      </aside>
    </main>
  );
}

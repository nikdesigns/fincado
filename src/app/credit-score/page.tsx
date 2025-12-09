import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Credit Score Check – CIBIL Score Online | Fincado',
  description:
    'Check your CIBIL credit score online for free. Learn how to improve your credit score in India.',
};

export default function CreditScorePage() {
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
        <h1>Free Credit Score Check – CIBIL & Experian</h1>

        <p>
          Check your free credit score instantly and understand how it impacts
          your loan approval.
        </p>

        <div className="ad-box">Ad will appear here</div>

        <section className="article">
          <h2>What is a Credit Score?</h2>
          <p>
            A credit score is a 3-digit number that tells banks how trustworthy
            you are as a borrower.
          </p>

          <h2>Ideal Credit Score</h2>
          <p>700+ is considered a good score.</p>
        </section>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Ad</div>
      </aside>
    </main>
  );
}

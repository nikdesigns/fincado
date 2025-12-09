import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Savings Guide – How to Save Money Smartly | Fincado',
  description:
    'Learn how to save money effectively, build emergency funds and plan your financial future.',
};

export default function SavingsPage() {
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
      {/* ✅ MAIN CONTENT */}
      <div style={{ minWidth: 0 }}>
        <h1>Smart Savings Guide for Indian Households</h1>

        <p style={{ maxWidth: 720 }}>
          Learn how to manage expenses, save money smartly, and build long-term
          financial security for your family.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <section className="article">
          <h2>Why Savings Matter?</h2>
          <p>
            Savings protect you during medical emergencies, job loss, and help
            you remain financially independent.
          </p>

          <h2>Best Saving Strategies</h2>
          <ul>
            <li>50/30/20 budgeting rule</li>
            <li>Build an emergency fund</li>
            <li>Use recurring deposits</li>
            <li>Automate your savings</li>
          </ul>

          <h2>How Much Should You Save?</h2>
          <p>
            Ideally, at least 20% of your monthly income should go toward
            savings.
          </p>

          <h2>Related Tools</h2>
          <ul>
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
            <li>
              <a href="/emi-calculator">EMI Calculator</a>
            </li>
          </ul>
        </section>

        <div className="ad-box">Ad will appear here (Before footer)</div>
      </div>

      {/* ✅ STICKY SIDEBAR */}
      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>

        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>Popular Savings Tools</h3>
          <ul className="side-links">
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
            <li>
              <a href="/credit-score">Credit Score</a>
            </li>
          </ul>
        </div>

        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>People Also Read</h3>
          <ul className="side-links">
            <li>
              <a href="/guides/how-to-save-money">How to Save Money</a>
            </li>
            <li>
              <a href="/guides/emergency-fund">Emergency Fund Guide</a>
            </li>
            <li>
              <a href="/guides/smart-budgeting">Smart Budgeting</a>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

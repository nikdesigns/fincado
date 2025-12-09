import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Investing in India – SIP, Mutual Funds & Stocks | Fincado',
  description:
    'Learn about investing in India including SIP, mutual funds, stocks and long-term wealth creation.',
};

export default function InvestingPage() {
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
        <h1>Start Investing in India – Beginner to Advanced</h1>

        <p style={{ maxWidth: 720 }}>
          Learn how to grow your money with SIP, mutual funds, stocks, and smart
          long-term investment strategies designed for Indian investors.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        <section className="article">
          <h2>Why Investing is Important?</h2>
          <p>
            Investing helps you beat inflation, grow wealth, and achieve
            long-term financial goals such as retirement and home ownership.
          </p>

          <h2>Best Investment Options in India</h2>
          <ul>
            <li>Mutual Funds (SIP & Lump Sum)</li>
            <li>Stocks & Equity</li>
            <li>Fixed Deposits</li>
            <li>Gold & Bonds</li>
          </ul>

          <h2>Beginner Investment Tips</h2>
          <ul>
            <li>Start early</li>
            <li>Diversify your portfolio</li>
            <li>Invest regularly using SIP</li>
            <li>Review annually</li>
          </ul>

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
          <h3>Popular Investment Tools</h3>
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
              <a href="/guides/sip-vs-fd">SIP vs FD</a>
            </li>
            <li>
              <a href="/guides/how-to-start-investing">
                How to Start Investing
              </a>
            </li>
            <li>
              <a href="/guides/best-investment-options-india">
                Best Investments in India
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

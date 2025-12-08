import Link from 'next/link';

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 24,
        padding: '36px 20px',
      }}
    >
      {/* ✅ LEFT: ARTICLE CONTENT */}
      <div style={{ minWidth: 0 }}>{children}</div>

      {/* ✅ RIGHT: STICKY SIDEBAR */}
      <aside style={{ position: 'sticky', top: 90, height: 'fit-content' }}>
        <div className="ad-box">Advertisement</div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>Popular Calculators</h3>
          <ul>
            <li>
              <Link href="/emi-calculator">EMI Calculator</Link>
            </li>
            <li>
              <Link href="/sip-calculator">SIP Calculator</Link>
            </li>
            <li>
              <Link href="/fd-calculator">FD Calculator</Link>
            </li>
          </ul>
        </div>

        <div className="card" style={{ marginTop: 24 }}>
          <h3>Credit & Loans</h3>
          <ul>
            <li>
              <Link href="/guides/credit-score-loans">
                Credit Score & Loans
              </Link>
            </li>
            <li>
              <Link href="/guides/home-loan-guide">Home Loan Guide</Link>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

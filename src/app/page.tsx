import Icon from '@/components/Icon';

export default function Home() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* ✅ HERO SECTION */}
      <section className="home-hero">
        <h1> Financial Calculators & Guides for India</h1>
        <p>
          Fincado helps you plan loans, investments, and savings using fast,
          accurate and 100% free financial calculators and expert-written
          guides.
        </p>
      </section>

      {/* ✅ PREMIUM TOOL GRID (BANKRATE STYLE) */}
      <section className="tools-section">
        <div className="tools-grid">
          <a href="/emi-calculator" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>EMI Calculator</h3>
          </a>

          <a href="/sip-calculator" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>SIP Calculator</h3>
          </a>

          <a href="/fd-calculator" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>FD Calculator</h3>
          </a>

          <a href="/loans/home-loan" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>Home Loans</h3>
          </a>

          <a href="/loans/personal-loan" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>Personal Loans</h3>
          </a>

          <a href="/credit-score" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>Credit Score</h3>
          </a>

          <a href="/investing" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>Investing</h3>
          </a>

          <a href="/savings" className="tool-tile">
            <div className="tool-icon-box">
              <Icon className="icon-md" />
            </div>
            <h3>Savings</h3>
          </a>
        </div>
      </section>

      {/* ✅ TRUST STATS BAR */}
      <section className="trust-stats">
        <div className="trust-grid">
          <div className="trust-item">
            <strong>10+</strong>
            <span>Financial Tools</span>
          </div>

          <div className="trust-item">
            <strong>5,000+</strong>
            <span>Monthly Users</span>
          </div>

          <div className="trust-item">
            <strong>₹500 Cr+</strong>
            <span>EMI Calculated</span>
          </div>

          <div className="trust-item">
            <strong>100%</strong>
            <span>Free & Secure</span>
          </div>
        </div>
      </section>

      {/* ✅ WHY TRUST FINCADO */}
      <section className="why-trust">
        <h2>Why Trust Fincado?</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🔒</div>
            <h3>Data Privacy First</h3>
            <p>
              We never store your personal data. All calculations happen
              instantly in your browser with complete privacy.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">📐</div>
            <h3>Accurate Financial Formulas</h3>
            <p>
              Our calculators use industry-standard banking formulas to give you
              reliable and transparent results.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">🎯</div>
            <h3>Educational Purpose Only</h3>
            <p>
              Fincado provides financial tools and guides for learning and
              planning — not for selling products.
            </p>
          </div>

          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Fast & Lightweight</h3>
            <p>
              No heavy scripts, no tracking bloat. Just fast, clean, and modern
              financial tools.
            </p>
          </div>
        </div>
      </section>

      {/* ✅ FEATURED GUIDES SECTION (CRITICAL FOR ADSENSE) */}
      <section style={{ marginTop: 80 }}>
        <h2>Featured Finance Guides</h2>
        <p>
          Learn how loans, investments and credit actually work with our
          easy-to-understand expert finance guides.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 24,
            marginTop: 28,
          }}
        >
          <a href="/guides/home-loan-guide" className="home-guide-card">
            <div className="tool-icon">🏠</div>
            <h3>Home Loan Guide for First-Time Buyers</h3>
            <p>
              Everything you need to know before applying for your first home
              loan in India.
            </p>
          </a>

          <a href="/guides/home-loan-guide" className="home-guide-card">
            <div className="tool-icon">🏠</div>
            <h3>SIP vs FD – Which Is Better for Your Money?</h3>
            <p>
              Compare SIP and FD based on returns, safety, tax and long-term
              wealth creation.
            </p>
          </a>

          <a href="/guides/home-loan-guide" className="home-guide-card">
            <div className="tool-icon">🏠</div>
            <h3>How Credit Score Affects Your Loan</h3>
            <p>
              Learn how your CIBIL score impacts loan approval, interest rates
              and EMI.
            </p>
          </a>
        </div>
      </section>

      {/* ✅ ADSENSE PLACEHOLDER (SAFE FOR REVIEW) */}
      <div className="ad-box" style={{ marginTop: 80 }}>
        Advertisement
      </div>
    </main>
  );
}

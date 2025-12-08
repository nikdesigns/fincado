import Icon from '@/components/Icon';

export default function Home() {
  return (
    <main className="container">
      {/* ✅ HERO SECTION */}
      <section className="home-hero">
        <div className="hero-grid">
          {/* LEFT CONTENT */}
          <div className="hero-content">
            <h1>Smart Financial Calculators & Loan Tools for India</h1>

            <p className="hero-sub">
              Plan your EMI, SIP, FD, Credit Score & Loans with fast, accurate
              and 100% free tools trusted by thousands of users across India.
            </p>

            <div className="hero-cta-row">
              <a href="/emi-calculator">
                <button className="primary-cta">Calculate EMI</button>
              </a>

              <a href="/credit-score">
                <button className="apply-btn">Check Credit Score</button>
              </a>
            </div>

            <div className="hero-trust-mini">
              ✅ No signup required &nbsp;&nbsp; ✅ Bank-grade accuracy
              &nbsp;&nbsp; ✅ 100% Free
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="hero-visual">
            <div className="hero-card">
              <strong>₹12,450</strong>
              <span>Your Monthly EMI</span>
            </div>

            <div className="hero-card">
              <strong>₹6.8L</strong>
              <span>Total Interest Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ PREMIUM TOOL GRID (BANKRATE STYLE) */}
      <section className="tools-section">
        <div className="tools-grid">
          <a href="/loans/personal-loan" className="tool-tile hot">
            <span className="tool-badge hot-badge">POPULAR</span>
            <div className="tool-icon-box">
              <Icon name="personalLoan" className="tool-icon-svg" />
            </div>
            <h3>Personal Loan</h3>
            <p>Instant approval & best rates</p>
          </a>

          <a href="/loans/home-loan" className="tool-tile hot">
            <span className="tool-badge hot-badge">POPULAR</span>
            <div className="tool-icon-box">
              <Icon name="homeLoan" className="tool-icon-svg" />
            </div>
            <h3>Home Loan</h3>
            <p>Lowest EMI for your dream home</p>
          </a>

          <a href="/emi-calculator" className="tool-tile star">
            <span className="tool-badge star-badge">MOST USED</span>
            <div className="tool-icon-box">
              <Icon name="emi" className="tool-icon-svg" />
            </div>
            <h3>EMI Calculator</h3>
            <p>Plan your loan instantly</p>
          </a>

          <a href="/credit-score" className="tool-tile smart">
            <span className="tool-badge smart-badge">SMART</span>
            <div className="tool-icon-box">
              <Icon name="creditScore" className="tool-icon-svg" />
            </div>
            <h3>Credit Score</h3>
            <p>Check your CIBIL for free</p>
          </a>

          <a href="/sip-calculator" className="tool-tile">
            <div className="tool-icon-box">
              <Icon name="sip" className="tool-icon-svg" />
            </div>
            <h3>SIP Calculator</h3>
            <p>Grow wealth monthly</p>
          </a>

          <a href="/fd-calculator" className="tool-tile">
            <div className="tool-icon-box">
              <Icon name="fd" className="tool-icon-svg" />
            </div>
            <h3>FD Calculator</h3>
            <p>Safe returns guaranteed</p>
          </a>

          <a href="/investing" className="tool-tile">
            <div className="tool-icon-box">
              <Icon name="investing" className="tool-icon-svg" />
            </div>
            <h3>Investing</h3>
            <p>Start small, grow big</p>
          </a>

          <a href="/savings" className="tool-tile">
            <div className="tool-icon-box">
              <Icon name="saving" className="tool-icon-svg" />
            </div>
            <h3>Savings</h3>
            <p>Plan your emergency fund</p>
          </a>
        </div>
      </section>

      {/* Trust Strat bar */}
      <div className="tool-stats-bar">
        <div className="tool-stat">
          <strong>10+</strong>
          <span>Financial Tools</span>
        </div>
        <div className="tool-stat">
          <strong>5,000+</strong>
          <span>Monthly Users</span>
        </div>
        <div className="tool-stat">
          <strong>₹500 Cr+</strong>
          <span>EMI Calculated</span>
        </div>
        <div className="tool-stat">
          <strong>100%</strong>
          <span>Free & Secure</span>
        </div>
      </div>

      {/* ✅ WHY TRUST FINCADO */}
      <section className="why-trust">
        <h2>Why Trust Fincado?</h2>

        <div className="why-grid">
          <div className="why-card">
            <div className="why-icon">🔒</div>
            <h3>100% Secure</h3>
            <p>Your data is encrypted and never shared with third parties.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">⚡</div>
            <h3>Instant Calculations</h3>
            <p>Get accurate EMI, SIP & FD results in real time.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">🏦</div>
            <h3>Bank-Grade Accuracy</h3>
            <p>Rates are sourced from official bank data.</p>
          </div>

          <div className="why-card">
            <div className="why-icon">🇮🇳</div>
            <h3>Built for India</h3>
            <p>Optimized for Indian users, taxes & loan rules.</p>
          </div>
        </div>
      </section>

      {/* ✅ LOAN CONVERSION SECTION */}
      <section className="loan-convert">
        <div className="loan-convert-grid">
          {/* LEFT CONTENT */}
          <div className="loan-convert-content">
            <h2>Get the Best Loan Offers for You</h2>
            <p>
              Compare real-time personal & home loan offers from top banks in
              India. No spam. No hidden charges.
            </p>

            <ul className="loan-benefits">
              <li>✅ Lowest Interest Rates</li>
              <li>✅ Fast Approval from Banks</li>
              <li>✅ No Impact on Credit Score</li>
            </ul>

            <div className="loan-note">
              🔒 Your details are safe & never shared without consent.
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="loan-form-card">
            <h3>Check Loan Offers</h3>

            <form>
              <input type="text" placeholder="Your Full Name" />
              <input type="tel" placeholder="Mobile Number" />
              <input type="email" placeholder="Email (optional)" />

              <button type="submit" className="primary-cta">
                Show Best Offers
              </button>

              <p className="form-disclaimer">
                We will only use your details to show relevant loan offers.
              </p>
            </form>
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

      {/* ✅ FINAL CTA SECTION */}
      <section className="final-cta">
        <div className="final-cta-inner">
          <h2>Ready to Plan Your Loan the Smart Way?</h2>
          <p>
            Use India’s most trusted free calculators to plan your EMI, savings
            & investments before making any financial decision.
          </p>

          <div className="final-cta-row">
            <a href="/emi-calculator">
              <button className="primary-cta">Start with EMI Calculator</button>
            </a>

            <a href="/credit-score">
              <button>Check Credit Score</button>
            </a>
          </div>
        </div>
      </section>

      {/* ✅ ADSENSE PLACEHOLDER (SAFE FOR REVIEW) */}
      <div className="ad-box" style={{ marginTop: 80 }}>
        Advertisement
      </div>
    </main>
  );
}

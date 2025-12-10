import './globals.css';
import Header from '@/components/Header';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={rubik.className}>
      <body>
        {/* ✅ GLOBAL HEADER */}
        <Header />

        {children}

        {/* ✅ GLOBAL FOOTER — clean & professional */}
        <footer
          className="site-footer"
          role="contentinfo"
          aria-label="Site footer"
        >
          <div className="footer-inner">
            {/* BRAND */}
            <div className="footer-brand" aria-label="Fincado brand">
              <div className="footer-logo" aria-hidden>
                Fincado
              </div>

              <p className="footer-desc">
                India’s smart financial calculator platform — EMI, SIP, FD and
                credit tools you can trust.
              </p>

              <div className="footer-social" aria-label="Follow Fincado">
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fincado on Twitter"
                >
                  {/* Twitter SVG */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M23 4.5c-.7.3-1.5.6-2.3.7a4 4 0 0 0-7 2.8v1A11.4 11.4 0 0 1 3 3.8a4 4 0 0 0 1.2 5.4 4 4 0 0 1-1.8-.5v.1a4 4 0 0 0 3.2 3.9 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 1.5 19 11.3 11.3 0 0 0 8 21c7.5 0 11.6-6.4 11.6-12v-.6A8 8 0 0 0 23 4.5z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Fincado on LinkedIn"
                >
                  {/* LinkedIn SVG */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5zM3 9h4v12H3zM9 9h3.7v1.7h.1c.5-1 1.8-2 3.7-2C20.6 8.7 21 11 21 14.3V21h-4v-6.2c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3v6.3H9z"
                      fill="currentColor"
                    />
                  </svg>
                </a>

                <a href="/contact" aria-label="Contact Fincado" title="Contact">
                  {/* Mail icon */}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M3 6.5v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-11a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                    />
                    <path
                      d="M21 6.5l-9 6-9-6"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <p className="footer-copy">
                © {new Date().getFullYear()} Fincado. All rights reserved.
              </p>
            </div>

            {/* LINK GROUPS */}
            <nav className="footer-links" aria-label="Footer navigation">
              <div className="footer-col">
                <h4>Calculators</h4>
                <ul>
                  <li>
                    <a href="/emi-calculator">EMI Calculator</a>
                  </li>
                  <li>
                    <a href="/sip-calculator">SIP Calculator</a>
                  </li>
                  <li>
                    <a href="/fd-calculator">FD Calculator</a>
                  </li>
                  <li>
                    <a href="/savings">Savings Calculator</a>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Loans</h4>
                <ul>
                  <li>
                    <a href="/loans/personal-loan">Personal Loan</a>
                  </li>
                  <li>
                    <a href="/loans/home-loan">Home Loan</a>
                  </li>
                  <li>
                    <a href="/compare-loans">Compare Loans</a>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Credit</h4>
                <ul>
                  <li>
                    <a href="/credit-score">Check Credit Score</a>
                  </li>
                  <li>
                    <a href="/guides">Loan & Finance Guides</a>
                  </li>
                  <li>
                    <a href="/investment">Investing</a>
                  </li>
                </ul>
              </div>

              <div className="footer-col">
                <h4>Company</h4>
                <ul>
                  <li>
                    <a href="/about">About Fincado</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                  <li>
                    <a href="/privacy-policy">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms">Terms of Use</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* BOTTOM ROW */}
          <div className="footer-bottom">
            <p className="footer-legal">
              Fincado is a financial education platform. Content is for
              informational purposes only and not financial advice.
            </p>

            <div className="footer-legal-links">
              <a href="/disclaimer">Disclaimer</a>
              <a href="/cookie-policy">Cookie Policy</a>
            </div>
          </div>
        </footer>

        {/* ✅ MOBILE STICKY AD BAR */}
        <div className="mobile-ad-bar">
          <a href="#" className="mobile-ad-btn">
            Check Best Loan Offers
          </a>
        </div>
      </body>
    </html>
  );
}

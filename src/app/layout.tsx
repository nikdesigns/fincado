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

        {/* ✅ GLOBAL FOOTER */}
        <footer className="site-footer">
          <div className="footer-inner">
            {/* ✅ BRAND COLUMN */}
            <div className="footer-brand">
              <div className="footer-logo">Fincado</div>
              <p>India’s smart financial calculator platform.</p>
              <p className="footer-copy">
                © 2025 Fincado. All rights reserved.
              </p>
            </div>

            {/* ✅ CALCULATORS */}
            <div className="footer-col">
              <h4>Calculators</h4>
              <a href="/emi-calculator">EMI Calculator</a>
              <a href="/sip-calculator">SIP Calculator</a>
              <a href="/fd-calculator">FD Calculator</a>
            </div>

            {/* ✅ LOANS */}
            <div className="footer-col">
              <h4>Loans</h4>
              <a href="/loans/personal-loan">Personal Loan</a>
              <a href="/loans/home-loan">Home Loan</a>
              <a href="/compare-loans">Compare Loans</a>
            </div>

            {/* ✅ CREDIT */}
            <div className="footer-col">
              <h4>Credit</h4>
              <a href="/credit-score">Check Credit Score</a>
              <a href="/guides">Loan & Finance Guides</a>
            </div>

            {/* ✅ COMPANY */}
            <div className="footer-col">
              <h4>Company</h4>
              <a href="/about">About Fincado</a>
              <a href="/contact">Contact</a>
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
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

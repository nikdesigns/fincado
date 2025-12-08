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
        <footer>
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '30px',
            }}
          >
            <div>
              <h4>Calculators</h4>
              <a href="/emi-calculator">EMI Calculator</a>
              <br />
              <a href="/sip-calculator">SIP Calculator</a>
              <br />
              <a href="/fd-calculator">FD Calculator</a>
            </div>

            <div>
              <h4>Loans</h4>
              <a href="/loans/personal-loan">Personal Loan</a>
              <br />
              <a href="/loans/home-loan">Home Loan</a>
              <br />
              <a href="/compare-loans">Compare Loans</a>
            </div>

            <div>
              <h4>Credit</h4>
              <a href="/credit-score">Check Credit Score</a>
              <br />
              <a href="/guides">Loan & Finance Guides</a>
            </div>

            <div>
              <h4>Company</h4>
              <a href="/about">About Fincado</a>
              <br />
              <a href="/contact">Contact</a>
              <br />
              <a href="/privacy-policy">Privacy Policy</a>
              <br />
              <a href="/terms">Terms of Use</a>
            </div>
          </div>

          <p
            style={{ marginTop: '30px', textAlign: 'center', fontSize: '13px' }}
          >
            © {new Date().getFullYear()} Fincado.com — All rights reserved.
          </p>
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

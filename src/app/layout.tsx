import './globals.css';
import Link from 'next/link';
import Header from '@/components/Header';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ GLOBAL HEADER */}
        <Header />

        {children}

        {/* ✅ GLOBAL FOOTER */}
        <footer>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <p style={{ fontWeight: 700 }}>
              © {new Date().getFullYear()} Fincado
            </p>

            <ul
              style={{
                display: 'flex',
                gap: 20,
                padding: 0,
                listStyle: 'none',
              }}
            >
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/disclaimer">Disclaimer</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>

            <p style={{ marginTop: 12, fontSize: 13 }}>
              Fincado provides financial calculators for educational purposes
              only. We do not offer financial advice.
            </p>
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

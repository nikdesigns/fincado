import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | Fincado',
  description:
    'The page you are looking for does not exist. Use our free financial calculators.',
};

export default function NotFound() {
  return (
    <div
      className="container"
      style={{ padding: '80px 20px', textAlign: 'center' }}
    >
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>🤔</div>
      <h1 style={{ marginBottom: '16px', color: '#0f172a' }}>Page Not Found</h1>
      <p style={{ color: '#64748b', marginBottom: '40px', fontSize: '18px' }}>
        Oops! We couldn&apos;t find that page. But we can help you calculate
        your finances.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '16px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <Link href="/emi-calculator" className="tool-tile">
          <h3 style={{ fontSize: '16px', margin: 0 }}>📉 EMI Calculator</h3>
        </Link>
        <Link href="/sip-calculator" className="tool-tile">
          <h3 style={{ fontSize: '16px', margin: 0 }}>📈 SIP Calculator</h3>
        </Link>
        <Link
          href="/"
          className="primary-cta"
          style={{ textAlign: 'center', justifyContent: 'center' }}
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}

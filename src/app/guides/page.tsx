import type { Metadata } from 'next';
import GuidesGrid from './GuidesGrid';
import LegalNote from '@/components/LegalNote';
import FinancialNavWidget from '@/components/FinancialNavWidget';

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'Financial Guides, Articles & Resources | Fincado',
  description:
    'Find expert guides on credit scores, tax saving schemes (80C), home loans, SIP vs FD, and retirement planning. All articles are tailored for Indian investors.',
  keywords: [
    'financial guides',
    'tax planning articles',
    'credit score guide',
    'SIP vs FD explained',
    'investment strategy India',
  ],
  openGraph: {
    title: 'Expert Financial Guides & Articles',
    description:
      'Deep-dive resources on every major financial topic for smart investing.',
    url: 'https://yourwebsite.com/guides',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function GuidesIndexPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0 }}>
        {/* Client Component renders the guides */}
        <GuidesGrid />

        <div className="ad-box" style={{ marginTop: 24 }}>
          AdSense Slot: Mid Content Banner
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Resource Integrity and Disclaimer</h2>
          <p>
            All guides and articles are based on prevailing financial rules and
            taxation as per the Government of India, but should not be taken as
            legal or financial advice. We recommend consulting a licensed
            professional for personalized planning.
          </p>
          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          AdSense Slot: Before Footer
        </div>
      </div>
    </main>
  );
}

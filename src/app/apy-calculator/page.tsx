import type { Metadata } from 'next';
import APYClient from './APYClient'; // Assuming this is the path to your client component
import LegalNote from '@/components/LegalNote'; // Assuming LegalNote exists
import FinancialNavWidget from '@/components/FinancialNavWidget'; // Assuming the sleek widget exists

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title:
    'Atal Pension Yojana (APY) Calculator | Guaranteed Pension & Contribution',
  description:
    'Use our APY calculator to find the required monthly contribution for a guaranteed pension (₹1k-₹5k) at age 60. Check eligibility and Section 80CCD tax benefits.',
  keywords: [
    'APY calculator',
    'Atal Pension Yojana contribution',
    'APY pension amount',
    'APY eligibility',
    'APY tax benefit 80CCD',
    'guaranteed pension scheme',
  ],
  openGraph: {
    title: 'APY Contribution & Guaranteed Pension Calculator',
    description:
      'Calculate the required monthly contribution for your chosen APY pension slab.',
    url: 'https://yourwebsite.com/apy-calculator',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function APYCalculatorPage() {
  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 300px',
        gap: 16,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div className="ad-box">Ad will appear here (Above the fold)</div>

        {/* Client Component renders the calculator logic and SEO content */}
        <APYClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Important Notes on APY Eligibility & Benefits</h2>
          <ul>
            <li>
              **Income Taxpayer Exclusion:** With effect from October 1, 2022,
              any individual who is or has been an income tax payer is **not
              eligible** to join the APY scheme.
            </li>
            <li>
              **Guaranteed Returns:** The minimum pension benefit is guaranteed
              by the Government of India. Any shortfall in market returns is
              covered by the government.
            </li>
            <li>
              **Tax Deduction:** Contributions qualify for deduction under
              **Section 80CCD(1)** of the Income Tax Act.
            </li>
          </ul>

          <LegalNote />
        </section>

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>

        {/* Use the sleek navigation widget */}
        <FinancialNavWidget />
      </aside>
    </main>
  );
}

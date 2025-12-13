import type { Metadata } from 'next';
import GSTClient from './GSTClient';
import LegalNote from '@/components/LegalNote'; // Assuming these placeholders are correct
import FinancialNavWidget from '@/components/FinancialNavWidget';

// --- 1. SEO METADATA ---
export const metadata: Metadata = {
  title: 'GST Calculator India | Calculate Net Price, Gross Price, & Tax Split',
  description:
    'Use our free GST calculator to instantly add or remove GST from any price. Get the exact GST amount, Net Price, Gross Price, and the CGST/SGST split for all major tax slabs.',
  keywords: [
    'GST calculator',
    'GST rate calculation',
    'add GST to price',
    'remove GST from price',
    'CGST SGST calculator',
    'Net price calculation',
  ],
  openGraph: {
    title: 'GST Calculator India | Net & Gross Price',
    description: 'Calculate GST for all slabs instantly and accurately.',
    url: 'https://yourwebsite.com/gst-calculator',
    type: 'website',
  },
};

// --- 2. PAGE COMPONENT (Server Component) ---
export default function GSTCalculatorPage() {
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
        <h1>GST Calculator — Add or Remove Tax from Price</h1>

        <p style={{ maxWidth: 760 }}>
          The Goods and Services Tax (GST) Calculator simplifies tax compliance
          by allowing you to quickly determine the final sale price (Gross
          Price) or the base cost (Net Price) for any product based on the
          prevailing GST slab.
        </p>

        <div className="ad-box">Ad will appear here (Above the fold)</div>

        {/* The GSTClient component contains the calculator interface and all the SEO-rich content/FAQs */}
        <GSTClient />

        <div className="ad-box" style={{ marginTop: 24 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 24 }}>
          <h2>Key GST Notes for Compliance</h2>
          <ul>
            <li>
              GST operates on the **Input Tax Credit (ITC)** principle, allowing
              businesses to offset tax paid on inputs against output liability.
            </li>
            <li>
              The total GST amount is divided equally into **CGST (Central)**
              and **SGST (State)** for intra-state sales, or charged as **IGST
              (Integrated)** for inter-state sales.
            </li>
            <li>
              Tax calculation must be accurate to avoid penalties and streamline
              filing of returns (GSTR-1, GSTR-3B).
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
        {/* This widget helps monetize the high-intent finance traffic */}
        <FinancialNavWidget />
      </aside>
    </main>
  );
}

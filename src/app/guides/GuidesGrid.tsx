// src/app/guides/GuidesGrid.tsx
'use client';
import React from 'react';
import {
  FaBookOpen,
  FaShieldAlt,
  FaHome,
  FaCreditCard,
  FaBalanceScale,
  FaMoneyBillWave,
} from 'react-icons/fa';

// --- Placeholder Data based on uploaded files and common topics ---
const GUIDE_DATA = [
  {
    title: 'Home Loan for First-Time Buyers',
    slug: 'home-loan-for-first-time-buyers',
    category: 'Loans & Mortgages',
    icon: <FaHome style={{ color: '#1d4ed8' }} />,
    desc: 'A step-by-step guide covering LTV, tax benefits, eligibility, and the EMI process for new homeowners.',
    date: '2025-09-10',
  },
  {
    title: 'How Your Credit Score Affects Loan Approvals',
    slug: 'how-credit-score-affects-loans',
    category: 'Credit & Eligibility',
    icon: <FaCreditCard style={{ color: '#dc2626' }} />,
    desc: 'Deep dive into CIBIL score factors, the impact of utilization, and strategies for rapid score improvement.',
    date: '2025-08-20',
  },
  {
    title: 'SIP vs. FD: Which is the Better Long-Term Investment?',
    slug: 'sip-vs-fd',
    category: 'Investment Strategy',
    icon: <FaBalanceScale style={{ color: '#047857' }} />,
    desc: 'Comparative analysis of systematic investing (SIP) and capital preservation (FD) strategies for different goals.',
    date: '2025-07-15',
  },
  {
    title: 'The Ultimate Guide to Tax Saving Schemes (80C)',
    slug: 'top-tax-saving-schemes',
    category: 'Tax Planning',
    icon: <FaMoneyBillWave style={{ color: '#f59e0b' }} />,
    desc: 'Everything you need to know about Section 80C deductions: PPF, ELSS, FD, and NPS.',
    date: '2025-06-01',
  },
  {
    title: 'SWP vs. SIP: Planning Your Retirement Income Stream',
    slug: 'swp-vs-sip',
    category: 'Retirement & Income',
    icon: <FaBookOpen style={{ color: '#60a5fa' }} />,
    desc: 'Transitioning from accumulation (SIP) to distribution (SWP) for a secure post-retirement income.',
    date: '2025-05-25',
  },

  // Add a placeholder for a general guide not directly from the list
  {
    title: 'Understanding GST Compliance for Small Businesses',
    slug: 'understanding-gst-compliance',
    category: 'Tax Planning',
    icon: <FaShieldAlt style={{ color: '#1f2937' }} />,
    desc: 'A checklist of invoicing, return filing (GSTR-3B), and ITC requirements to avoid penalties.',
    date: '2025-10-01',
  },
];

// Helper to group data by category
const groupedGuides = GUIDE_DATA.reduce((acc, guide) => {
  if (!acc[guide.category]) {
    acc[guide.category] = [];
  }
  acc[guide.category].push(guide);
  return acc;
}, {} as Record<string, typeof GUIDE_DATA>);

// Helper to render the date nicely
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Component to render individual guide tiles
const GuideTile = ({ guide }: { guide: (typeof GUIDE_DATA)[0] }) => (
  <a
    href={`/guides/${guide.slug}`}
    className="guide-tile"
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px',
      border: '1px solid var(--color-border-light)',
      borderRadius: 'var(--radius-xl)',
      backgroundColor: 'var(--color-card-white)',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s, box-shadow 0.2s',
      textDecoration: 'none',
      color: 'inherit',
      minHeight: '180px',
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '8px',
      }}
    >
      <span style={{ fontSize: '20px' }}>{guide.icon}</span>
      <h3
        style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: 'var(--font-weight-semibold)',
          color: 'var(--color-text-dark)',
        }}
      >
        {guide.title}
      </h3>
    </div>

    <p
      style={{
        fontSize: '14px',
        color: 'var(--color-text-subtle)',
        flexGrow: 1,
      }}
    >
      {guide.desc}
    </p>

    <div
      style={{
        fontSize: '12px',
        color: '#9ca3af',
        borderTop: '1px solid #f3f4f6',
        paddingTop: '10px',
        marginTop: '10px',
      }}
    >
      {formatDate(guide.date)} &bull; {guide.category}
    </div>
  </a>
);

export default function GuidesGrid() {
  return (
    <div className="guide-hub-page article">
      <h1>Expert Financial Guides & Resources</h1>
      <p className="tools-sub">
        Browse deep-dive articles on loans, investment strategies, tax planning,
        and credit management, tailored for the Indian financial context.
      </p>

      <div className="ad-box" style={{ marginTop: '20px' }}>
        AdSense Leaderboard Slot
      </div>

      {Object.entries(groupedGuides).map(([category, guides]) => (
        <section key={category} className="guides-section">
          <div className="tools-header" style={{ marginTop: '40px' }}>
            <h2 style={{ fontSize: '22px' }}>{category}</h2>
          </div>

          <div
            className="guide-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '24px',
              marginTop: '16px',
            }}
          >
            {guides.map((guide) => (
              <GuideTile key={guide.slug} guide={guide} />
            ))}
          </div>
        </section>
      ))}

      <style jsx global>{`
        /* Simple hover effect for the tiles */
        .guide-tile:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
          border-color: rgba(4, 120, 87, 0.2); /* Highlight border on hover */
        }
      `}</style>
    </div>
  );
}

import type { Metadata } from 'next';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import EducationLoanClient from './EducationLoanClient';

export const metadata: Metadata = {
  title: 'Education Loan Calculator – Student Loan EMI Calculator | Fincado',
  description:
    'India-focused education loan EMI calculator. Compute monthly EMI, total interest, moratorium effects and amortization schedule for student loans.',
};

export default function EducationLoanPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Education Loan EMI Calculator — Fincado',
    description:
      'Calculate education loan EMI, effect of moratorium (study) period, total interest and repayment schedule. India-focused calculator.',
    url: 'https://your-site.example/loans/education-loan',
  };

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
        <h1>Education Loan Calculator — Estimate Student Loan EMI</h1>
        <p style={{ maxWidth: 700 }}>
          Plan your education loan with moratorium options, calculate monthly
          EMIs, total interest and view a full amortization schedule. Designed
          for Indian student loan scenarios.
        </p>

        <div className="ad-box" style={{ margin: '18px 0' }}>
          Ad will appear here (Above the fold)
        </div>

        <EducationLoanClient />

        <div className="ad-box" style={{ marginTop: 28 }}>
          Ad will appear here (Mid content)
        </div>

        <section className="article" style={{ marginTop: 28 }}>
          <h2>Notes about education loans</h2>
          <ul>
            <li>
              Many education loans offer a moratorium (study) period where you
              may pay only interest (or nothing). This tool supports an
              interest-only moratorium option.
            </li>
            <li>
              Processing fees, insurance and margin money are not included in
              EMI calculations — add them to the loan amount if needed.
            </li>
            <li>
              If your lender capitalises interest during moratorium (adds it to
              principal), total interest payable increases — choose the option
              that matches your lender.
            </li>
          </ul>
        </section>

        <div className="ad-box" style={{ marginTop: 32 }}>
          Ad will appear here (Before footer)
        </div>
      </div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>
        {/* This widget helps monetize the high-intent finance traffic */}
        <FinancialNavWidget />
      </aside>

      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}

import { notFound } from 'next/navigation';
import cities from '@/data/cities.json';

type City = { slug: string; name: string };

const loanTypes: Record<string, string> = {
  'personal-loan': 'Personal Loan',
  'home-loan': 'Home Loan',
  'car-loan': 'Car Loan',
  'credit-score': 'Credit Score Check',
};

/* ✅ REQUIRED FOR STATIC EXPORT */
export async function generateStaticParams() {
  const params: { city: string; type: string }[] = [];

  (cities as City[]).forEach((city) => {
    Object.keys(loanTypes).forEach((type) => {
      params.push({
        city: city.slug,
        type,
      });
    });
  });

  return params;
}

/* ✅ FULL PAGE WITH SIDEBAR + ADS */
export default async function CityLoanPage({
  params,
}: {
  params: Promise<{ city: string; type: string }>;
}) {
  const { city, type } = await params;

  const cityData = (cities as City[]).find((c) => c.slug === city);
  const loanName = loanTypes[type as keyof typeof loanTypes];

  if (!cityData || !loanName) return notFound();

  return (
    <main
      style={{
        maxWidth: 1180,
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: 20,
        padding: '32px 16px',
      }}
    >
      {/* ✅ MAIN CONTENT */}
      <div style={{ minWidth: 0 }}>
        <h1>
          {loanName} in {cityData.name} – Best Rates & Instant Approval
        </h1>

        <p style={{ maxWidth: 720 }}>
          Compare the best {loanName.toLowerCase()} offers in {cityData.name}.
          Get low interest rates, fast approval and secure processing.
        </p>

        {/* ✅ TOP ADS */}
        <div className="ad-box">
          <p>Ad will appear here (Above the fold)</p>
        </div>

        {/* ✅ MID CONTENT ADS */}
        <div className="ad-box">
          <p>Ad will appear here (Mid content)</p>
        </div>

        {/* ✅ SEO ARTICLE */}
        <section className="article">
          <h2>
            Why Apply for {loanName} in {cityData.name}?
          </h2>
          <p>
            Banks in {cityData.name} offer competitive interest rates and
            instant approval for eligible applicants. Applying through Fincado
            helps you compare multiple lenders in one place.
          </p>

          <h2>Eligibility Criteria</h2>
          <ul>
            <li>Minimum age: 21 years</li>
            <li>Stable monthly income</li>
            <li>Good credit score</li>
            <li>Valid KYC documents</li>
          </ul>

          <h2>Documents Required</h2>
          <ul>
            <li>Aadhaar & PAN</li>
            <li>Bank statement (last 6 months)</li>
            <li>Salary slips / ITR</li>
            <li>Residence proof</li>
          </ul>

          <h2>Interest Rates in {cityData.name}</h2>
          <p>
            Current {loanName.toLowerCase()} interest rates in {cityData.name}
            range between 10.25% to 16.99% depending on your credit profile.
          </p>

          <h2>Related Tools</h2>
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
          </ul>

          <h2>Disclaimer</h2>
          <p>
            Loan approval and interest rates are subject to bank policies and
            individual applicant profile.
          </p>
        </section>

        {/* ✅ BEFORE FOOTER ADS */}
        <div className="ad-box">
          <p>Ad will appear here (Before footer)</p>
        </div>
      </div>

      {/* ✅ SIDEBAR */}
      <aside className="sidebar">
        <div className="ad-box">Sticky Sidebar Ad</div>

        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>Compare Loan Offers</h3>
          <ul className="side-links">
            <li>
              <a href="#">Check Home Loan Rates</a>
            </li>
            <li>
              <a href="#">Best Personal Loan</a>
            </li>
            <li>
              <a href="#">Low Interest Car Loan</a>
            </li>
          </ul>
        </div>

        <div className="side-card" style={{ marginTop: 24 }}>
          <h3>People Also Use</h3>
          <ul className="side-links">
            <li>
              <a href="/sip-calculator">SIP Calculator</a>
            </li>
            <li>
              <a href="/fd-calculator">FD Calculator</a>
            </li>
            <li>
              <a href="/home-loan-rates">Home Loan Rates</a>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  );
}

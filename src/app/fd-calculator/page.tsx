import type { Metadata } from 'next';
import FDClient from './FDClient';

export const metadata: Metadata = {
  title:
    'FD Calculator – Fixed Deposit Interest & Maturity Calculator | Fincado',
  description:
    'Free FD Calculator to calculate fixed deposit maturity value, interest earned and total investment. Plan your bank deposits smartly with Fincado.',
};

export default function FDPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1>FD Calculator – Calculate Fixed Deposit Maturity Instantly</h1>

      <p style={{ maxWidth: 700 }}>
        Use this free FD Calculator to estimate your fixed deposit maturity
        value, total interest earned, and total amount invested. This tool works
        for regular bank FDs and senior citizen deposits.
      </p>

      {/* ✅ AD SLOT 1 */}
      <div className="ad-box">
        <p>Ad will appear here (Above the fold)</p>
      </div>

      {/* ✅ INTERACTIVE FD TOOL */}
      <FDClient />

      {/* ✅ AD SLOT 2 */}
      <div className="ad-box">
        <p>Ad will appear here (Mid content)</p>
      </div>

      {/* ✅ LONG SEO ARTICLE */}
      <section className="article">
        <h2>What is a Fixed Deposit (FD)?</h2>
        <p>
          A Fixed Deposit (FD) is one of the safest investment options offered
          by banks and financial institutions. You invest a lump sum for a fixed
          tenure at a predetermined interest rate and receive guaranteed returns
          at maturity.
        </p>

        <h2>How FD Interest is Calculated</h2>
        <p>
          Most bank fixed deposits use compound interest with quarterly
          compounding. The standard formula is:
        </p>

        <pre>M = P × (1 + r/n)^(n×t)</pre>

        <p>
          Where P is the principal, r is the annual rate of interest, n is the
          compounding frequency, and t is the time in years.
        </p>

        <h2>Benefits of Fixed Deposits</h2>
        <ul>
          <li>Guaranteed returns</li>
          <li>No market risk</li>
          <li>Flexible tenure</li>
          <li>Senior citizen benefits</li>
        </ul>

        <h2>FD for Regular Investors vs Senior Citizens</h2>
        <p>
          Senior citizens often receive higher interest rates than regular
          investors. This makes FDs a popular retirement investment option.
        </p>

        <h2>FD vs SIP Investment</h2>
        <p>
          FD offers guaranteed but lower returns, while SIP offers higher
          potential returns with market risk. Conservative investors prefer FD,
          while long-term wealth builders choose SIP.
        </p>

        <h2>Related Financial Tools</h2>
        <ul>
          <li>
            <a href="/sip-calculator">SIP Calculator</a>
          </li>
          <li>
            <a href="/emi-calculator">EMI Calculator</a>
          </li>
          <li>
            <a href="/loans">Loan Calculators</a>
          </li>
        </ul>

        <h2>Important Disclaimer</h2>
        <p>
          FD interest calculations shown here are for illustration only. Actual
          banks may use different compounding frequencies and rates.
        </p>
      </section>

      {/* ✅ AD SLOT 3 */}
      <div className="ad-box">
        <p>Ad will appear here (Before footer)</p>
      </div>
    </main>
  );
}

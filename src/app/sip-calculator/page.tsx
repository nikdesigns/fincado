import type { Metadata } from 'next';
import SIPClient from './SIPClient';

export const metadata: Metadata = {
  title: 'SIP Calculator – Calculate Mutual Fund SIP Returns | Fincado',
  description:
    'Free SIP Calculator to calculate mutual fund returns, maturity value, total investment and profits. Plan your investments better with Fincado.',
};

export default function SIPPage() {
  return (
    <main style={{ maxWidth: 1100, margin: '0 auto' }}>
      <h1>SIP Calculator – Calculate SIP Returns Instantly</h1>

      <p style={{ maxWidth: 700 }}>
        Use this free SIP Calculator to estimate the future value of your mutual
        fund investments. Calculate your SIP maturity amount, total investment,
        and total returns instantly.
      </p>

      {/* ✅ AD SLOT 1 */}
      <div className="ad-box">
        <p>Ad will appear here (Above the fold)</p>
      </div>

      {/* ✅ INTERACTIVE SIP TOOL */}
      <SIPClient />

      {/* ✅ AD SLOT 2 */}
      <div className="ad-box">
        <p>Ad will appear here (Mid content)</p>
      </div>

      {/* ✅ LONG SEO ARTICLE */}
      <section className="article">
        <h2>What is SIP?</h2>
        <p>
          SIP, or Systematic Investment Plan, is a method of investing a fixed
          amount regularly in mutual funds. Instead of investing a lump sum, SIP
          allows you to invest monthly, helping you build wealth gradually.
        </p>

        <h2>How SIP Works</h2>
        <p>
          Every month, a fixed amount is deducted from your bank account and
          invested into a mutual fund scheme. Over time, you accumulate units at
          different market levels, benefiting from rupee cost averaging.
        </p>

        <h2>SIP Formula</h2>
        <pre>FV = P × [ (1 + r)^n − 1 ] / r × (1 + r)</pre>

        <p>
          Where P is monthly investment, r is monthly rate of return, and n is
          the number of months.
        </p>

        <h2>Benefits of SIP Investment</h2>
        <ul>
          <li>Disciplined investing</li>
          <li>Rupee cost averaging</li>
          <li>Power of compounding</li>
          <li>Flexible investment amount</li>
        </ul>

        <h2>SIP vs Lump Sum Investment</h2>
        <p>
          SIP reduces market timing risk since you invest at different price
          levels. Lump sum investing requires correct market timing, which is
          difficult for most investors.
        </p>

        <h2>How to Increase SIP Returns</h2>
        <ul>
          <li>Increase SIP amount annually</li>
          <li>Stay invested for the long term</li>
          <li>Reinvest gains</li>
          <li>Choose funds based on risk profile</li>
        </ul>

        <h2>Related Financial Tools</h2>
        <ul>
          <li>
            <a href="/emi-calculator">EMI Calculator</a>
          </li>
          <li>
            <a href="/loans">Loan Calculators</a>
          </li>
        </ul>

        <h2>Important Disclaimer</h2>
        <p>
          SIP returns shown here are estimates based on assumed rates of return.
          Actual returns may vary depending on market performance and fund
          selection.
        </p>
      </section>

      {/* ✅ AD SLOT 3 */}
      <div className="ad-box">
        <p>Ad will appear here (Before footer)</p>
      </div>
    </main>
  );
}

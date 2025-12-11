import type { Metadata } from 'next';

export const metadata: Metadata = {
  title:
    'Home Loan for First Time Buyers – PMAY, Tax Benefits & Checklist | Fincado',
  description:
    'A complete guide for first-time home loan applicants in India. Learn about PMAY scheme subsidy, maximum tax benefits (Section 80EEA, 80C), eligibility, and a must-have checklist.',
};

export default function HomeLoanPage() {
  return (
    <main className="container">
      {/* --------------------- MAIN ARTICLE CONTENT (1fr) --------------------- */}
      <div style={{ minWidth: 0 }}>
        <h1>
          ⭐ Home Loan Guide for First Time Buyers in India: PMAY, Tax Benefits
          & Checklist
        </h1>

        <p style={{ maxWidth: 700 }}>
          Buying your first home is a milestone. This guide covers everything
          you need to know about securing a **Home Loan** in India, focusing on
          the maximum financial benefits and government schemes exclusively
          available to **first-time buyers**.
        </p>

        {/* Adsense-friendly placement */}
        <div
          className="ad-box"
          style={{
            margin: '20px 0',
            textAlign: 'center',
            border: '1px dashed #ccc',
            padding: '10px',
          }}
        >
          **Advertisement (Adsense Banner 1)**
        </div>

        <section className="article">
          <h2>1. Why is Buying a Home in India Better for First-Timers?</h2>
          <p>
            First-time homebuyers enjoy unique advantages, primarily driven by
            government incentives designed to encourage homeownership:
          </p>
          <ul>
            <li>
              **Pradhan Mantri Awas Yojana (PMAY):** The Credit Linked Subsidy
              Scheme (CLSS) under PMAY offers direct interest subsidies, making
              EMIs significantly lower for eligible segments (EWS, LIG, MIG).
            </li>
            <li>
              **Additional Tax Deductions:** Special Income Tax sections were
              introduced exclusively for first-time buyers of affordable
              housing.
            </li>
            <li>
              **Lower Stamp Duty:** Some states offer reduced stamp duty
              charges, especially for women buyers or in specific affordable
              housing categories.
            </li>
          </ul>

          <hr />

          <h2>
            2. The Biggest Benefit: PMAY - Credit Linked Subsidy Scheme (CLSS)
          </h2>
          <p>
            The PMAY scheme provides a large upfront subsidy on your home loan
            interest, reducing your principal amount immediately.
          </p>

          <h3>PMAY Subsidy Eligibility (Key Snapshot)</h3>
          <table>
            <thead>
              <tr>
                <th>Income Group</th>
                <th>Annual Household Income</th>
                <th>Maximum Loan Amount for Subsidy</th>
                <th>Interest Subsidy Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>**EWS**</td>
                <td>Up to ₹3 Lakh</td>
                <td>₹6 Lakh</td>
                <td>6.50%</td>
              </tr>
              <tr>
                <td>**LIG**</td>
                <td>₹3 Lakh to ₹6 Lakh</td>
                <td>₹6 Lakh</td>
                <td>6.50%</td>
              </tr>
              <tr>
                <td>**MIG I**</td>
                <td>₹6 Lakh to ₹12 Lakh</td>
                <td>₹9 Lakh</td>
                <td>4.00%</td>
              </tr>
              <tr>
                <td>**MIG II**</td>
                <td>₹12 Lakh to ₹18 Lakh</td>
                <td>₹12 Lakh</td>
                <td>3.00%</td>
              </tr>
            </tbody>
          </table>
          <p>
            **Important:** The applicant family (applicant, spouse, unmarried
            children) must **not own a pucca house** in any part of India to be
            eligible for PMAY.
          </p>

          <hr />

          <h2>3. Maximum Tax Benefits for First-Time Buyers</h2>
          <p>
            As a first-time buyer, you can claim tax deductions across three
            different sections, maximizing your savings.
          </p>

          <table>
            <thead>
              <tr>
                <th>IT Section</th>
                <th>Deduction On</th>
                <th>Max Annual Limit</th>
                <th>Applicable To</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>**Section 80C**</td>
                <td>Principal Repayment</td>
                <td>₹1.50 Lakh</td>
                <td>All Home Loan Borrowers</td>
              </tr>
              <tr>
                <td>**Section 24(b)**</td>
                <td>Interest Paid</td>
                <td>₹2.00 Lakh</td>
                <td>All Home Loan Borrowers (Self-occupied property)</td>
              </tr>
              <tr>
                <td>**Section 80EEA**</td>
                <td>Additional Interest Paid</td>
                <td>₹1.50 Lakh</td>
                <td>
                  **First-time buyers** of affordable housing (property value up
                  to ₹45 Lakh)
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            **Total Potential Annual Deduction (Interest + Principal):** Up to
            **₹5.00 Lakh** (₹1.5L + ₹2.0L + ₹1.5L) in a financial year, subject
            to meeting all conditions of Section 80EEA.
          </p>

          <hr />

          <h2>4. First-Time Buyer Eligibility & Loan Requirements</h2>
          <p>
            While the requirements are similar to regular home loans, first-time
            buyers must be financially prepared for the initial costs.
          </p>

          <h3>Key Financial Checklist</h3>
          <ul>
            <li>
              **Credit Score (CIBIL):** Aim for **750 or above**. This is
              non-negotiable for securing the lowest interest rates.
            </li>
            <li>
              **Down Payment:** Be ready to pay the minimum required
              contribution (usually **10% to 25%** of the property value) as
              banks do not finance the entire cost.
            </li>
            <li>
              **Age:** Typically 18 to 65 years. Starting early (in your 20s or
              30s) allows you to choose a longer tenure and lower EMI.
            </li>
            <li>
              **FOIR (Fixed Obligation to Income Ratio):** Your total EMIs
              (including the new home loan) should not exceed 50% of your net
              monthly income.
            </li>
          </ul>

          <h3>Documents Required (Property Focused)</h3>
          <p>
            In addition to standard KYC and Income Proof, pay special attention
            to the property documents:
          </p>
          <ol>
            <li>
              **Title Deed:** Legal document establishing the seller's clear
              ownership.
            </li>
            <li>
              **Encumbrance Certificate:** Ensures the property is free from any
              legal or monetary dues.
            </li>
            <li>
              **Builder/RERA Approval:** Essential for under-construction
              projects. Always verify the developer's **RERA registration**.
            </li>
          </ol>

          <hr />

          <h2>5. First-Time Home Buyer Checklist (Before Applying)</h2>
          <p>
            Follow these steps to ensure a smooth application and approval
            process:
          </p>
          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}
          >
            <div>
              <h3>Phase 1: Financial Preparation</h3>
              <ul>
                <li>
                  ✅ **Budgeting:** Factor in the principal cost + hidden costs
                  (Stamp Duty, Registration, Brokerage, GST).
                </li>
                <li>
                  ✅ **CIBIL Check:** Download and review your credit report for
                  errors.
                </li>
                <li>
                  ✅ **Down Payment Fund:** Ensure your savings cover the down
                  payment and all upfront charges.
                </li>
                <li>
                  ✅ **Get Pre-Approved:** A pre-approved loan letter
                  strengthens your position with sellers/developers.
                </li>
              </ul>
            </div>
            <div>
              <h3>Phase 2: Property & Legal Check</h3>
              <ul>
                <li>
                  ✅ **Location:** Check current and planned infrastructure
                  (Metro, roads, hospitals).
                </li>
                <li>
                  ✅ **Developer Reputation:** Check reviews and project
                  delivery track record.
                </li>
                <li>
                  ✅ **RERA Verification:** Confirm the project is registered
                  with the state RERA authority.
                </li>
                <li>
                  ✅ **Legal Opinion:** Hire an independent lawyer to verify the
                  property title documents *before* making the booking amount
                  payment.
                </li>
              </ul>
            </div>
          </div>

          <hr />

          <h2>Conclusion: Start Smart, Save Big</h2>
          <p>
            For a first-time homebuyer, the government subsidies and tax
            deductions offer a unique chance to save a significant amount of
            money over the long term. By starting with a strong credit score,
            budgeting for hidden costs, and thoroughly verifying your property's
            legal status, you can turn your dream of owning a home into a
            stress-free reality.
          </p>

          <h2>Related Tools & Resources</h2>
          <ul>
            <li>
              <a href="/emi-calculator">EMI Calculator</a> - See how PMAY
              subsidy impacts your EMI.
            </li>
            <li>
              <a href="/credit-score">Credit Score Check</a> - Ensure your CIBIL
              score is 750+ before applying.
            </li>
          </ul>
        </section>

        {/* Adsense-friendly placement */}
        <div
          className="ad-box"
          style={{
            margin: '20px 0',
            textAlign: 'center',
            border: '1px dashed #ccc',
            padding: '10px',
          }}
        >
          **Advertisement (Adsense Banner 2)**
        </div>
      </div>
    </main>
  );
}

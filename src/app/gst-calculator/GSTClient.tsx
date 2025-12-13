// src/app/gst-calculator/GSTClient.tsx
'use client';
import React, { useMemo, useState } from 'react';

function formatINR(v: number) {
  return '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export default function GSTClient() {
  // Inputs
  const [basePrice, setBasePrice] = useState<number>(10000); // Net or Gross price
  const [gstRatePct, setGstRatePct] = useState<number>(18); // Default 18% GST slab
  const [calculationMode, setCalculationMode] = useState<'add' | 'remove'>(
    'add'
  ); // Add GST to Net Price OR Remove GST from Gross Price

  // Derived Values
  const gstFactor = useMemo(() => gstRatePct / 100, [gstRatePct]);

  const { netPrice, gstAmount, grossPrice } = useMemo(() => {
    let net = 0;
    let gst = 0;
    let gross = 0;

    if (calculationMode === 'add') {
      // Calculate Gross Price (Net Price + GST)
      net = basePrice;
      gst = net * gstFactor;
      gross = net + gst;
    } else {
      // Calculate Net Price (Gross Price - GST)
      gross = basePrice;
      // GST Reverse Calculation: Net = Gross / (1 + Rate)
      net = gross / (1 + gstFactor);
      gst = gross - net;
    }

    return {
      netPrice: Math.round(net),
      gstAmount: Math.round(gst),
      grossPrice: Math.round(gross),
    };
  }, [basePrice, gstFactor, calculationMode]);

  // Tax breakdown (CGST/SGST split for display)
  const cgstAmount = Math.round(gstAmount / 2);
  const sgstAmount = Math.round(gstAmount / 2);

  // Helper setter
  const setter =
    (fn: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) =>
      fn(e.target.value === '' ? 0 : Number(e.target.value));

  // New function for the compliance button
  const handleGstComplianceClick = () => {
    const complianceInfo = [
      'Key GST Compliance Requirements:',
      '1. GST Registration: Mandatory if turnover exceeds the threshold (₹40L for goods, ₹20L for services).',
      '2. Invoicing: Issue GST-compliant invoices with HSN/SAC code and correct tax bifurcation.',
      '3. Returns Filing: Timely file GSTR-1 (sales) and GSTR-3B (summary).',
      '4. Input Tax Credit (ITC): Regularly reconcile purchase tax claims.',
      '5. Benefits: Avoids penalties, improves credibility, and leads to faster ITC claims.',
    ].join('\n');

    alert(complianceInfo);
  };

  return (
    <section className="article">
      <div>
        <h1>🇮🇳 GST Calculator (Goods and Services Tax)</h1>

        <div className="emi-split" style={{ marginTop: 16 }}>
          <div className="emi-left">
            <form
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'grid', gap: 12 }}
            >
              <label>
                Calculation Mode
                <select
                  value={calculationMode}
                  onChange={(e) =>
                    setCalculationMode(e.target.value as 'add' | 'remove')
                  }
                >
                  <option value="add">Add GST to Net Price</option>
                  <option value="remove">Remove GST from Gross Price</option>
                </select>
              </label>

              <label>
                {calculationMode === 'add'
                  ? 'Net Price (₹) — Before GST'
                  : 'Gross Price (₹) — Including GST'}
                <input
                  type="number"
                  value={basePrice}
                  onChange={setter(setBasePrice)}
                  min={0}
                  step={100}
                  required
                />
              </label>

              <label>
                GST Rate (%)
                <input
                  type="number"
                  value={gstRatePct}
                  onChange={setter(setGstRatePct)}
                  min={0}
                  step={0.1}
                  required
                />
              </label>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="primary-cta">Calculate</button>
                <button
                  type="button"
                  onClick={() => {
                    setBasePrice(10000);
                    setGstRatePct(18);
                    setCalculationMode('add');
                  }}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: Results Summary (Visual Element) */}
          <aside
            className="emi-right"
            aria-hidden={false}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              className="summary-box"
              style={{
                backgroundColor: '#fff',
                padding: '20px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                width: '100%',
                maxWidth: '280px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  margin: '0 0 10px',
                  fontSize: '18px',
                  color: '#1f2937',
                }}
              >
                Summary
              </h3>
              <div
                style={{ padding: '8px 0', borderBottom: '1px dashed #eee' }}
              >
                <p style={{ margin: 0, color: '#6b7280' }}>Net Price</p>
                <strong style={{ fontSize: '1.2em' }}>
                  {formatINR(netPrice)}
                </strong>
              </div>
              <div
                style={{ padding: '8px 0', borderBottom: '1px dashed #eee' }}
              >
                <p style={{ margin: 0, color: '#6b7280' }}>
                  GST ({gstRatePct}%)
                </p>
                <strong style={{ fontSize: '1.2em', color: '#dc2626' }}>
                  {calculationMode === 'add' ? '+' : '–'}
                  {formatINR(gstAmount)}
                </strong>
              </div>
              <div style={{ padding: '8px 0', border: 'none' }}>
                <p style={{ margin: 0, color: '#6b7280' }}>
                  Gross Price (Total)
                </p>
                <strong style={{ fontSize: '1.4em', color: '#047857' }}>
                  {formatINR(grossPrice)}
                </strong>
              </div>
            </div>
          </aside>
        </div>

        {/* RESULTS: full width below split - REFINED STYLING */}
        <div className="emi-results-full" style={{ marginTop: 24 }}>
          <div
            className="result-grid emi-summary-strip"
            style={{
              backgroundColor: '#ecf9e8', // Pale blue background
              padding: '16px',
              borderRadius: '10px',
              border: '1px solid #c8d9c3', // Light blue border
            }}
          >
            {/* Primary Result: GST Amount */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                boxShadow:
                  '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)', // Lifted shadow
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Tax">
                  💸
                </span>{' '}
                Total GST Amount
              </p>
              <p
                className="result-primary"
                style={{
                  fontSize: '24px',
                  fontWeight: 800,
                  color: '#dc2626', // Red for tax liability
                }}
              >
                {formatINR(gstAmount)}
              </p>
            </div>

            {/* Secondary Result: CGST (Central) */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Central Tax">
                  🏛️
                </span>{' '}
                CGST ({gstRatePct / 2}%)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(cgstAmount)}
              </p>
            </div>

            {/* Secondary Result: SGST/IGST (State/Integrated) */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="State Tax">
                  🏙️
                </span>{' '}
                SGST/IGST ({gstRatePct / 2}%)
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#1f2937' }}
              >
                {formatINR(sgstAmount)}
              </p>
            </div>

            {/* Secondary Result: Final Gross Price */}
            <div
              className="result-card"
              style={{
                padding: '10px',
                border: 'none',
                textAlign: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '8px',
              }}
            >
              <p
                className="result-label"
                style={{ fontSize: '14px', color: '#6b7280' }}
              >
                <span role="img" aria-label="Final Price">
                  💵
                </span>{' '}
                Final Gross Price
              </p>
              <p
                className="result-value"
                style={{ fontSize: '20px', fontWeight: 700, color: '#047857' }}
              >
                {formatINR(grossPrice)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEO Content Starts Here --- */}
      <div className="content-for-seo" style={{ marginTop: 20 }}>
        {/* 1. Brief about the program */}
        <section>
          <h2 id="about-gst">🌟 What is Goods and Services Tax (GST)?</h2>
          <p>
            The **Goods and Services Tax (GST)** is a comprehensive,
            multi-stage, destination-based tax levied on every value addition.
            It was implemented in India in July 2017, consolidating multiple
            indirect taxes (like VAT, excise duty, and service tax) into a
            single tax. This unified structure is designed to simplify tax
            compliance and reduce the cascading effect of taxes (tax on tax).
          </p>
          <p>
            GST operates under the principle of **Input Tax Credit (ITC)**,
            allowing registered businesses to claim credit for GST paid on
            purchases, ultimately reducing their final tax liability.
          </p>
        </section>

        {/* 2. Who can use this */}
        <section>
          <h2 id="who-can-use">🎯 Who Uses the GST Calculator?</h2>
          <p>
            The GST calculator is a versatile tool for various stakeholders in
            the Indian economy:
          </p>
          <ul>
            <li>
              **Registered Businesses:** To quickly determine the final price of
              products or services for billing customers (Add GST mode).
            </li>
            <li>
              **Consumers:** To check the tax component included in the final
              retail price (Remove GST mode).
            </li>
            <li>
              **Accountants & Tax Professionals:** To verify invoices, calculate
              Input Tax Credit (ITC), and estimate liabilities.
            </li>
            <li>
              **E-commerce Sellers:** To correctly list prices and manage tax
              compliance across state borders.
            </li>
          </ul>
        </section>

        {/* 3. How can the GST Calculator help you? */}
        <section>
          <h2 id="how-gst-helps">💡 How This Calculator Streamlines Pricing</h2>
          <p>
            Accuracy in pricing is crucial for compliance and business profit.
            This calculator helps:
          </p>
          <ul>
            <li>
              **Reverse Calculation:** Easily determine the Net Price of a
              product when only the Gross (MRP) price is known (Remove GST).
            </li>
            <li>
              **Forward Calculation:** Instantly calculate the GST amount and
              the final Gross Price when pricing a product (Add GST).
            </li>
            <li>
              **Tax Component Breakdown:** Clearly separates the total GST into
              its two components: Central GST (CGST) and State GST (SGST/IGST).
            </li>
            <li>
              **Error Prevention:** Eliminates manual errors common in complex
              percentage calculations, ensuring correct billing.
            </li>
          </ul>
        </section>

        {/* 4. How does the GST calculation work? */}
        <section>
          <h2 id="how-gst-works">⚙️ GST Calculation Logic and Formulas</h2>

          <h3>GST Rate Slabs</h3>
          <p>
            Most goods and services fall into four major tax rate slabs: 5%,
            12%, 18%, and 28%.
          </p>

          <h4>Formula for Adding GST (Forward Calculation):</h4>
          <p>
            To find the Gross Price (Price including GST) when the Net Price (P
            <sub>net</sub>) and Rate (r) are known:
          </p>
          <div
            style={{
              fontFamily: 'monospace',
              backgroundColor: '#eef2ff',
              padding: '8px',
              margin: '5px 0',
              borderRadius: '4px',
            }}
          >
            GST Amount = Net Price &times; (GST Rate / 100)
            <br />
            Gross Price = Net Price + GST Amount
          </div>

          <h4>Formula for Removing GST (Reverse Calculation):</h4>
          <p>
            To find the Net Price (P<sub>net</sub>) when the Gross Price (P
            <sub>gross</sub>) and Rate (r) are known:
          </p>
          <div
            style={{
              fontFamily: 'monospace',
              backgroundColor: '#eef2ff',
              padding: '8px',
              margin: '5px 0',
              borderRadius: '4px',
            }}
          >
            Net Price = Gross Price / (1 + GST Rate / 100)
            <br />
            GST Amount = Gross Price - Net Price
          </div>
        </section>

        {/* 5. Advantage */}
        <section>
          <h2 id="gst-advantages">✅ Key Advantages of GST</h2>
          <p>
            GST brought transformative changes to the Indian indirect tax
            landscape:
          </p>
          <div className="advantage-grid">
            <div className="advantage-card">
              <h3>Input Tax Credit (ITC)</h3>
              <p>
                Eliminated the cascading effect of taxes by allowing businesses
                to offset the tax paid on raw materials/inputs against their
                final output tax liability.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Uniform Tax Structure</h3>
              <p>
                Created a single national market by replacing multiple state and
                central taxes with one unified rate.
              </p>
            </div>
            <div className="advantage-card">
              <h3>Simplified Compliance</h3>
              <p>
                Reduced the burden of filing multiple returns, allowing
                businesses to file one consolidated return (GSTR-3B).
              </p>
            </div>
            <div className="advantage-card">
              <h3>Increased Transparency</h3>
              <p>
                The entire tax process, from invoice matching to return filing,
                is automated and digitized, improving accountability.
              </p>
            </div>
          </div>
        </section>

        {/* 6. FAQ's */}
        <section>
          <h2 id="gst-faqs">❓ Frequently Asked Questions (FAQs) about GST</h2>
          <div
            className="faqs-accordion"
            style={{
              display: 'grid',
              gap: '10px',
            }}
          >
            <details
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0 15px',
                backgroundColor: '#ffffff',
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  padding: '15px 0',
                  cursor: 'pointer',
                  outline: 'none',
                  color: '#1f2937',
                }}
              >
                What are CGST, SGST, and IGST?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                **CGST** (Central GST) and **SGST** (State GST) are levied on
                intra-state (within the same state) transactions. **IGST**
                (Integrated GST) is levied on inter-state (between states)
                transactions and imports. Our calculator shows the CGST/SGST
                split for clarity.
              </p>
            </details>
            <details
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0 15px',
                backgroundColor: '#ffffff',
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  padding: '15px 0',
                  cursor: 'pointer',
                  outline: 'none',
                  color: '#1f2937',
                }}
              >
                Is GST applicable on all transactions?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                GST is levied on the supply of most goods and services. However,
                certain essential items (like basic food grains, non-GST
                products like alcoholic liquor, and petroleum products) are
                either exempt or fall outside the purview of GST.
              </p>
            </details>
            <details
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '0 15px',
                backgroundColor: '#ffffff',
              }}
            >
              <summary
                style={{
                  fontWeight: 600,
                  padding: '15px 0',
                  cursor: 'pointer',
                  outline: 'none',
                  color: '#1f2937',
                }}
              >
                What is the HSN Code?
              </summary>
              <p
                style={{
                  padding: '10px 0 15px 0',
                  borderTop: '1px dashed #e5e7eb',
                  margin: 0,
                  color: '#6b7280',
                }}
              >
                **HSN (Harmonized System of Nomenclature)** codes are used for
                classifying goods globally. Similarly, **SAC (Services
                Accounting Code)** codes are used for services. These codes
                determine the specific GST rate applicable to a product or
                service.
              </p>
            </details>
          </div>
        </section>
      </div>

      {/* Optional button section below SEO content */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="primary-cta" onClick={handleGstComplianceClick}>
          Learn More About GST Compliance
        </button>
        <button
          onClick={() => {
            const summary = `GST ${gstRatePct}% on ${formatINR(
              basePrice
            )} (${calculationMode}) => GST: ${formatINR(
              gstAmount
            )}, Gross: ${formatINR(grossPrice)}`;
            navigator.clipboard?.writeText(summary);
            alert('Summary copied to clipboard');
          }}
        >
          Copy Summary
        </button>
      </div>
    </section>
  );
}

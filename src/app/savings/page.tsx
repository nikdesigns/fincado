import type { Metadata } from 'next';
import React from 'react';
import SavingsClient from './SavingsClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title: 'Savings Calculator – Monthly Savings & Goal Planner',
  description:
    'Calculate how much you need to save monthly to reach your goals. Plan your emergency fund and check the future value of your savings adjusted for inflation.',
  keywords: [
    'Savings Calculator',
    'Goal Planner India',
    'Emergency Fund Calculator',
    'Recurring Deposit Calculator',
    'Monthly Savings Calculator',
    'Inflation Adjusted Savings'
  ],
  alternates: {
    canonical: 'https://fincado.com/savings/',
  },
  openGraph: {
    title: 'Savings Calculator – Plan Your Goals & Emergency Fund',
    description:
      'Visualize the growth of your monthly savings and plan for financial security.',
    url: 'https://fincado.com/savings/',
    type: 'website',
  },
};

export default function SavingsCalculatorPage() {
  return (
    <>
      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How much should I keep in my emergency fund?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It is recommended to keep 6 to 12 months of your monthly expenses (or net salary) in an emergency fund. This ensures you can cover essential costs during job loss or medical emergencies.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does this calculator account for inflation?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our savings calculator shows both the Nominal Value (actual amount) and the Real Value (purchasing power) based on the inflation rate you enter.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where should I park my savings?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For emergency funds and short-term goals, choose safe options like High-Yield Savings Accounts, Fixed Deposits (FDs), or Liquid Mutual Funds. Avoid volatile assets like equity.',
                },
              }
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/' },
            { name: 'Calculators', url: 'https://fincado.com/calculators/' },
            {
              name: 'Savings Calculator',
              url: 'https://fincado.com/savings/',
            }
          ]}
        />

        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <h1>Savings Calculator — Goal Planner & Emergency Fund</h1>
          <WikiText
            content={`
            <p style="max-width: 700px; color: var(--color-text-muted);">
              Plan your financial goals, calculate required monthly savings, and build 
              a robust emergency fund. <strong>Simple. Inflation-Adjusted. Free.</strong>
            </p>
          `}
          />
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR APP */}
            <SavingsClient />

            <div style={{ margin: '40px 0' }} className="no-print">
              <AdSlot id="savings-mid-content" type="leaderboard" />
            </div>

            {/* --- SEO CONTENT --- */}
            <article className="article content-for-seo no-print">
              <h2>How to Use This Savings Calculator</h2>
              <WikiText
                content={`
                  <p>
                    This tool is designed to answer three critical questions for any saver:
                  </p>
                  <ol>
                    <li><strong>Growth:</strong> How much will my monthly savings grow to over time?</li>
                    <li><strong>Goal Planning:</strong> How much do I need to save per month to buy a house/car in 5 years?</li>
                    <li><strong>Safety:</strong> How big should my emergency fund be?</li>
                  </ol>
                `}
              />

              <h3>1. General Savings Growth</h3>
              <WikiText
                content={`
                  <p>
                    Enter your <strong>Monthly Savings</strong> amount and the expected <strong>Interest Rate</strong> 
                    (typically 3-7% for savings accounts/FDs). The calculator uses compound interest logic (similar to a Recurring Deposit) 
                    to show you the total maturity value.
                  </p>
                `}
              />

              <h3>2. Inflation Reality Check</h3>
              <WikiText
                content={`
                  <p>
                    Saving ₹10 Lakhs in 10 years sounds great, but inflation reduces its value. 
                    Check the <strong>"Purchasing Power"</strong> badge in the results. This shows you 
                    what that future money is worth in <em>today's terms</em>.
                  </p>
                `}
              />

              <h3>3. Emergency Fund Planning</h3>
              <WikiText
                content={`
                  <p>
                    Open the <strong>"Goal Planning & Emergency Fund"</strong> section. Enter your 
                    <strong>Net Monthly Salary</strong> and choose how many months of coverage you need (usually 6 months). 
                    The calculator will give you a specific target corpus to aim for.
                  </p>
                `}
              />

              <h2>Frequently Asked Questions (FAQs)</h2>
              <div className="faqs-accordion">
                <details open>
                  <summary>What is the 50/30/20 rule?</summary>
                  <p>
                    It is a popular budgeting rule where you allocate 50% of
                    income to Needs, 30% to Wants, and{' '}
                    <strong>20% to Savings</strong> and debt repayment.
                  </p>
                </details>
                <details>
                  <summary>Should I invest or save?</summary>
                  <p>
                    <strong>Save</strong> for short-term goals (under 3 years)
                    and emergencies using FDs or Liquid Funds.
                    <strong>Invest</strong> for long-term goals (5+ years) using
                    Mutual Funds or Stocks to beat inflation.
                  </p>
                </details>
                <details>
                  <summary>How is this different from SIP?</summary>
                  <p>
                    Functionally, the math is similar. However, this calculator
                    is optimized for
                    <strong>savers</strong> (lower risk, lower returns,
                    guaranteed goals) rather than
                    <strong>investors</strong> (market volatility, wealth
                    creation).
                  </p>
                </details>
              </div>
            </article>

            <AuthorBio />
          </div>

          {/* SIDEBAR */}
          <aside className="sidebar no-print">
            <FinancialNavWidget />
            <div style={{ marginTop: 24 }}>
              <AdSlot id="savings-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

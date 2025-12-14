'use client';

import React from 'react';
import { BANK_RATES } from '@/data/live-rates'; // Importing your existing data

type Props = {
  type: 'homeLoan' | 'personalLoan' | 'carLoan';
};

export default function LiveRateTable({ type }: Props) {
  // Map internal keys to display labels
  const typeLabel = {
    homeLoan: 'Home Loan',
    personalLoan: 'Personal Loan',
    carLoan: 'Car Loan',
  };

  const getBankName = (code: string) => {
    const names: Record<string, string> = {
      sbi: 'SBI (State Bank of India)',
      hdfc: 'HDFC Bank',
      icici: 'ICICI Bank',
      axis: 'Axis Bank',
      kotak: 'Kotak Mahindra',
    };
    return names[code] || code.toUpperCase();
  };

  const getBankLogo = (code: string) => {
    // Simple fallback if you don't have SVGs yet
    // You can replace these with <img src={`/banks/${code}.svg`} /> later
    return <span className="bank-avatar">{code[0].toUpperCase()}</span>;
  };

  return (
    <div
      className="card"
      style={{ padding: 0, overflow: 'hidden', marginTop: 40 }}
    >
      <div
        style={{
          padding: '20px 24px',
          borderBottom: '1px solid #e2e8f0',
          background: '#f8fafc',
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          📉 Current {typeLabel[type]} Interest Rates
          <span
            style={{
              fontSize: '11px',
              background: '#dcfce7',
              color: '#166534',
              padding: '2px 8px',
              borderRadius: '12px',
              border: '1px solid #bbf7d0',
            }}
          >
            Live
          </span>
        </h3>
        <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
          Interest rates updated on{' '}
          {new Date().toLocaleDateString('en-IN', {
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>

      <div
        className="schedule-wrapper"
        style={{
          maxHeight: 'none',
          border: 'none',
          margin: 0,
          borderRadius: 0,
        }}
      >
        <table className="rate-table">
          <thead>
            <tr>
              <th style={{ paddingLeft: 24 }}>Bank</th>
              <th>Interest Rate (p.a)</th>
              <th>Processing Fee</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {BANK_RATES.map((bank, index) => (
              <tr key={index}>
                <td
                  style={{
                    paddingLeft: 24,
                    fontWeight: 600,
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                  }}
                >
                  {getBankLogo(bank.bank)}
                  {getBankName(bank.bank)}
                </td>
                <td style={{ fontWeight: 700, color: '#16a34a' }}>
                  {bank[type]}% Onwards
                </td>
                <td style={{ fontSize: '13px', color: '#64748b' }}>
                  0.5% - 1.0%
                </td>
                <td>
                  <a
                    href={`/bank-emi/${bank.bank}`}
                    className="secondary-cta"
                    style={{
                      padding: '6px 12px',
                      fontSize: '12px',
                      minHeight: 'auto',
                    }}
                  >
                    Check EMI
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          padding: '12px 24px',
          background: '#fff',
          fontSize: '12px',
          color: '#94a3b8',
          borderTop: '1px solid #e2e8f0',
        }}
      >
        * Rates are indicative and subject to credit score and bank policy.
      </div>
    </div>
  );
}

import React from 'react';

type LoanType = 'homeLoan' | 'personalLoan' | 'carLoan' | 'educationLoan';

interface Props {
  type?: LoanType | string;
}

const LiveRateTable = ({ type = 'homeLoan' }: Props) => {
  // Define static data ranges (Easy to update once a year)
  const ranges = {
    homeLoan: {
      title: 'Home Loan Interest Rates 2025',
      data: [
        {
          category: 'Public Sector Banks',
          rate: '8.35% — 9.50%',
          fee: 'Low (Max ₹10k)',
        },
        {
          category: 'Private Sector Banks',
          rate: '8.75% — 10.50%',
          fee: 'Medium (0.5% - 1%)',
        },
        {
          category: 'HFCs (Housing Finance)',
          rate: '9.00% — 11.50%',
          fee: 'Medium (0.5% - 2%)',
        },
      ],
    },
    personalLoan: {
      title: 'Personal Loan Interest Rates 2025',
      data: [
        {
          category: 'PSU Banks (Salary Account)',
          rate: '10.50% — 13.00%',
          fee: '1% - 2%',
        },
        {
          category: 'Private Banks',
          rate: '10.99% — 16.00%',
          fee: '1.5% - 3%',
        },
        {
          category: 'NBFCs & Fintech Apps',
          rate: '14.00% — 24.00%',
          fee: '2% - 4%',
        },
      ],
    },
    carLoan: {
      title: 'Car Loan Interest Rates 2025',
      data: [
        {
          category: 'New Car (PSU Banks)',
          rate: '8.70% — 9.20%',
          fee: 'Zero or Low',
        },
        {
          category: 'New Car (Private Banks)',
          rate: '9.00% — 11.00%',
          fee: '0.5% - 1%',
        },
        { category: 'Used Car Loans', rate: '12.00% — 18.00%', fee: '1% - 2%' },
      ],
    },
    educationLoan: {
      // Fallback for other types
      title: 'Education Loan Rates 2025',
      data: [
        {
          category: 'Public Banks (India)',
          rate: '9.00% — 11.00%',
          fee: 'Nil',
        },
        {
          category: 'Study Abroad (Secured)',
          rate: '10.00% — 12.50%',
          fee: '0.5% - 1%',
        },
        {
          category: 'Unsecured Loans',
          rate: '11.50% — 14.00%',
          fee: '1% - 2%',
        },
      ],
    },
  };

  // Select data based on prop, fallback to homeLoan if type doesn't exist
  const selected = ranges[type as keyof typeof ranges] || ranges.homeLoan;

  return (
    <div style={{ marginTop: '24px', marginBottom: '32px' }}>
      {/* Title Header */}
      <h3
        style={{
          fontSize: '16px',
          marginBottom: '12px',
          color: 'var(--color-text-main)',
          fontWeight: 600,
        }}
      >
        {selected.title}
      </h3>

      {/* Table Wrapper (Uses your existing CSS class) */}
      <div className="schedule-wrapper">
        <table className="rate-table">
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Lender Category</th>
              <th style={{ width: '30%' }}>Interest Rate (p.a.)</th>
              <th style={{ width: '30%' }}>Processing Fee</th>
            </tr>
          </thead>
          <tbody>
            {selected.data.map((row, index) => (
              <tr key={index}>
                <td style={{ fontWeight: 500 }}>{row.category}</td>
                <td
                  style={{ color: 'var(--color-brand-green)', fontWeight: 600 }}
                >
                  {row.rate}
                </td>
                <td>{row.fee}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Disclaimer / Note */}
      <div
        style={{
          marginTop: '12px',
          padding: '12px',
          background: 'var(--color-bg-soft)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          fontSize: '13px',
          color: 'var(--color-text-muted)',
        }}
      >
        <strong>Note:</strong> Rates mentioned above are indicative market
        ranges for borrowers with a Credit Score &gt; 750. Actual rates may vary
        based on your profile.
      </div>
    </div>
  );
};

export default LiveRateTable;

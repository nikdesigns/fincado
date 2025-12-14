// src/components/AuthorBio.tsx
import React from 'react';

export default function AuthorBio() {
  return (
    <div
      className="author-bio no-print"
      style={{
        marginTop: '40px',
        padding: '24px',
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div style={{ flexShrink: 0 }}>
        {/* Placeholder Avatar - Replace with real image later if needed */}
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: '#f1f5f9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px',
          }}
        >
          👨‍💻
        </div>
      </div>

      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '6px',
          }}
        >
          <span
            style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              background: '#dcfce7',
              color: '#166534',
              padding: '2px 8px',
              borderRadius: '10px',
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            Fact Checked
          </span>
          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
            • Last Updated: Jan 2025
          </span>
        </div>

        <h4
          style={{
            margin: '0 0 4px',
            fontSize: '17px',
            color: '#0f172a',
            fontWeight: 700,
          }}
        >
          Fincado Research Team
        </h4>

        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#475569',
            lineHeight: '1.5',
          }}
        >
          Our tools are built on the latest <strong>RBI Guidelines</strong> and{' '}
          <strong>Income Tax Act (FY 2024-25)</strong> rules. Verified by
          certified financial planners to ensure bank-grade accuracy.
        </p>
      </div>
    </div>
  );
}

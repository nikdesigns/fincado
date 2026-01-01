'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

export default function TaxRegimeWidget() {
  const pathname = usePathname();

  const salaries = [
    {
      label: '₹8 Lakh Salary',
      url: '/guides/tax-on-8-lakh-salary',
      badge: 'Trap',
      badgeColor: '#fff7ed',
      badgeText: '#c2410c',
    },
    { label: '₹10 Lakh Salary', url: '/guides/tax-on-10-lakh-salary' },
    { label: '₹12 Lakh Salary', url: '/guides/tax-on-12-lakh-salary' },
    { label: '₹15 Lakh Salary', url: '/guides/tax-on-15-lakh-salary' },
    { label: '₹20 Lakh Salary', url: '/guides/tax-on-20-lakh-salary' },
    {
      label: '₹25 Lakh Salary',
      url: '/guides/tax-on-25-lakh-salary',
      badge: 'High',
      badgeColor: '#eff6ff',
      badgeText: '#1e40af',
    },
  ];

  return (
    <nav className="tax-sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Salary Tax Hub</h3>

        <ul className="sidebar-list">
          {salaries.map((item) => {
            const isActive = pathname === item.url;
            return (
              <li key={item.url}>
                <Link
                  href={item.url}
                  className={`salary-link ${isActive ? 'active' : ''}`}
                >
                  <span className="icon">⚡</span>
                  <span className="label-text">{item.label}</span>

                  {item.badge && (
                    <span
                      className="badge"
                      style={{
                        backgroundColor: item.badgeColor,
                        color: item.badgeText,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="view-all-wrap">
          <Link
            href="/guides/new-vs-old-tax-regime-2025"
            className="view-all-link"
          >
            Understand New vs Old Tax Regime →
          </Link>
        </div>
      </div>

      <style jsx>{`
        .tax-sidebar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
        }

        .sidebar-section {
          padding: 24px 20px;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 20px;
          border-bottom: 2px solid #22c55e;
          display: inline-block;
          padding-bottom: 4px;
        }

        .sidebar-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar-list li {
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px dashed #cbd5e1;
        }

        .sidebar-list li:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        /* FLEXBOX FIXES START HERE */
        .salary-link {
          display: flex;
          align-items: center;
          gap: 12px; /* Consistent spacing */
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.2s ease;
          width: 100%; /* Ensure it takes full width */
        }

        .salary-link:hover,
        .salary-link.active {
          color: #16a34a;
          transform: translateX(4px);
        }

        .icon {
          font-size: 16px;
          line-height: 1;
          flex-shrink: 0; /* Prevents icon from getting squashed */
        }

        .label-text {
          white-space: nowrap; /* Prevents text from breaking */
        }

        .badge {
          font-size: 9px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          line-height: 1;
          white-space: nowrap; /* Ensures badge stays on one line */
          flex-shrink: 0; /* Prevents badge from shrinking */
          margin-left: auto; /* Pushes badge to the right edge (Optional - remove this line to keep it next to text) */
        }

        .view-all-wrap {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .view-all-link {
          font-size: 14px;
          color: #16a34a;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          padding: 6px 12px;
          background: #fff;
          border: 1px solid #bbf7d0;
          border-radius: 6px;
          transition: all 0.2s;
        }

        .view-all-link:hover {
          background: #f0fdf4;
        }
      `}</style>
    </nav>
  );
}

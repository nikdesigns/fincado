'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TaxRegimeWidget() {
  const pathname = usePathname();
  const [showAll, setShowAll] = useState(false);

  const salaries = [
    {
      label: '₹6 Lakh Salary',
      url: '/guides/tax-on-6-lakh-salary',
      badge: 'Zero Tax',
      badgeColor: '#ecfccb',
      badgeText: '#3f6212',
    },
    {
      label: '₹7.5 Lakh Salary',
      url: '/guides/tax-on-7-5-lakh-salary',
      badge: 'Zero Tax',
      badgeColor: '#ecfccb',
      badgeText: '#3f6212',
    },
    {
      label: '₹8 Lakh Salary',
      url: '/guides/tax-on-8-lakh-salary',
      badge: 'Trap',
      badgeColor: '#fff7ed',
      badgeText: '#c2410c',
    },
    { label: '₹9 Lakh Salary', url: '/guides/tax-on-9-lakh-salary' },
    { label: '₹10 Lakh Salary', url: '/guides/tax-on-10-lakh-salary' },
    { label: '₹12 Lakh Salary', url: '/guides/tax-on-12-lakh-salary' },
    { label: '₹15 Lakh Salary', url: '/guides/tax-on-15-lakh-salary' },
    { label: '₹20 Lakh Salary', url: '/guides/tax-on-20-lakh-salary' },
    // Hidden by default items (Intermediate & High steps)
    { label: '₹11 Lakh Salary', url: '/guides/tax-on-11-lakh-salary' },
    { label: '₹14 Lakh Salary', url: '/guides/tax-on-14-lakh-salary' },
    { label: '₹16 Lakh Salary', url: '/guides/tax-on-16-lakh-salary' },
    { label: '₹18 Lakh Salary', url: '/guides/tax-on-18-lakh-salary' },
    {
      label: '₹25 Lakh Salary',
      url: '/guides/tax-on-25-lakh-salary',
      badge: 'High',
      badgeColor: '#eff6ff',
      badgeText: '#1e40af',
    },
    {
      label: '₹30 Lakh Salary',
      url: '/guides/tax-on-30-lakh-salary',
      badge: 'High',
      badgeColor: '#eff6ff',
      badgeText: '#1e40af',
    },
  ];

  // Show first 8 items, or all if expanded
  const visibleSalaries = showAll ? salaries : salaries.slice(0, 8);

  return (
    <nav className="tax-sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-title">Salary Tax Hub</h3>

        <ul className="sidebar-list">
          {visibleSalaries.map((item) => {
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

        {/* Toggle Button */}
        <button onClick={() => setShowAll(!showAll)} className="show-more-btn">
          {showAll ? 'Show Less' : `Show All (${salaries.length})`}
        </button>

        <div className="view-all-wrap">
          <Link
            href="/guides/new-vs-old-tax-regime-2025"
            className="view-all-link"
          >
            New vs Old Tax Regime Guide →
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
          padding: 20px;
        }

        .sidebar-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 16px;
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
          margin-bottom: 8px;
          padding-bottom: 8px;
          border-bottom: 1px dashed #cbd5e1;
        }

        .sidebar-list li:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }

        .salary-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #334155;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.2s ease;
          width: 100%;
        }

        .salary-link:hover,
        .salary-link.active {
          color: #16a34a;
          transform: translateX(4px);
        }

        .icon {
          font-size: 14px;
          line-height: 1;
        }

        .badge {
          font-size: 9px;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 100px;
          text-transform: uppercase;
          margin-left: auto;
        }

        /* NEW: Show More Button Styling */
        .show-more-btn {
          width: 100%;
          margin-top: 12px;
          background: transparent;
          border: 1px dashed #94a3b8;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .show-more-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
          border-color: #64748b;
        }

        .view-all-wrap {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #e2e8f0;
          text-align: center;
        }

        .view-all-link {
          font-size: 13px;
          color: #16a34a;
          font-weight: 700;
          text-decoration: none;
          display: block;
          padding: 8px 12px;
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

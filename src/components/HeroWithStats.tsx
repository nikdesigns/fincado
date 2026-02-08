// src/components/HeroWithStats.tsx
'use client';
import React from 'react';

export default function HeroWithStats({
  imageSrc,
  imageAlt = 'Fincado users',
  eyebrow,
  title = 'Smart Financial Calculators & Loan Tools for India',
}: {
  imageSrc: string;
  imageAlt?: string;
  eyebrow?: string;
  title?: string;
}) {
  const stats = [
    { value: '10+', label: 'Tools' },
    { value: '5,000+', label: 'Monthly Users' },
    { value: '₹500 Cr+', label: 'EMIs Calculated' },
    { value: '100%', label: 'Free & Secure' }
  ];

  return (
    <section className="hero-stats-block" aria-label="Fincado site stats">
      <div className="hero-stats-inner container">
        <div className="hero-left">
          <div className="image-wrap" aria-hidden>
            <img src={imageSrc} alt={imageAlt} className="hero-photo" />
          </div>
        </div>

        <div className="hero-right">
          {eyebrow && <p className="hero-eyebrow">{eyebrow}</p>}
          <h2 className="hero-stats-title">{title}</h2>

          {/* Semantic dl for accessibility: term = value, description = label */}
          <dl className="stats-grid" role="list">
            {stats.map((s, i) => (
              <div className="stat-item" role="listitem" key={i}>
                <dt className="stat-value">{s.value}</dt>
                <dd className="stat-label">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

// src/components/HeroWithStats.tsx
import React from 'react';
import Image from 'next/image';

type Stat = {
  value: string;
  label: string;
};

type Props = {
  imageSrc?: string; // Optional
  imageAlt?: string; // Optional
  eyebrow: string;
  title: string;
  stats: Stat[];
};

export default function HeroWithStats({
  imageSrc,
  imageAlt,
  eyebrow,
  title,
  stats,
}: Props) {
  return (
    <section className="card" style={{ padding: '40px', margin: '40px 0' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: imageSrc
            ? 'repeat(auto-fit, minmax(300px, 1fr))'
            : '1fr',
          gap: '40px',
          alignItems: 'center',
          textAlign: imageSrc ? 'left' : 'center',
        }}
      >
        {/* Render Image only if provided */}
        {imageSrc && (
          <div
            style={{
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            <Image
              src={imageSrc}
              alt={imageAlt || 'Hero Image'}
              width={500}
              height={350}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        {/* Content */}
        <div>
          <span
            style={{
              color: 'var(--color-brand-green)',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '12px',
            }}
          >
            {eyebrow}
          </span>

          <h2
            style={{
              fontSize: '28px',
              margin: '12px 0 24px',
              color: '#0b1720',
            }}
          >
            {title}
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              gap: '16px',
              maxWidth: imageSrc ? '100%' : '600px', // Constrain width if centered
              margin: imageSrc ? '0' : '0 auto',
            }}
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 800,
                    color: '#0b1720',
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

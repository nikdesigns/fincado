// src/components/AdUnit.tsx
import React from 'react';

type AdProps = {
  label?: string;
  className?: string;
};

export default function AdUnit({
  label = 'Advertisement',
  className = '',
}: AdProps) {
  return (
    <div className={`ad-box ${className}`} aria-label={label}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            opacity: 0.5,
            marginBottom: '4px',
          }}
        >
          {label}
        </span>
        <div
          style={{
            background: 'rgba(0,0,0,0.03)',
            width: '100%',
            height: '100%',
            minHeight: '60px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '13px',
          }}
        >
          {/* GOOGLE ADSENSE CODE WILL GO HERE LATER */}
          Ad Slot
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const consent = localStorage.getItem('fincado_cookie_consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('fincado_cookie_consent', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#0f172a',
        color: '#fff',
        padding: '16px',
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        flexWrap: 'wrap',
        boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.1)',
        borderTop: '1px solid #334155',
      }}
      className="no-print"
    >
      <p
        style={{
          margin: 0,
          fontSize: '14px',
          maxWidth: '600px',
          lineHeight: '1.5',
          color: 'white',
        }}
      >
        We use cookies to personalize content and ads to provide you with a
        better experience. By using our site, you accept our{' '}
        <a
          href="/privacy-policy"
          style={{ color: '#4ade80', textDecoration: 'underline' }}
        >
          Privacy Policy
        </a>
        .
      </p>
      <button
        onClick={accept}
        style={{
          background: '#15803d',
          color: 'white',
          border: 'none',
          padding: '8px 24px',
          borderRadius: '6px',
          fontWeight: 600,
          cursor: 'pointer',
          fontSize: '14px',
          whiteSpace: 'nowrap',
        }}
      >
        Accept & Close
      </button>
    </div>
  );
}

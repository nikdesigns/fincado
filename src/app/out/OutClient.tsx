'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OutClient() {
  const params = useSearchParams();
  const target = params.get('to') || '/';

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'outbound_click', {
        destination: target,
      });
    }

    const timer = setTimeout(() => {
      window.location.href = target;
    }, 400);

    return () => clearTimeout(timer);
  }, [target]);

  return (
    <main style={{ padding: '80px 20px', textAlign: 'center' }}>
      <h1>Redirecting…</h1>
      <p>Please wait while we take you to the lender website.</p>
    </main>
  );
}

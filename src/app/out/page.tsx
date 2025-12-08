'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OutRedirect() {
  const params = useSearchParams();
  const target = params.get('to') || '/';

  useEffect(() => {
    // ✅ GA4 outbound tracking (future safe)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'outbound_click', {
        destination: target,
      });
    }

    // ✅ Redirect after small delay for tracking
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

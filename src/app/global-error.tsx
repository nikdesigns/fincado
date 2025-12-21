'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          textAlign: 'center',
          padding: '40px',
        }}
      >
        <h2>Critical Error</h2>
        <p>The entire application crashed. Please refresh.</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}

'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service (or console for now)
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="error-container">
      <div className="error-content">
        {/* Icon */}
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>

        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#1e293b',
          }}
        >
          Something went wrong!
        </h2>

        <p
          style={{ marginBottom: '32px', color: '#64748b', lineHeight: '1.6' }}
        >
          We apologize for the inconvenience. An unexpected error occurred while
          loading this page.
        </p>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {/* Retry Button: Attempts to re-render the segment */}
          <button onClick={() => reset()} className="action-button primary">
            Try Again
          </button>

          {/* Home Button: Safe fallback */}
          <Link href="/" className="action-button secondary">
            Go to Homepage
          </Link>
        </div>

        {/* Technical Error Digest (Optional: visible only in dev or if you want users to report codes) */}
        {error.digest && (
          <p
            style={{
              marginTop: '24px',
              fontSize: '12px',
              color: '#94a3b8',
              fontFamily: 'monospace',
            }}
          >
            Error Ref: {error.digest}
          </p>
        )}
      </div>

      <style jsx>{`
        .error-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 70vh;
          padding: 20px;
          background-color: #f8fafc;
        }
        .error-content {
          background: #fff;
          padding: 48px 32px;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
          max-width: 480px;
          width: 100%;
          text-align: center;
        }
        .action-button {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .primary {
          background: #2563eb;
          color: white;
          border: none;
          box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
        }
        .primary:hover {
          background: #1d4ed8;
          transform: translateY(-1px);
        }
        .secondary {
          background: white;
          color: #475569;
          border: 1px solid #cbd5e1;
        }
        .secondary:hover {
          background: #f1f5f9;
          color: #1e293b;
          border-color: #94a3b8;
        }
      `}</style>
    </div>
  );
}

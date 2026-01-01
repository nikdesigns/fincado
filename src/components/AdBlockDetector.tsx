'use client';

import { useState } from 'react';
import { useAdBlocker } from '@/hooks/useAdBlocker';

export default function AdBlockDetector() {
  const isAdBlockEnabled = useAdBlocker();
  const [isClosed, setIsClosed] = useState(false);

  // If no adblock detected OR user closed the popup, show nothing
  if (!isAdBlockEnabled || isClosed) return null;

  return (
    <div className="adblock-toast no-print">
      <div className="toast-content">
        <div className="icon-wrapper">❤️</div>
        <div className="text-content">
          <h3>Support Free Tools</h3>
          <p>
            We rely on ads to keep these premium calculators free for everyone.
            Please consider whitelisting <strong>Fincado</strong>.
          </p>
        </div>
        <button
          onClick={() => setIsClosed(true)}
          className="close-btn"
          aria-label="Dismiss"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <style jsx>{`
        .adblock-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 100%;
          max-width: 400px;
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .toast-content {
          background: #ffffff;
          border: 1px solid var(--color-border);
          border-left: 4px solid var(--color-brand-green); /* Brand Identity */
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.1);
          display: flex;
          gap: 16px;
          align-items: flex-start;
          position: relative;
        }

        .icon-wrapper {
          font-size: 24px;
          line-height: 1;
          flex-shrink: 0;
          padding-top: 2px;
        }

        .text-content {
          flex: 1;
          padding-right: 24px; /* Space for close button */
        }

        h3 {
          margin: 0 0 6px 0;
          font-size: 15px;
          font-weight: 700;
          color: var(--color-text-main);
        }

        p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: var(--color-text-muted);
        }

        strong {
          color: var(--color-brand-green);
          font-weight: 600;
        }

        .close-btn {
          position: absolute;
          top: 12px;
          right: 12px;
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .close-btn svg {
          width: 14px;
          height: 14px;
          stroke-width: 2.5;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 640px) {
          .adblock-toast {
            bottom: 20px;
            right: 20px;
            left: 20px;
            width: auto;
            max-width: none;
          }
        }
      `}</style>
    </div>
  );
}

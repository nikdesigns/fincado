'use client';

import { useState } from 'react';

type Vote = 'yes' | 'no' | null;

interface HelpfulWidgetProps {
  pageKey: string; // e.g. `bank-emi-sbi-mumbai`
  title?: string;
}

export default function HelpfulWidget({
  pageKey,
  title = 'Was this page helpful?',
}: HelpfulWidgetProps) {
  const [vote, setVote] = useState<Vote>(null);

  const handleVote = (value: 'yes' | 'no') => {
    setVote(value);

    try {
      localStorage.setItem(`helpful_vote_${pageKey}`, value);
    } catch {
      // ignore storage failures
    }

    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'helpful_vote', {
        page_key: pageKey,
        vote: value,
      });
    }
  };

  return (
    <section
      className="mt-8 rounded-xl border border-slate-200 bg-white p-4"
      aria-label="helpful-feedback"
    >
      <p className="text-sm font-semibold text-slate-900 mb-3">{title}</p>

      {!vote ? (
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleVote('yes')}
            className="px-3 py-1.5 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50 text-sm font-medium"
          >
            👍 Yes
          </button>
          <button
            type="button"
            onClick={() => handleVote('no')}
            className="px-3 py-1.5 rounded-md border border-rose-300 text-rose-700 hover:bg-rose-50 text-sm font-medium"
          >
            👎 No
          </button>
        </div>
      ) : (
        <p className="text-sm text-slate-600">Thanks for your feedback.</p>
      )}
    </section>
  );
}

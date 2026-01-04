'use client';

import React from 'react';
import { FaWhatsapp, FaLinkedin, FaPrint, FaCopy } from 'react-icons/fa';

export default function ShareTools({
  title,
  rightSlot,
}: {
  title: string;
  rightSlot?: React.ReactNode;
}) {
  const [copied, setCopied] = React.useState(false);

  const handlePrint = () => window.print();

  const handleShare = (platform: 'whatsapp' | 'linkedin') => {
    const url = window.location.href;
    const text = `Check out this ${title} on Fincado: ${url}`;

    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    }

    if (platform === 'linkedin') {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
        '_blank'
      );
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="no-print mb-4">
      <div
        className="
          flex
          items-center
          justify-between
          gap-3
          rounded-full
          border
          bg-white
          px-4
          py-2
          shadow-sm
        "
      >
        {/* LEFT: SHARE ACTIONS */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-slate-500">Share:</span>

          <button
            onClick={() => handleShare('whatsapp')}
            aria-label="Share on WhatsApp"
            className="rounded-full bg-emerald-50 p-2 text-emerald-600 hover:bg-emerald-100"
          >
            <FaWhatsapp size={16} />
          </button>

          <button
            onClick={() => handleShare('linkedin')}
            aria-label="Share on LinkedIn"
            className="rounded-full bg-sky-50 p-2 text-sky-600 hover:bg-sky-100"
          >
            <FaLinkedin size={16} />
          </button>

          <button
            onClick={handlePrint}
            aria-label="Print"
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <FaPrint size={14} />
          </button>

          <button
            onClick={copyLink}
            aria-label="Copy link"
            className="rounded-full bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
          >
            {copied ? 'Copied!' : <FaCopy size={14} />}
          </button>
        </div>

        {/* RIGHT: LANGUAGE TOGGLE */}
        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </div>
    </div>
  );
}

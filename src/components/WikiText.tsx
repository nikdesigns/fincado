/* ❌ DO NOT add 'use client' */

import React from 'react';

/* ---------------- HELPERS ---------------- */

// Deterministic keyword linker
const LINK_MAP: Record<string, string> = {
  EMI: '/emi-calculator',
  SIP: '/sip-calculator',
  FD: '/fd-calculator',
  RD: '/rd-calculator',
  CIBIL: '/credit-score',
  Credit: '/credit-score',
};

function linkKeywords(html: string): string {
  let output = html;

  Object.entries(LINK_MAP).forEach(([word, url]) => {
    const regex = new RegExp(`\\b${word}\\b`, 'g');
    output = output.replace(
      regex,
      `<a href="${url}" class="wiki-link">${word}</a>`
    );
  });

  return output;
}

/* ---------------- COMPONENT ---------------- */

export default function WikiText({
  content,
  className = '',
}: {
  content: string;
  className?: string;
}) {
  const linkedContent = linkKeywords(content);

  return (
    <div
      className={`wiki-content ${className}`}
      dangerouslySetInnerHTML={{ __html: linkedContent }}
    />
  );
}

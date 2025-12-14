// src/components/WikiText.tsx
import React from 'react';
import { autoLinkContent } from '@/lib/autoLink';

type Props = {
  content: string; // Accepts HTML string or plain text
  className?: string;
};

export default function WikiText({ content, className = '' }: Props) {
  // Process the content to inject links
  const linkedContent = autoLinkContent(content);

  return (
    <div
      className={`wiki-content ${className}`}
      dangerouslySetInnerHTML={{ __html: linkedContent }}
    />
  );
}

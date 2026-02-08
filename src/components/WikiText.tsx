'use client';

import React, { useMemo } from 'react';
import DOMPurify from 'isomorphic-dompurify';

interface WikiTextProps {
  content: string;
  className?: string;
}

/**
 * WikiText Component
 *
 * Sanitizes and renders HTML content safely using DOMPurify.
 * Supports rich text formatting with links, lists, headings, etc.
 *
 * @param content - Raw HTML string to sanitize and render
 * @param className - Optional additional CSS classes
 */
export default function WikiText({ content, className = '' }: WikiTextProps) {
  const sanitizedHTML = useMemo(() => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        'p',
        'br',
        'strong',
        'em',
        'u',
        'a',
        'ul',
        'ol',
        'li',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'blockquote',
        'code',
        'pre',
        'span',
        'div',
        'table',
        'thead',
        'tbody',
        'tr',
        'th',
        'td',
        'img'
      ],
      ALLOWED_ATTR: [
        'href',
        'target',
        'rel',
        'class',
        'id',
        'src',
        'alt',
        'title',
        'width',
        'height'
      ],
      ALLOWED_URI_REGEXP:
        /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
  }, [content]);

  return (
    <div
      className={`prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-900 prose-p:text-slate-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-slate-900 prose-strong:font-semibold prose-ul:list-disc prose-ol:list-decimal prose-li:text-slate-700 ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
    />
  );
}

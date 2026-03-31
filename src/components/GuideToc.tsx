'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9\u0900-\u097F\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function GuideToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');

  const collectHeadings = useCallback(() => {
    const scope =
      document.querySelector('.guide-body') ??
      document.querySelector('article') ??
      document.body;

    const headings = Array.from(
      scope.querySelectorAll<HTMLHeadingElement>('h2, h3'),
    );

    const nextItems: TocItem[] = headings
      .map((el) => {
        const level = Number(el.tagName.replace('H', '')) as 2 | 3;
        const text = el.textContent?.trim() || '';
        if (!text) return null;

        if (!el.id) el.id = slugify(text);

        return { id: el.id, text, level };
      })
      .filter(Boolean) as TocItem[];

    return nextItems;
  }, []);

  useEffect(() => {
    let observer: MutationObserver | null = null;
    let io: IntersectionObserver | null = null;
    let rafId = 0;

    const setup = () => {
      const nextItems = collectHeadings();

      // async setState avoids sync set-state-in-effect lint
      rafId = requestAnimationFrame(() => {
        setItems(nextItems);
      });

      // Re-bind intersection observer
      const scope =
        document.querySelector('.guide-body') ??
        document.querySelector('article') ??
        document.body;

      const headings = Array.from(
        scope.querySelectorAll<HTMLHeadingElement>('h2, h3'),
      );

      if (io) io.disconnect();
      io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );

          if (visible.length > 0) {
            setActiveId((visible[0].target as HTMLElement).id);
          }
        },
        {
          root: null,
          rootMargin: '-96px 0px -65% 0px',
          threshold: [0, 1],
        },
      );

      headings.forEach((h) => io?.observe(h));
    };

    // initial scan
    setup();

    // observe DOM changes (content loads after mount)
    const root =
      document.querySelector('.guide-body') ??
      document.querySelector('article') ??
      document.body;

    observer = new MutationObserver(() => {
      setup();
    });

    observer.observe(root, {
      childList: true,
      subtree: true,
    });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      io?.disconnect();
    };
  }, [pathname, collectHeadings]);

  const hasItems = useMemo(() => items.length > 0, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = 88;
    const y = el.getBoundingClientRect().top + window.scrollY - yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
    history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  if (!hasItems) {
    return (
      <p className="text-sm text-slate-500">
        Table of contents will appear when headings are available.
      </p>
    );
  }

  return (
    <nav aria-label="Table of contents">
      <ul className="space-y-1.5">
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={cn(
                  'block rounded-md px-2 py-1.5 text-sm transition-colors',
                  item.level === 3 && 'ml-3 text-[13px]',
                  isActive
                    ? 'bg-[#F7FDF1] text-[#577A30] font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50',
                )}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

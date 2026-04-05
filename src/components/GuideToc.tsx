'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { slugify } from '@/lib/slugify';

type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function uniqueId(base: string, used: Map<string, number>) {
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count === 0 ? base : `${base}-${count + 1}`;
}

export default function GuideToc() {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState('');
  const scannedRef = useRef(false);

  const getScope = useCallback(() => {
    return (
      document.querySelector('.guide-body') ||
      document.querySelector('article') ||
      document.querySelector('main') ||
      document.body
    );
  }, []);

  const collectHeadings = useCallback(() => {
    const scope = getScope();
    const nodes = Array.from(
      scope.querySelectorAll<HTMLHeadingElement>('h2, h3'),
    );

    const used = new Map<string, number>();
    const nextItems: TocItem[] = [];

    for (const el of nodes) {
      const text = (el.textContent || '').trim();
      if (!text) continue;

      let id = el.id?.trim();
      if (!id) {
        id = uniqueId(slugify(text) || 'section', used);
        el.id = id;
      } else {
        // normalize duplicate existing ids if any
        const count = used.get(id) ?? 0;
        used.set(id, count + 1);
        if (count > 0) {
          id = `${id}-${count + 1}`;
          el.id = id;
        }
      }

      // important for sticky header offset
      el.style.scrollMarginTop = '96px';

      const level = Number(el.tagName.replace('H', '')) as 2 | 3;
      nextItems.push({ id, text, level });
    }

    return nextItems;
  }, [getScope]);

  const scrollToHash = useCallback((hash: string) => {
    if (!hash) return;
    const id = decodeURIComponent(hash.replace(/^#/, ''));
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  }, []);

  const rebuildToc = useCallback(() => {
    const nextItems = collectHeadings();
    setItems(nextItems);
    scannedRef.current = nextItems.length > 0;

    // If current URL already has a hash, try to scroll after TOC is ready.
    if (nextItems.length > 0 && window.location.hash) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash);
      });
    }
  }, [collectHeadings, scrollToHash]);

  useEffect(() => {
    scannedRef.current = false;

    const root = getScope();

    // async -> avoids setState directly in effect body (eslint rule)
    const raf = requestAnimationFrame(() => rebuildToc());
    const t1 = window.setTimeout(() => {
      if (!scannedRef.current) rebuildToc();
    }, 250);

    const observer = new MutationObserver(() => rebuildToc());
    if (root) observer.observe(root, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      observer.disconnect();
    };
  }, [pathname, getScope, rebuildToc]);

  // react to manual hash changes too
  useEffect(() => {
    const onHashChange = () => scrollToHash(window.location.hash);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [scrollToHash]);

  // active heading tracking
  useEffect(() => {
    if (items.length === 0) return;

    const elements = items
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      {
        rootMargin: '-96px 0px -65% 0px',
        threshold: [0, 1],
      },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault(); // avoid instant jump; we do smooth scroll
    const el = document.getElementById(id);
    if (!el) return;

    // update URL hash
    window.history.replaceState(null, '', `#${id}`);

    // smooth scroll
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveId(id);
  };

  if (items.length === 0) {
    return (
      <p className="py-4 text-sm text-slate-500">
        Table of contents will appear here.
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
                  'block rounded-md px-3 py-2 text-sm transition-colors',
                  item.level === 3 && 'ml-4 text-[13px]',
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

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  path: string; // e.g. "/hi/some-page" or "/some-page"
}

export default function LanguageToggle({ path }: LanguageToggleProps) {
  const isHindi = path.startsWith('/hi');
  // Site uses trailingSlash: true — link straight to the final URL (no redirect hop)
  const href = path.endsWith('/') ? path : `${path}/`;

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="
        no-print
        inline-flex items-center gap-2
        rounded-full
        border-brand-400 bg-brand-50
        text-brand-700 font-semibold
        hover:bg-brand-200 hover:border-brand-400
        focus-visible:ring-2 focus-visible:ring-brand-400
        focus-visible:ring-offset-2
        transition-colors
      "
      aria-label={isHindi ? 'Switch to English' : 'हिंदी में पढ़ें'}
    >
      <Link href={href} className="flex items-center gap-2 px-1">
        {/* Flag */}
        <span className="text-base leading-none">{isHindi ? '🇮🇳' : '🇬🇧'}</span>

        {/* Label */}
        <span className="whitespace-nowrap text-sm">
          {isHindi ? 'हिंदी' : 'English'}
        </span>
      </Link>
    </Button>
  );
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  path: string;
}

export default function LanguageToggle({ path }: LanguageToggleProps) {
  const isTargetHindi = path.startsWith('/hi');

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="
        no-print
        inline-flex
        items-center
        gap-2
        rounded-full
        border-rose-300
        bg-rose-50
        text-rose-600
        font-semibold
        shadow-sm
        hover:bg-rose-100
        hover:border-rose-400
        focus-visible:ring-2
        focus-visible:ring-rose-300
        focus-visible:ring-offset-2
      "
      aria-label={
        isTargetHindi ? 'Read this page in Hindi' : 'Read this page in English'
      }
    >
      <Link href={path} className="flex items-center gap-2">
        <span className="text-base leading-none">
          {isTargetHindi ? '🇮🇳' : '🇺🇸'}
        </span>
        <span className="whitespace-nowrap text-sm">
          {isTargetHindi ? 'हिंदी में देखें (Read in Hindi)' : 'English'}
        </span>
      </Link>
    </Button>
  );
}

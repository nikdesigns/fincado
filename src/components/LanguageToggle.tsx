'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  path: string; // e.g. "/hi/some-page" or "/some-page"
}

export default function LanguageToggle({ path }: LanguageToggleProps) {
  const isHindi = path.startsWith('/hi');

  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="
        no-print
        inline-flex items-center gap-2
        rounded-full
        border-[#B0EC70] bg-[#F7FDF1]
        text-[#577A30] font-semibold
        hover:bg-[#DFF7C6] hover:border-[#B0EC70]
        focus-visible:ring-2 focus-visible:ring-[#B0EC70]
        focus-visible:ring-offset-2
        transition-colors
      "
      aria-label={isHindi ? 'Switch to English' : 'हिंदी में पढ़ें'}
    >
      <Link href={path} className="flex items-center gap-2 px-1">
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

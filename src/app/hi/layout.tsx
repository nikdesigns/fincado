// src/app/layout.tsx
import { headers } from 'next/headers';
import SkipToContent from '@/components/SkipToContent';
import { Rubik } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = headers();
  const pathname = headersList.get('x-pathname') || '';
  const isHindi = pathname.startsWith('/hi');

  return (
    <html lang={isHindi ? 'hi-IN' : 'en-IN'} suppressHydrationWarning lang="hi-IN">
      <body className={rubik.className}>
        <SkipToContent />
        {children}
      </body>
    </html>
  );
}

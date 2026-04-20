import type { Metadata } from 'next';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const PAGE_URL = 'https://fincado.com/hi/loans/';

const HINDI_LOAN_LINKS = [
  {
    href: '/hi/loans/home-loan/',
    title: 'होम लोन',
    desc: 'EMI, ब्याज, अवधि और कुल भुगतान तुलना',
  },
  {
    href: '/hi/loans/personal-loan/',
    title: 'पर्सनल लोन',
    desc: 'फ्लेक्सिबल अवधि के साथ EMI और कुल लागत देखें',
  },
  {
    href: '/hi/loans/car-loan/',
    title: 'कार लोन',
    desc: 'डाउन पेमेंट और अवधि के आधार पर सही योजना',
  },
  {
    href: '/hi/loans/education-loan/',
    title: 'एजुकेशन लोन',
    desc: 'मोराटोरियम और बाद की EMI का प्रभाव समझें',
  },
];

export const metadata: Metadata = {
  title: 'हिंदी लोन कैलकुलेटर | होम, कार, पर्सनल, एजुकेशन | Fincado',
  description:
    'हिंदी में होम लोन, कार लोन, पर्सनल लोन और एजुकेशन लोन के EMI कैलकुलेटर और निर्णय गाइड देखें।',
  alternates: {
    canonical: PAGE_URL,
    languages: {
      hi: PAGE_URL,
      en: 'https://fincado.com/loans/',
    },
  },
  openGraph: {
    title: 'हिंदी लोन कैलकुलेटर हब',
    description:
      'लोन निर्णय के लिए हिंदी में होम, कार, पर्सनल और एजुकेशन EMI टूल्स।',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HindiLoansHubPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'लोन', url: PAGE_URL },
        ]}
      />

      <main className="container mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            हिंदी लोन डेस्क
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            अपने उद्देश्य के अनुसार सही लोन विकल्प चुनें और EMI प्रभाव समझें।
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-2">
          {HINDI_LOAN_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-300 hover:shadow-sm"
            >
              <h2 className="text-base font-semibold text-slate-900">
                {item.title}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}


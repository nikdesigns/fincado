import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Building2,
  Clock3,
  HeadphonesIcon,
  MessageSquare,
  Newspaper,
  ShieldCheck,
  Users,
} from 'lucide-react';

const PAGE_URL = 'https://fincado.com/contact/';
const SUPPORT_EMAIL = 'support@fincado.com';
const PARTNERSHIP_EMAIL = 'support@fincado.com';
const PRESS_EMAIL = 'support@fincado.com';
const OFFICE_ADDRESS = 'Mumbai, Maharashtra, India';

export const metadata: Metadata = {
  title: 'Contact Support | Fincado Trust Center',
  description:
    'Contact Fincado support for calculator issues, corrections, partnerships, media requests, and editorial feedback.',
  keywords: [
    'contact fincado support',
    'financial calculator support',
    'fincado contact email',
    'fincado partnerships and media',
  ],
  alternates: {
    canonical: PAGE_URL,
  },
  openGraph: {
    title: 'Contact Support | Fincado Trust Center',
    description:
      'Reach Fincado for support, corrections, partnerships, and media communication.',
    url: PAGE_URL,
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  const contactPageLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Support',
    url: PAGE_URL,
    description: 'Support and communication page for Fincado users.',
    mainEntity: {
      '@type': 'Organization',
      '@id': 'https://fincado.com/#organization',
      name: 'Fincado',
      url: 'https://fincado.com/',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SUPPORT_EMAIL,
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
        {
          '@type': 'ContactPoint',
          contactType: 'business inquiries',
          email: PARTNERSHIP_EMAIL,
          areaServed: 'IN',
        },
        {
          '@type': 'ContactPoint',
          contactType: 'media inquiries',
          email: PRESS_EMAIL,
          areaServed: 'IN',
        },
      ],
    },
  };

  const supportChannels = [
    {
      id: 'support',
      title: 'Customer Support',
      description: 'Calculator bugs, technical issues, and correction requests.',
      email: SUPPORT_EMAIL,
      icon: HeadphonesIcon,
    },
    {
      id: 'partnerships',
      title: 'Partnerships',
      description: 'Business collaborations, integration opportunities, and strategic proposals.',
      email: PARTNERSHIP_EMAIL,
      icon: Users,
    },
    {
      id: 'press',
      title: 'Press and Media',
      description: 'Interviews, media mentions, and publication requests.',
      email: PRESS_EMAIL,
      icon: Newspaper,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Contact Support', url: PAGE_URL },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageLd) }}
      />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
        <header className="mb-8 rounded-2xl border border-slate-200 bg-linear-to-br from-brand-50/70 to-white p-6 shadow-sm lg:p-8">
          <Badge className="mb-3 border border-brand-200 bg-white text-[11px] font-semibold uppercase tracking-wide text-brand-700">
            Support Desk
          </Badge>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
            Contact Support
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 lg:text-base">
            Reach Fincado for support, corrections, editorial questions, and partnership discussions. We prioritize accuracy and respond to genuine requests as quickly as possible.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">
            <Clock3 className="h-3.5 w-3.5 text-brand-700" />
            Typical response window: 1-3 business days
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-6">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50/70">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5">
                <ContactForm supportEmail={SUPPORT_EMAIL} officeCity="Mumbai" />
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50/70">
                <CardTitle className="text-lg font-semibold text-slate-900">
                  Support Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-5">
                {supportChannels.map((channel) => {
                  const Icon = channel.icon;
                  return (
                    <article
                      key={channel.id}
                      id={channel.id}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <h2 className="text-base font-semibold text-slate-900">
                            {channel.title}
                          </h2>
                          <p className="mt-1 text-sm leading-relaxed text-slate-600">
                            {channel.description}
                          </p>
                          <a
                            href={`mailto:${channel.email}`}
                            className="mt-2 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-800"
                          >
                            {channel.email}
                          </a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </CardContent>
            </Card>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24 lg:h-max">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50/70">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Quick Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-4">
                <Link
                  href="/faq/"
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-800"
                >
                  FAQ
                </Link>
                <Link
                  href="/editorial-guidelines/"
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-800"
                >
                  Editorial Guidelines
                </Link>
                <Link
                  href="/privacy-policy/"
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-800"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="/disclaimer/"
                  className="block rounded-md px-2 py-2 text-sm font-medium text-slate-600 hover:bg-brand-50 hover:text-brand-800"
                >
                  Disclaimer
                </Link>
              </CardContent>
            </Card>

            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="border-b border-slate-200 bg-slate-50/70">
                <CardTitle className="text-base font-semibold text-slate-900">
                  Office and Policy Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4 text-sm text-slate-600">
                <div className="flex items-start gap-2">
                  <Building2 className="mt-0.5 h-4 w-4 text-brand-700" />
                  <span>{OFFICE_ADDRESS}</span>
                </div>
                <div className="flex items-start gap-2">
                  <ShieldCheck className="mt-0.5 h-4 w-4 text-brand-700" />
                  <span>Support replies are informational and not legal or investment advice.</span>
                </div>
                <div className="flex items-start gap-2">
                  <MessageSquare className="mt-0.5 h-4 w-4 text-brand-700" />
                  <span>Include page URL and issue details for faster resolution.</span>
                </div>
                <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-500">
                  By contacting us, you consent to processing of message details for support purposes as described in our privacy policy.
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </>
  );
}

// src/app/contact/page.tsx
import type { Metadata } from 'next';
import ContactForm from './ContactForm';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Mail,
  Users,
  Newspaper,
  MessageSquare,
  Clock,
  MapPin,
  HeadphonesIcon,
  Building2,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Fincado | Support, Partnerships & Media Inquiries',
  description:
    'Contact Fincado for support, partnerships, press inquiries, and product feedback. Get help with financial calculators, SIP tools, and loan guides. Response within 24-48 hours.',
  keywords: [
    'contact fincado',
    'fincado support',
    'financial calculator support',
    'fincado partnerships',
    'press inquiries fincado',
    'fincado customer service',
    'financial tools support india',
  ],
  openGraph: {
    title: 'Contact Fincado | Support & Partnerships',
    description:
      'Get in touch with Fincado for support, partnerships, or media inquiries. We respond within 24-48 hours.',
    url: 'https://fincado.com/contact/',
    type: 'website',
  },
  alternates: {
    canonical: 'https://fincado.com/contact/',
  },
};

const SUPPORT_EMAIL = 'support@fincado.com';
const PARTNERSHIPS_EMAIL = 'support@fincado.com';
const PRESS_EMAIL = 'support@fincado.com';
const OFFICE_CITY = 'Mumbai';
const OFFICE_ADDRESS = 'Mumbai, Maharashtra, India';

export default function ContactPage() {
  // Structured Data - ContactPage Schema
  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Fincado',
    description:
      'Contact page for Fincado - support, partnerships, and media inquiries',
    url: 'https://fincado.com/contact/',
    mainEntity: {
      '@type': 'Organization',
      name: 'Fincado',
      url: 'https://fincado.com',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Customer Support',
          email: SUPPORT_EMAIL,
          availableLanguage: ['English', 'Hindi'],
          areaServed: 'IN',
        },
        {
          '@type': 'ContactPoint',
          email: PARTNERSHIPS_EMAIL,
          contactType: 'Business Development',
          areaServed: 'IN',
        },
        {
          '@type': 'ContactPoint',
          email: PRESS_EMAIL,
          contactType: 'Media Relations',
          areaServed: 'IN',
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: OFFICE_CITY,
        addressCountry: 'IN',
      },
    },
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Contact', url: 'https://fincado.com/contact/' },
        ]}
      />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <main className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="max-w-4xl mx-auto text-center my-12">
          <div className="relative bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50/30 border border-blue-200/50 rounded-2xl p-8 overflow-hidden shadow-sm">
            {/* Decorative Background */}
            <div className="absolute -right-12 -top-12 opacity-5">
              <HeadphonesIcon className="w-64 h-64 text-blue-600" />
            </div>

            <div className="relative z-10">
              <Badge className="mb-4 bg-white border-blue-300 text-blue-700 px-4 py-1.5 font-bold uppercase tracking-wider shadow-sm">
                We&apos;re Here to Help
              </Badge>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">
                Contact{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
                  Fincado
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto mb-4">
                Whether you have a product question, partnership idea, press
                inquiry, or feedback about calculators and guides, we read every
                message and reply as quickly as possible.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
                <Clock className="w-4 h-4 text-blue-600" />
                <span className="font-medium">Response time: 24-48 hours</span>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Support Section */}
            <section id="support">
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-linear-to-r from-emerald-50 to-teal-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-md">
                      <HeadphonesIcon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Customer Support
                      </CardTitle>
                      <CardDescription>
                        Get help with calculators and technical issues
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    For help with calculators, article corrections, or technical
                    issues, reach out to our support team:
                  </p>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-5 h-5 text-emerald-600" />
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="text-lg font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
                      >
                        {SUPPORT_EMAIL}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Response within 1-3 business days</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600">
                    💡 Before emailing, check our{' '}
                    <a
                      href="/faq/"
                      className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                    >
                      FAQ section
                    </a>{' '}
                    for instant answers.
                  </p>
                </CardContent>
              </Card>
            </section>

            {/* Partnerships Section */}
            <section id="partnerships">
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-md">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Partnerships & Business
                      </CardTitle>
                      <CardDescription>
                        Collaborate with Fincado
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    Interested in partnering with Fincado? We&apos;re open to
                    content collaborations, tool integrations, and affiliate
                    relationships.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <h4 className="font-semibold text-slate-900 mb-2">
                      Please include:
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Company name and website</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Brief description of partnership idea</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <span>Expected business model and timeline</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <a
                        href={`mailto:${PARTNERSHIPS_EMAIL}?subject=Partnership Inquiry`}
                        className="text-lg font-bold text-blue-700 hover:text-blue-800 hover:underline"
                      >
                        {PARTNERSHIPS_EMAIL}
                      </a>
                    </div>
                    <p className="text-xs text-blue-700 mt-2">
                      Subject line: &quot;Partnership Inquiry&quot;
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Press & Media Section */}
            <section id="press">
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-linear-to-r from-purple-50 to-pink-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center shadow-md">
                      <Newspaper className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Press & Media
                      </CardTitle>
                      <CardDescription>
                        Media inquiries and interviews
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    For press requests, interview availability, or media kits,
                    please include details about the outlet, topic, and
                    deadline. We aim to respond quickly for timely coverage.
                  </p>

                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <Mail className="w-5 h-5 text-purple-600" />
                      <a
                        href={`mailto:${PRESS_EMAIL}?subject=Press Inquiry`}
                        className="text-lg font-bold text-purple-700 hover:text-purple-800 hover:underline"
                      >
                        {PRESS_EMAIL}
                      </a>
                    </div>
                    <p className="text-xs text-purple-700 mt-2">
                      Priority response for time-sensitive inquiries
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Feedback Section */}
            <section id="feedback">
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-linear-to-r from-amber-50 to-orange-50 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-amber-600 flex items-center justify-center shadow-md">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Product Feedback
                      </CardTitle>
                      <CardDescription>
                        Help us improve our tools
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    We love hearing suggestions! Found an inaccurate article, a
                    broken calculator, or have an improvement idea? Please
                    describe the issue and include the page URL.
                  </p>

                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
                    <strong className="font-semibold">
                      💡 Your feedback matters:
                    </strong>{' '}
                    Every suggestion is reviewed and helps us improve Fincado
                    for thousands of users.
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Contact Form Section */}
            <section id="form">
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center shadow-md">
                      <Send className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Send a Message
                      </CardTitle>
                      <CardDescription>Quick email form</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <ContactForm
                    supportEmail={SUPPORT_EMAIL}
                    officeCity={OFFICE_CITY}
                  />
                </CardContent>
              </Card>
            </section>

            {/* Privacy Notice */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-12">
              <p className="text-xs text-slate-600 leading-relaxed">
                By contacting us you consent to Fincado storing your message and
                email for the purpose of responding. For details see our{' '}
                <a
                  href="/privacy/"
                  className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 mb-12">
            <div className="sticky top-24 space-y-6">
              {/* Quick Links */}
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-bold">
                    Quick Links
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <nav aria-label="Contact page navigation">
                    <ul className="divide-y divide-slate-100">
                      {[
                        {
                          href: '#support',
                          label: 'Support',
                          icon: HeadphonesIcon,
                        },
                        {
                          href: '#partnerships',
                          label: 'Partnerships',
                          icon: Users,
                        },
                        { href: '#press', label: 'Press', icon: Newspaper },
                        {
                          href: '#feedback',
                          label: 'Feedback',
                          icon: MessageSquare,
                        },
                        { href: '#form', label: 'Send Message', icon: Send },
                      ].map((link) => (
                        <li key={link.href}>
                          <a
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          >
                            <link.icon className="w-4 h-4" />
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card className="border-slate-200 shadow-md">
                <CardHeader className="bg-slate-50 border-b border-slate-200">
                  <CardTitle className="text-base font-bold">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        Office Location
                      </p>
                      <p className="text-sm text-slate-600">{OFFICE_ADDRESS}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${SUPPORT_EMAIL}`}
                        className="text-sm text-blue-600 hover:text-blue-700 hover:underline break-all"
                      >
                        {SUPPORT_EMAIL}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-slate-900 mb-1">
                        Response Time
                      </p>
                      <p className="text-sm text-slate-600">
                        24-48 hours (business days)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Help Center */}
              <Card className="border-slate-200 bg-linear-to-br from-blue-50 to-indigo-50 mb-12">
                <CardContent className="p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center mx-auto shadow-md">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Need Instant Help?
                  </h3>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    Check our comprehensive FAQ section for quick answers to
                    common questions.
                  </p>
                  <a
                    href="/faq/"
                    className="inline-block text-xs font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                  >
                    Browse FAQ →
                  </a>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

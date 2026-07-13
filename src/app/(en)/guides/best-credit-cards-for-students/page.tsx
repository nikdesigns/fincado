import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';
import { getCardsByTag } from '@/lib/creditCards';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';

export const metadata: Metadata = {
  title: 'Best Credit Cards for Students in India 2026',
  description:
    'Best credit cards for students in India 2026 with no or low income proof. Compare fees, rewards and eligibility for FD-backed student credit cards like SBI Card Unnati.',
  keywords: [
    'best credit card for students india',
    'student credit card india 2026',
    'credit card for students with no income',
    'sbi card unnati review',
    'fd backed credit card for students',
    'credit card for college students india',
    'first credit card for students',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/best-credit-cards-for-students/',
  },
  openGraph: {
    title: 'Best Credit Cards for Students in India 2026',
    description:
      'A narrow, honest look at credit card options for students in India, including FD-backed cards that need no income proof.',
    url: 'https://fincado.com/guides/best-credit-cards-for-students/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Can a student in India get a credit card without any income?',
    answer:
      'Yes, through an FD-backed (secured) credit card such as SBI Card Unnati, which is issued against a fixed deposit instead of an income proof. This route needs no salary slip or ITR.',
  },
  {
    question: 'What is an FD-backed student credit card?',
    answer:
      'It is a secured credit card issued against a fixed deposit you open with the bank, typically a minimum of ₹25,000 for SBI Card Unnati. The FD acts as collateral, so the bank does not need to verify your income.',
  },
  {
    question: 'Does a student credit card help build a credit score?',
    answer:
      'Yes. FD-backed cards like SBI Card Unnati report usage to credit bureaus, so responsible use — paying the full bill on time — can help a student build a CIBIL history from zero.',
  },
  {
    question: 'Is an add-on credit card a good option for students?',
    answer:
      'It can be. Many parents add their student as an add-on or supplementary cardholder on their own credit card, which lets the student use a card without a separate application, though the credit history typically builds under the primary holder.',
  },
  {
    question: 'Does SBI Card Unnati charge an annual fee?',
    answer:
      'No annual fee applies for the first 4 years on SBI Card Unnati; a renewal fee applies after that period. Always confirm the current fee schedule on the issuer page before applying.',
  },
  {
    question: 'What documents does a student need for an FD-backed card?',
    answer:
      'Typically an ID proof, address proof, and the fixed deposit itself. No income proof, salary slip, or ITR is required for a card like SBI Card Unnati.',
  },
  {
    question: 'Are student-specific credit cards common in India?',
    answer:
      'No. Dedicated student credit cards are limited in the current Indian market. Most students instead use FD-backed secured cards or become an add-on cardholder on a parent or guardian\'s card.',
  },
];

export default function BestCreditCardsForStudentsPage() {
  const studentCards = getCardsByTag('student');

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: 'Best Credit Cards for Students in India 2026',
            description:
              'A narrow, honest guide to credit card options for students in India, including FD-backed cards that need no income proof.',
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              '@id': 'https://fincado.com/#organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: 'https://fincado.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/guides/best-credit-cards-for-students/',
            },
            datePublished: '2026-07-12',
            dateModified: '2026-07-12',
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Guides', url: 'https://fincado.com/guides/' },
          {
            name: 'Best Credit Cards for Students',
            url: 'https://fincado.com/guides/best-credit-cards-for-students/',
          },
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Credit Card Cluster
        </Badge>

        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          Best Credit Cards for Students in India 2026
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 7 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span>
            Updated: <strong className="text-slate-700">Jul 2026</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1 font-medium text-emerald-600">
            <CheckCircle2 className="h-4 w-4" /> Verified
          </span>
        </div>

        <div className="mt-6">
          <ShareTools title="Best Credit Cards for Students in India 2026" />
        </div>
      </header>

      <Card className="mb-8 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`
              <p class="mb-4">
                <strong>Most mainstream credit cards need income proof</strong> — a salary slip or an ITR — which most students simply do not have yet. That rules out the majority of cashback and travel cards you may have seen recommended elsewhere.
              </p>
              <p class="mb-4">
                Dedicated student credit cards are genuinely limited in the current Indian market, so this page stays narrow and honest: it covers the practical route students actually use — an FD-backed (secured) card — and explains the parent add-on-card alternative that many families choose instead.
              </p>
            `}
          />
        </CardContent>
      </Card>

      <CardVerifiedNote />

      <Card className="mb-12 border-slate-200 bg-slate-50/50 no-print">
        <CardContent className="p-6">
          <p className="mb-4 text-lg font-semibold text-slate-900">
            Table of Contents
          </p>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2 text-sm text-slate-700">
            <li>
              <a href="#compare" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 1. Quick comparison
              </a>
            </li>
            <li>
              <a href="#cards" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 2. Card breakdown
              </a>
            </li>
            <li>
              <a href="#alternatives" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 3. The add-on card route
              </a>
            </li>
            <li>
              <a href="#choose" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 4. How to choose
              </a>
            </li>
            <li>
              <a href="#mistakes" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 5. Mistakes to avoid
              </a>
            </li>
            <li>
              <a href="#faqs" className="hover:text-blue-600 hover:underline flex items-center gap-2">
                <ChevronRight className="h-3 w-3" /> 6. FAQs
              </a>
            </li>
          </ul>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-students-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="compare"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <GraduationCap className="h-6 w-6 text-blue-600" />
          Quick Comparison
        </h2>
        <CardCompareTable cards={studentCards} />
      </section>

      <section className="mb-12">
        <h2
          id="cards"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
        >
          Card Breakdown
        </h2>
        <div className="grid gap-6">
          {studentCards.map((card, index) => (
            <CardFactCard key={card.slug} card={card} rank={index + 1} />
          ))}
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-students-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="alternatives"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-violet-600" />
          The Add-On Card Route
        </h2>

        <Card className="border-slate-200 mb-6">
          <CardContent className="pt-6 text-slate-700">
            <p className="mb-4">
              Because dedicated student cards are scarce, many students in India get their first taste of credit through an <strong>add-on (supplementary) card</strong> issued on a parent or guardian&apos;s existing credit card account. The student gets a physical card and can transact independently, while the primary holder remains responsible for repayment.
            </p>
            <p>
              This route needs no separate income proof or application from the student, and it can be a reasonable way to learn card discipline before applying for an FD-backed card in their own name once they have some income or savings to lock into a fixed deposit.
            </p>
          </CardContent>
        </Card>

        <div className="rounded-lg bg-violet-50 p-5 text-sm text-violet-900 border border-violet-100">
          <p>
            <strong>Note:</strong> Add-on card spending typically builds the primary holder&apos;s credit history, not a separate one for the student. If the goal is for the student to build their own credit profile, an FD-backed card in their own name is usually the better fit.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="choose"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Lightbulb className="h-6 w-6 text-emerald-600" />
          How to Choose as a Student
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-emerald-100 bg-emerald-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-emerald-900 mb-2">Prioritize these</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>No or minimal income-proof requirement.</li>
                <li>Card reports to credit bureaus, so it can build a real history.</li>
                <li>Low or waived fees in the early years.</li>
                <li>An FD amount you can genuinely afford to lock in.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-100 bg-red-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-red-900 mb-2">Do not chase</strong>
              <ul className="list-disc pl-4 space-y-1">
                <li>Premium travel or lounge cards you cannot yet qualify for.</li>
                <li>Cards with income thresholds you cannot document.</li>
                <li>Referral hype that ignores the eligibility fine print.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-students-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="mistakes"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <AlertTriangle className="h-6 w-6 text-amber-500" />
          Mistakes Students Should Avoid
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Treating the limit as spare income</strong>
              A credit limit is borrowed money, not extra pocket money. Spend only what you can repay in full each cycle.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Missing the first due date</strong>
              A single late payment early in your credit history can leave a lasting mark. Set reminders or auto-pay from day one.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Ignoring the fixed deposit terms</strong>
              With FD-backed cards, understand how breaking or renewing the FD affects your card before you commit funds.
            </CardContent>
          </Card>
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="pt-6 text-sm text-slate-700">
              <strong className="block text-amber-900 mb-1">Applying to multiple issuers at once</strong>
              Several applications in a short window can look like credit-seeking stress, even with no prior history to protect.
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-semibold text-slate-900 scroll-mt-20"
        >
          FAQs
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-4 bg-white"
            >
              <AccordionTrigger className="text-left text-slate-900 font-semibold hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-700 text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <Card className="mb-8 border-slate-200 bg-slate-900 text-white">
        <CardContent className="p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            Start Small, Build a Real Credit History
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            An FD-backed card is not a lesser choice for a student — it is often the smartest first step because it needs no income proof and still reports to credit bureaus. Pay in full, keep it simple, and graduate to bigger cards once income arrives.
          </p>
        </CardContent>
      </Card>

      <div className="mb-8">
        <CardClusterNav />
      </div>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes
          only and does not constitute financial advice or card recommendation
          advice. Product terms, eligibility, fees, rewards, and issuer policies
          can change over time. Always verify the latest schedule of charges and
          card terms before applying.
        </p>
      </div>

      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-semibold sm:text-3xl">
            New to credit cards? Start with the basics.
          </h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Read the full Fincado Credit Card Guide to understand billing cycles, fees, rewards, and credit score impact.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/guides/credit-card-guide/"
              className="rounded-lg bg-white px-8 py-4 font-semibold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Read the Credit Card Guide
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-students-4" type="leaderboard" />
      </div>
    </article>
  );
}

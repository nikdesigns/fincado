import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import {
  CardVerifiedNote,
  CardFactCard,
  CardCompareTable,
  CardClusterNav,
} from '@/components/CreditCardFacts';
import { getCardBySlug } from '@/lib/creditCards';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import {
  Scale,
  Landmark,
  Smartphone,
  Percent,
  CheckCircle2,
  Clock,
  Wallet,
  Lightbulb,
  ShieldCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'SBI vs ICICI Credit Cards: Which Should You Choose? (2026)',
  description:
    'SBI Card vs ICICI Bank credit cards compared at the issuer level — network reach, typical fees, reward style and app experience — plus real examples like SBI SimplyCLICK and Amazon Pay ICICI.',
  keywords: [
    'SBI vs ICICI credit card',
    'SBI Card vs ICICI Bank',
    'best credit card issuer India',
    'SBI SimplyCLICK vs Amazon Pay ICICI',
    'SBI Card Unnati',
    'ICICI Bank credit card review',
    'credit card issuer comparison India',
  ],
  alternates: {
    canonical: 'https://fincado.com/guides/sbi-vs-icici-credit-cards/',
  },
  openGraph: {
    title: 'SBI vs ICICI Credit Cards: Which Should You Choose? (2026)',
    description:
      'An issuer-level look at SBI Card and ICICI Bank credit cards — reach, fees, rewards style and app experience — with real card examples.',
    url: 'https://fincado.com/guides/sbi-vs-icici-credit-cards/',
    type: 'article',
  },
};

const FAQ_ITEMS = [
  {
    question: 'Is SBI Card better than ICICI Bank for credit cards?',
    answer:
      'Neither issuer is universally "better" — SBI Card generally has a wider entry-level and co-branded lineup with options like the FD-backed SBI Card Unnati, while ICICI Bank is known for tightly integrated, invite-driven partner cards such as the Amazon Pay ICICI Credit Card. The right pick depends on the specific card, not just the bank name.',
  },
  {
    question: 'Which has a better app, SBI Card or ICICI Bank?',
    answer:
      'Both banks have invested heavily in their apps in recent years. ICICI Bank\'s iMobile Pay app is generally well regarded for bundling banking and card management in one place, while the dedicated SBI Card mobile app focuses specifically on card servicing. Actual day-to-day experience can vary by user and region, so it is worth trying both if you already bank with either institution.',
  },
  {
    question: 'Can I apply for an ICICI Bank credit card directly?',
    answer:
      'It depends on the specific card. Some ICICI Bank cards are open for direct application, but the Amazon Pay ICICI Credit Card in particular is invite-only and cannot be applied for directly — it requires an invitation through ICICI Bank or Amazon.',
  },
  {
    question: 'Does SBI Card have a no-income-proof credit card?',
    answer:
      'Yes. The SBI Card Unnati is issued against a Fixed Deposit (minimum ₹25,000) with no income proof required, making it a common starting point for students, homemakers, and those with no credit history.',
  },
  {
    question: 'Which issuer has lower annual fees, SBI Card or ICICI Bank?',
    answer:
      'This depends entirely on the specific card compared, not the issuer as a whole — both banks offer lifetime-free and low-fee cards alongside premium paid cards. Always compare the exact joining fee, annual fee and waiver conditions of the specific cards you are considering rather than assuming one issuer is cheaper across the board.',
  },
];

export default function SbiVsIciciCreditCardsPage() {
  const sbiUnnati = getCardBySlug('sbi-card-unnati')!;
  const sbiSimplyClick = getCardBySlug('sbi-simplyclick')!;
  const amazonPayIcici = getCardBySlug('amazon-pay-icici')!;

  return (
    <article className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'en-IN',
            headline: 'SBI vs ICICI Credit Cards: Which Should You Choose? (2026)',
            description:
              'An issuer-level comparison of SBI Card and ICICI Bank credit cards covering network reach, typical fee structures, reward style, and app experience, with real card examples.',
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
              '@id': 'https://fincado.com/guides/sbi-vs-icici-credit-cards/',
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
            name: 'SBI vs ICICI Credit Cards',
            url: 'https://fincado.com/guides/sbi-vs-icici-credit-cards/',
          },
        ]}
      />

      <header className="mb-8 border-b border-slate-200 pb-6 no-print">
        <Badge
          variant="secondary"
          className="mb-3 bg-blue-100 text-blue-800 hover:bg-blue-200 px-3 py-1"
        >
          Issuer Comparison
        </Badge>

        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl leading-tight">
          SBI vs ICICI Credit Cards: Which Should You Choose? (2026)
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> 11 Min Read
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
          <ShareTools title="SBI vs ICICI Credit Cards" />
        </div>
      </header>

      <Card className="mb-10 border-slate-200 bg-white shadow-sm">
        <CardContent className="pt-6 text-slate-700 leading-relaxed text-lg">
          <WikiText
            content={`<p><strong>SBI Card</strong> and <strong>ICICI Bank</strong> are two of the largest credit card issuers in India, but they operate quite differently. SBI Card runs as a dedicated, separately listed credit card company with a broad entry-level and co-branded lineup, while ICICI Bank issues credit cards as part of its wider banking relationship, often bundling cards tightly with its own banking app and partner ecosystem.</p>
            <p>This guide compares the two issuers at a <strong>general, issuer level</strong> — typical fee patterns, reward style, network reach, and app experience — rather than pitting one specific card against another. Where useful, we reference real cards from each issuer's lineup, such as the <strong>SBI Card Unnati</strong>, <strong>SBI SimplyCLICK</strong>, and the <strong>Amazon Pay ICICI Credit Card</strong>, using only the facts verified in our card database.</p>`}
          />
        </CardContent>
      </Card>

      <CardVerifiedNote />

      <Card className="mb-12 border-slate-200 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <h2 className="mb-4 text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="h-6 w-6 text-blue-600" /> At a Glance: Issuer Snapshot
          </h2>
          <div className="overflow-hidden rounded-lg border border-slate-200 shadow-sm">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100 hover:bg-slate-100">
                  <TableHead className="font-bold text-slate-900">Factor</TableHead>
                  <TableHead className="font-bold text-slate-900">SBI Card</TableHead>
                  <TableHead className="font-bold text-slate-900">ICICI Bank</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">Lineup style</TableCell>
                  <TableCell>Broad range — secured, entry-level, cashback, fuel and co-branded cards</TableCell>
                  <TableCell>Fewer but tightly focused partner cards, often bank-relationship driven</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">Typical application route</TableCell>
                  <TableCell>Generally open to direct application for most cards</TableCell>
                  <TableCell>Some cards direct; flagship partner cards can be invite-only</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">Reward style</TableCell>
                  <TableCell>Typically points-based with milestone cashback add-ons</TableCell>
                  <TableCell>Typically straightforward percentage cashback on partner spends</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">No-credit-history option</TableCell>
                  <TableCell className="text-emerald-600 font-bold">
                    Yes — FD-backed secured cards available
                  </TableCell>
                  <TableCell>Not represented among ICICI cards in our data set</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-slate-700">App ecosystem</TableCell>
                  <TableCell>Dedicated SBI Card app focused on card servicing</TableCell>
                  <TableCell>iMobile Pay combines banking and card management in one app</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-sm text-slate-500 italic">
            These are general, typical patterns based on the issuers' overall lineups — individual cards from either
            bank can differ from the pattern.
          </p>
        </CardContent>
      </Card>

      <div className="no-print my-8">
        <AdSlot id="guide-sbi-icici-1" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="reach"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Landmark className="h-6 w-6 text-indigo-600" /> Network Reach and Card Availability
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">SBI Card</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">
                SBI Card operates as a standalone credit card business built on the reach of the State Bank of India
                network. It generally offers a wide spread of cards across price points — from secured, FD-backed
                entry cards to fuel co-branded and travel cards — so there is typically an option for most credit
                profiles.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Broad tier coverage from secured to premium.</li>
                <li>Cards like SBI Card Unnati are designed for first-time credit users.</li>
                <li>Fuel and shopping co-branded partnerships (e.g. BPCL, e-commerce tie-ups).</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">ICICI Bank</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <p className="mb-3">
                ICICI Bank issues credit cards as part of its full-service banking relationship. Its partner cards,
                such as the Amazon Pay ICICI Credit Card, are typically distributed through targeted invitations
                rather than open applications, which can make the approval path feel more selective than SBI Card's
                broader lineup.
              </p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Strong integration with e-commerce and lifestyle partners.</li>
                <li>Some flagship partner cards are invite-only, not open applications.</li>
                <li>Card servicing generally sits inside the main ICICI Bank banking app.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="fees"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Percent className="h-6 w-6 text-rose-600" /> Typical Fee Structures
        </h2>
        <WikiText
          content={`<p class="mb-4 text-slate-700">Fee structures vary card-by-card at both issuers, so treat this as a general pattern rather than a blanket rule. Looking at cards verified in our database:</p>`}
        />
        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-800">SBI Card Unnati</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              {sbiUnnati.joiningFee} joining, {sbiUnnati.annualFee.toLowerCase()}.
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-800">SBI SimplyCLICK</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              {sbiSimplyClick.joiningFee} joining and annual fee, offset by a {sbiSimplyClick.feeWaiver?.toLowerCase()}
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-slate-800">Amazon Pay ICICI</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              {amazonPayIcici.joiningFee} joining fee, {amazonPayIcici.annualFee.toLowerCase()} for life.
            </CardContent>
          </Card>
        </div>
        <p className="text-sm text-slate-600">
          Generally, both issuers offer genuinely fee-free options at the entry level. SBI Card tends to spread its
          lineup across more fee tiers (nil, sub-₹500, and premium), while the ICICI card in our data set sits firmly
          at the lifetime-free end. Always confirm the exact fee and waiver terms for the specific card you are
          evaluating rather than assuming based on the issuer.
        </p>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-sbi-icici-2" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="rewards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Wallet className="h-6 w-6 text-emerald-600" /> Typical Reward Style
        </h2>
        <WikiText
          content={`<p class="mb-4 text-slate-700">SBI Card's reward engine, as seen in cards like SBI SimplyCLICK, generally leans on a <strong>reward-points system with partner multipliers</strong> — for example, SimplyCLICK offers 10X points (roughly 5% value back) at Amazon, Cleartrip, BookMyShow and similar partners, plus 5X points on other online spend. ICICI Bank's Amazon Pay card, by contrast, generally uses a <strong>flat, transparent cashback percentage</strong> — 5% back on Amazon.in for Prime members, 3% for non-Prime, and 2% at 100+ Amazon Pay partner merchants.</p>
          <p class="mb-4 text-slate-700">Neither style is universally superior — points systems can offer higher headline multipliers but require understanding redemption value, while flat cashback is simpler to calculate but may cap out at a lower ceiling. Your everyday spending pattern should decide which style suits you.</p>`}
        />
      </section>

      <section className="mb-12">
        <h2
          id="app"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <Smartphone className="h-6 w-6 text-violet-600" /> Digital App Experience
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">SBI Card App</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              A dedicated app built specifically for card management — bill payments, reward tracking, EMI
              conversion and offers. Because it is purpose-built for cards, it is generally focused and
              straightforward, though it sits separate from your core SBI bank account app if you also bank with
              SBI.
            </CardContent>
          </Card>
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">ICICI iMobile Pay</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              ICICI Bank generally routes card management through its all-in-one iMobile Pay banking app, which many
              existing ICICI customers find convenient since banking and card servicing sit in one place. The
              trade-off is that it is a broader banking app rather than a card-first experience.
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-sbi-icici-3" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="cards"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <CheckCircle2 className="h-6 w-6 text-blue-600" /> Real Card Examples From Each Issuer
        </h2>
        <p className="mb-6 text-slate-700">
          To ground this issuer-level comparison in specifics, here are verified facts on three representative cards
          — two from SBI Card and one from ICICI Bank.
        </p>
        <div className="grid md:grid-cols-1 gap-6 mb-6">
          <CardCompareTable cards={[sbiUnnati, sbiSimplyClick, amazonPayIcici]} />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <CardFactCard card={sbiUnnati} />
          <CardFactCard card={sbiSimplyClick} />
          <CardFactCard card={amazonPayIcici} />
        </div>
      </section>

      <section className="mb-12">
        <h2
          id="who-should-choose"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20 flex items-center gap-2"
        >
          <ShieldCheck className="h-6 w-6 text-teal-600" /> Which Issuer Fits Your Situation?
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 text-lg">Consider SBI Card If...</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>You have no credit history and want a secured, FD-backed starter card like SBI Card Unnati.</li>
                <li>You want a wider range of price tiers to choose from under one issuer.</li>
                <li>You prefer applying directly without needing a bank-specific invitation.</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="border-emerald-200 bg-emerald-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-emerald-800 text-lg">Consider ICICI Bank If...</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-700">
              <ul className="list-disc pl-4 space-y-1">
                <li>You already bank with ICICI and want card management inside your existing banking app.</li>
                <li>You are a heavy Amazon shopper and can secure an invitation for the Amazon Pay ICICI card.</li>
                <li>You prefer simple, flat cashback percentages over a points-and-multiplier system.</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <div className="no-print my-8">
        <AdSlot id="guide-sbi-icici-4" type="leaderboard" />
      </div>

      <section className="mb-12">
        <h2
          id="faqs"
          className="mb-6 text-2xl font-bold text-slate-900 scroll-mt-20"
        >
          Frequently Asked Questions
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
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-yellow-400" /> Final Verdict
          </h2>
          <p className="mb-6 text-slate-300 leading-relaxed">
            There is no single "winner" between SBI Card and ICICI Bank at the issuer level — the right choice
            depends on the specific card, your credit history, and your spending pattern. SBI Card generally offers
            a broader, more directly accessible lineup, while ICICI Bank's strength lies in tight partner integration
            for existing customers who can access invite-driven cards. Compare the actual card, not just the bank
            name.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Compare the exact card
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Match spending pattern
            </div>
            <div className="flex items-center gap-2 text-sm bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> Verify on issuer page
            </div>
          </div>
        </CardContent>
      </Card>

      <CardClusterNav />

      <div className="mb-8 border-t border-slate-200 pt-8 mt-8">
        <AuthorBio />
        <p className="mt-4 text-xs text-slate-500 italic bg-slate-50 p-4 rounded-lg border border-slate-100">
          <strong>Disclaimer:</strong> This content is for educational purposes only and does not constitute
          financial advice or card recommendation advice. Product terms, eligibility, fees, rewards, and issuer
          policies can change over time. Always verify the latest schedule of charges and card terms on the
          issuer's official page before applying.
        </p>
      </div>

      <Card className="bg-linear-to-br from-blue-600 to-indigo-700 text-white border-none shadow-xl no-print">
        <CardContent className="flex flex-col items-center p-8 text-center sm:p-12">
          <h2 className="mb-4 text-2xl font-bold sm:text-3xl">Check Your Card Eligibility</h2>
          <p className="mb-8 max-w-lg text-blue-100 text-lg">
            Not sure which cards you qualify for? Use our free tool to check eligibility before applying.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/credit-card-eligibility-calculator/"
              className="rounded-lg bg-white px-8 py-4 font-bold text-blue-700 transition hover:bg-blue-50 shadow-lg"
            >
              Check Eligibility
            </Link>
            <Link
              href="/guides/credit-card-guide/"
              className="rounded-lg border border-blue-400 bg-blue-800/30 px-8 py-4 font-bold text-white transition hover:bg-blue-800/50"
            >
              Read the Full Credit Card Guide
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="no-print mt-8">
        <AdSlot id="guide-sbi-icici-5" type="leaderboard" />
      </div>
    </article>
  );
}

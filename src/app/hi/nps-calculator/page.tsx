import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import NPSClient from '@/app/nps-calculator/NPSClient'; // Reuse existing client
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BadgeCheck, Briefcase } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */
export const metadata: Metadata = {
  title: 'NPS कैलकुलेटर 2026 – पेंशन और एकमुश्त राशि की गणना करें',
  description:
    'अपने रिटायरमेंट फंड और मासिक पेंशन की गणना करें। बजट 2026 के अनुसार ₹50,000 की अतिरिक्त टैक्स छूट (80CCD 1B) और विद्ड्रॉल नियमों के साथ अपडेटेड।',
  keywords: [
    'NPS Calculator Hindi',
    'National Pension System in Hindi',
    'Pension Calculator India',
    'NPS Tax Benefit 2026',
    'Retirement Planning Hindi',
    'NPS Withdrawal Rules',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/nps-calculator/',
  },
  openGraph: {
    title: 'NPS कैलकुलेटर – रिटायरमेंट और पेंशन की योजना बनाएं',
    description:
      'जानें कि रिटायरमेंट के बाद आपको कितनी मासिक पेंशन और एकमुश्त राशि मिलेगी।',
    url: 'https://fincado.com/hi/nps-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

const NPS_FAQS_HINDI = [
  {
    question: 'NPS से कितना टैक्स बचाया जा सकता है?',
    answer:
      'आप धारा 80C के तहत ₹1.5 लाख और धारा 80CCD(1B) के तहत ₹50,000 की अतिरिक्त कटौती का दावा कर सकते हैं, यानी कुल ₹2 लाख प्रति वर्ष।',
  },
  {
    question: 'क्या NPS से निकासी (Withdrawal) टैक्स-फ्री है?',
    answer:
      'हाँ, 60 वर्ष की आयु में, आप कुल जमा राशि का 60% हिस्सा टैक्स-फ्री एकमुश्त निकाल सकते हैं। शेष 40% से एन्युटी (पेंशन प्लान) खरीदना अनिवार्य है, जिससे मिलने वाली पेंशन पर टैक्स लगता है।',
  },
  {
    question: 'NPS पर कितना रिटर्न मिलता है?',
    answer:
      'NPS का रिटर्न बाजार पर आधारित होता है। ऐतिहासिक रूप से, इक्विटी (Scheme E) ने 10-12% और सरकारी बॉन्ड (Scheme G) ने 8-9% का रिटर्न दिया है।',
  },
  {
    question: 'क्या बजट 2026 में NPS नियमों में कोई बदलाव हुआ है?',
    answer:
      'केंद्रीय बजट 2026 में कोई बड़ा बदलाव नहीं किया गया है। 80CCD(1B) के तहत ₹50,000 की विशेष छूट और 60% टैक्स-फ्री निकासी की सीमा पहले की तरह जारी है।',
  },
];

/* ---------------- HINDI LABELS FOR CLIENT ---------------- */
const HINDI_LABELS = {
  investment: 'मासिक निवेश (₹)',
  age: 'वर्तमान आयु (वर्ष)',
  rate: 'अपेक्षित रिटर्न (ROI %)',
  maturityVal: '60 की उम्र में कुल राशि',
  totalInv: 'कुल निवेश',
  totalGains: 'कुल ब्याज/लाभ',
  lumpSum: 'एकमुश्त राशि (टैक्स फ्री)',
  pension: 'अनुमानित मासिक पेंशन',
  annuityRate: 'एन्युटी दर (%)',
};

/* ---------------- PAGE ---------------- */

export default function NPSPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>राष्ट्रीय पेंशन प्रणाली (NPS)</strong> एक स्वैच्छिक और लंबी अवधि की रिटायरमेंट बचत योजना है, 
      जिसे PFRDA द्वारा नियंत्रित किया जाता है। यह आपको अपने कामकाजी जीवन के दौरान व्यवस्थित रूप से बचत करने में मदद करती है।
    </p>
    <p class="mt-2">
      यह भारत में सबसे अच्छे टैक्स-सेविंग विकल्पों में से एक है, जो बाजार-लिंक्ड रिटर्न और कम लागत की पेशकश करता है। 
      रिटायरमेंट (60 वर्ष) पर, यह आपको एक <strong>बड़ी एकमुश्त राशि (Lump Sum)</strong> और नियमित <strong>मासिक पेंशन</strong> प्रदान करता है।
    </p>
  `);

  const taxContent = autoLinkContent(`
    <p>NPS व्यक्तिगत निवेशकों के लिए दोहरा टैक्स लाभ प्रदान करता है:</p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>धारा 80C:</strong> ₹1.5 लाख तक की कटौती (समग्र 80C सीमा का हिस्सा)।</li>
      <li><strong>धारा 80CCD(1B):</strong> <strong>₹50,000</strong> की एक <em>विशेष</em> अतिरिक्त कटौती, जो 80C के ऊपर है।</li>
    </ul>
    <p class="mt-4 text-sm text-slate-500">
      नोट: कॉर्पोरेट कर्मचारी अपने नियोक्ता (Employer) के योगदान पर धारा 80CCD(2) के तहत अतिरिक्त छूट का दावा भी कर सकते हैं (Basic + DA का 14% तक)।
    </p>
  `);

  return (
    <>
      <CalculatorSchema
        name="NPS Calculator Hindi"
        description="Calculate NPS pension and lump sum amount upon retirement in Hindi."
        url="https://fincado.com/hi/nps-calculator/"
      />

      <FAQSchema
        faqs={NPS_FAQS_HINDI.map((faq) => ({
          question: faq.question,
          answer: faq.answer,
        }))}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', url: 'https://fincado.com/hi/' },
            { name: 'Calculators', url: 'https://fincado.com/hi/calculators/' },
            {
              name: 'NPS Calculator',
              url: 'https://fincado.com/hi/nps-calculator/',
            },
          ]}
        />

        <header className="no-print my-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="NPS कैलकुलेटर 2026" />
            <LanguageToggle path="/nps-calculator/" />
          </div>

          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              NPS कैलकुलेटर
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-emerald-700">
              भारत की सबसे किफायती पेंशन योजना के साथ रिटायरमेंट प्लान करें
            </span>
          </h1>

          <div className="mt-4 max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  <strong>राष्ट्रीय पेंशन प्रणाली (NPS)</strong> का उपयोग करके अपने कुल रिटायरमेंट फंड, 
                  टैक्स-फ्री राशि और अपेक्षित मासिक पेंशन की गणना करें।
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Verified Status */}
          <div className="mt-6 flex gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-emerald-900">
                बजट 2026: टैक्स लाभ जारी
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                वित्त वर्ष 2026-27 के लिए धारा 80CCD(1B) के तहत{' '}
                <strong>₹50,000</strong> की अतिरिक्त कटौती जारी रहेगी। 60%
                टैक्स-फ्री निकासी के नियम भी अपरिवर्तित हैं।
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Reuse English Client with Hindi Labels */}
            <NPSClient labels={HINDI_LABELS} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="nps-after-calc" type="banner" />
            </div>

            {/* Related Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य रिटायरमेंट टूल्स
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/epf-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  <Briefcase className="w-4 h-4" /> EPF कैलकुलेटर
                </Link>
                <Link
                  href="/hi/retirement-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  👴 रिटायरमेंट प्लान
                </Link>
              </div>
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  NPS (National Pension System) क्या है?
                </h2>
                <WikiText content={introContent} />
              </section>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* TAX BENEFITS */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS के टैक्स लाभ (अपडेटेड 2026)
                </h3>
                <WikiText content={taxContent} />
              </section>

              {/* WITHDRAWAL RULES */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  NPS मैच्योरिटी और निकासी के नियम
                </h3>
                <Card className="border-slate-200">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              नियम
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              विवरण
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              रिटायरमेंट आयु
                            </TableCell>
                            <TableCell>60 वर्ष</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              एकमुश्त निकासी (Lump Sum)
                            </TableCell>
                            <TableCell>
                              कुल राशि का अधिकतम 60% (टैक्स फ्री)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              एन्युटी (Annuity) खरीद
                            </TableCell>
                            <TableCell>
                              कम से कम 40% (मासिक पेंशन के लिए)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium text-slate-700">
                              पेंशन पर टैक्स
                            </TableCell>
                            <TableCell>
                              आपकी आय स्लैब के अनुसार टैक्स लगेगा
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* HOW IT HELPS */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  यह कैलकुलेटर कैसे मदद करता है?
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        पेंशन का अनुमान
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        अपनी अनुमानित मासिक पेंशन जानकर आप यह तय कर सकते हैं कि
                        क्या यह आपकी रिटायरमेंट जरूरतों के लिए पर्याप्त है।
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        कंपाउंडिंग की ताकत
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        चूंकि NPS एक लंबी अवधि का प्रोडक्ट है (25-30 साल),
                        रिटर्न में 1% का छोटा सा अंतर भी आपके फंड में लाखों का
                        फर्क ला सकता है।
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print mt-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                अक्सर पूछे जाने वाले प्रश्न (FAQs)
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {NPS_FAQS_HINDI.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`nps-faq-${index}`}
                    className="border-b"
                  >
                    <AccordionTrigger className="text-left font-medium text-slate-800 hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-28 space-y-6">
              <AdSlot id="nps-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

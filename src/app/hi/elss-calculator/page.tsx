import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import ELSSClient from '@/app/elss-calculator/ELSSClient'; // Reusing the same client component
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import HindiSidebar from '@/components/HindiSidebar';
import { autoLinkContent } from '@/utils/autoLinker';
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
import FAQSchema from '@/components/FAQSchema';
import { TrendingUp, Lock, ShieldCheck } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */
export const metadata: Metadata = {
  title: 'ELSS कैलकुलेटर 2025 - टैक्स बचाएं और वेल्थ बढ़ाएं (80C)',
  description:
    'ELSS म्यूचुअल फंड कैलकुलेटर: जानें कि ₹1.5 लाख तक निवेश करके आप कितना टैक्स बचा सकते हैं और 3 साल में कितना रिटर्न पा सकते हैं।',
  keywords: [
    'ELSS कैलकुलेटर',
    'टैक्स सेविंग म्यूचुअल फंड',
    'ELSS रिटर्न कैलकुलेटर',
    '80C टैक्स बचत',
    'SIP टैक्स कैलकुलेटर',
    'ELSS vs PPF हिंदी',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/elss-calculator/',
  },
  openGraph: {
    title: 'ELSS कैलकुलेटर - टैक्स बचाएं और पैसा बढ़ाएं',
    description:
      'धारा 80C के तहत ₹46,800 तक टैक्स बचाएं। अपने ELSS निवेश के रिटर्न की गणना करें।',
    url: 'https://fincado.com/hi/elss-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function ELSSHindiPage() {
  // Hindi Labels for the Calculator Component
  const hindiLabels = {
    monthlyInv: 'मासिक निवेश (₹)',
    rate: 'अपेक्षित रिटर्न (% वार्षिक)',
    timePeriod: 'समय अवधि (वर्ष)',
    maturityValue: 'कुल मैच्योरिटी राशि',
    invested: 'कुल निवेश',
    returns: 'कुल लाभ (Returns)',
    taxSaved: 'टैक्स बचत (अधिकतम)',
  };

  const introContent = autoLinkContent(`
    <p>
      <strong>ELSS (इक्विटी लिंक्ड सेविंग्स स्कीम)</strong> एकमात्र ऐसा म्यूचुअल फंड है जो 
      आयकर अधिनियम की <strong>धारा 80C</strong> के तहत टैक्स छूट के लिए योग्य है।
    </p>
    <p>
      यह दोहरे लाभ देता है: <strong>टैक्स की बचत</strong> और <strong>पैसे की बढ़ोतरी (Wealth Creation)</strong>। 
      आप प्रति वर्ष ₹1.5 लाख तक के निवेश पर टैक्स छूट का दावा कर सकते हैं, जिससे आप ₹46,800 तक 
      (30% टैक्स स्लैब के लिए) टैक्स बचा सकते हैं।
    </p>
  `);

  const featuresContent = autoLinkContent(`
    <ul>
      <li><strong>लॉक-इन अवधि:</strong> 3 साल (सभी 80C विकल्पों जैसे PPF या FD में सबसे कम)।</li>
      <li><strong>संभावित रिटर्न:</strong> 12% - 15% (ऐतिहासिक रूप से PPF/FD से बेहतर)।</li>
      <li><strong>निवेश का तरीका:</strong> SIP (सिस्टमैटिक इन्वेस्टमेंट प्लान) या एकमुश्त (Lump Sum)।</li>
      <li><strong>टैक्सेशन:</strong> ₹1.25 लाख से अधिक के लाभ (LTCG) पर 12.5% टैक्स लगता है।</li>
    </ul>
  `);

  // FAQ Items
  const faqItems = [
    {
      id: 'faq-1',
      question: 'क्या मैं 3 साल बाद पैसा निकाल सकता हूं?',
      answer:
        'हां, 3 साल की लॉक-इन अवधि समाप्त होने के बाद, आप अपनी यूनिट्स को रिडीम कर सकते हैं (बेच सकते हैं)। हालांकि, बेहतर रिटर्न के लिए 5-7 साल तक निवेशित रहने की सलाह दी जाती है।',
    },
    {
      id: 'faq-2',
      question: 'क्या ELSS में SIP की अनुमति है?',
      answer:
        'हां, ELSS में निवेश करने का सबसे अच्छा तरीका SIP है। हालांकि, याद रखें कि प्रत्येक SIP किस्त का अपना 3 साल का लॉक-इन पीरियड होता है।',
    },
    {
      id: 'faq-3',
      question: 'ELSS पर टैक्स कैसे लगता है?',
      answer:
        'ELSS से होने वाले लाभ को लॉन्ग टर्म कैपिटल गेन्स (LTCG) माना जाता है। एक वित्तीय वर्ष में ₹1.25 लाख तक का लाभ टैक्स-फ्री है। इस सीमा से ऊपर के लाभ पर 12.5% टैक्स लगता है।',
    },
    {
      id: 'faq-4',
      question: 'मैं ELSS से कितना टैक्स बचा सकता हूं?',
      answer:
        'आप धारा 80C के तहत ₹1.5 लाख तक निवेश कर सकते हैं। यदि आप 30% टैक्स ब्रैकेट में हैं, तो आप लगभग ₹46,800 (सेस सहित) टैक्स बचा सकते हैं।',
    },
    {
      id: 'faq-5',
      question: 'क्या ELSS, PPF से बेहतर है?',
      answer:
        'वेल्थ क्रिएशन के लिए, ELSS आम तौर पर बेहतर है क्योंकि यह PPF (7.1%) की तुलना में इक्विटी-लिंक्ड रिटर्न (12-15%) देता है। ELSS का लॉक-इन भी कम है (3 साल)। हालांकि, PPF जोखिम-मुक्त है।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="ELSS Calculator Hindi"
        description="Calculate returns and tax savings for ELSS Mutual Funds in Hindi."
        url="https://fincado.com/hi/elss-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        <BreadcrumbJsonLd
          items={[
            { name: 'होम', url: 'https://fincado.com/hi/' },
            {
              name: 'कैलकुलेटर',
              url: 'https://fincado.com/hi/calculators/',
            },
            {
              name: 'ELSS कैलकुलेटर',
              url: 'https://fincado.com/hi/elss-calculator/',
            },
          ]}
        />

        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="ELSS कैलकुलेटर – टैक्स बचाएं और वेल्थ बढ़ाएं" />
            <LanguageToggle path="/elss-calculator" />
          </div>

          <h1
            className="
            text-[clamp(1.8rem,4vw,2.5rem)]
            font-semibold
            leading-tight
            tracking-[-0.02em]
            text-slate-900
          "
          >
            <span className="block mb-2">ELSS कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              टैक्स बचत (80C) + वेल्थ क्रिएशन
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
            <p>
              अपने टैक्स-सेविंग म्यूचुअल फंड निवेश की मैच्योरिटी वैल्यू की गणना करें।
              जानें कि धारा 80C के तहत <strong>₹1.5 लाख तक टैक्स बचाते हुए</strong> आप कितनी संपत्ति बना सकते हैं।
            </p>
          `}
            />
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content mb-12">
            {/* CALCULATOR */}
            <ELSSClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-elss-after-calc" type="banner" />
            </div>

            {/* Mobile Tools Grid */}
            <div className="mobile-only-suggestions my-8 lg:hidden">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य टैक्स सेविंग विकल्प
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/ppf-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-4 py-3
                    text-sm font-medium text-slate-900
                    transition
                    hover:border-emerald-300
                    hover:bg-emerald-50
                  "
                >
                  🔒 <span>PPF कैलकुलेटर</span>
                </Link>
                <Link
                  href="/hi/sip-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-4 py-3
                    text-sm font-medium text-slate-900
                    transition
                    hover:border-emerald-300
                    hover:bg-emerald-50
                  "
                >
                  📈 <span>SIP कैलकुलेटर</span>
                </Link>
              </div>
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* Section 1: Intro */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      ELSS म्यूचुअल फंड क्या है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  {/* Section 2: Features */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS की मुख्य विशेषताएं
                    </h3>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={featuresContent} />
                    </div>
                  </section>

                  {/* 💰 AD 3 */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* Section 3: Comparison Table */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS बनाम PPF: त्वरित तुलना
                    </h3>

                    <Card className="border-none shadow-none m-0 ring-1 ring-slate-200">
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow className="bg-slate-50">
                                <TableHead className="w-30 font-bold text-slate-900">
                                  विशेषता
                                </TableHead>
                                <TableHead className="font-bold text-slate-900">
                                  ELSS
                                </TableHead>
                                <TableHead className="font-bold text-slate-900">
                                  PPF
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">
                                  रिटर्न
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  12% - 15% (अपेक्षित)
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  7.1% (निश्चित)
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  लॉक-इन
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  3 साल
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  15 साल
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  जोखिम
                                </TableCell>
                                <TableCell className="font-semibold text-amber-600">
                                  मध्यम/उच्च
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  शून्य जोखिम
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  टैक्स (लाभ पर)
                                </TableCell>
                                <TableCell className="text-slate-600">
                                  12.5% (यदि लाभ &gt; 1.25L)
                                </TableCell>
                                <TableCell className="font-semibold text-emerald-600">
                                  टैक्स फ्री
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>
                  </section>

                  {/* Section 4: Advantages Grid */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      ELSS क्यों चुनें? (Why Choose ELSS?)
                    </h3>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-5">
                          <div className="mb-2 text-emerald-600">
                            <Lock className="h-6 w-6" />
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            सबसे कम लॉक-इन
                          </h4>
                          <p className="text-sm text-slate-600">
                            सिर्फ 3 साल के लॉक-इन के साथ, ELSS अन्य विकल्पों
                            जैसे PPF (15 साल) या FD (5 साल) की तुलना में सबसे
                            अधिक लिक्विड है।
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-5">
                          <div className="mb-2 text-emerald-600">
                            <TrendingUp className="h-6 w-6" />
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            महंगाई को मात
                          </h4>
                          <p className="text-sm text-slate-600">
                            इक्विटी ही एकमात्र एसेट क्लास है जो लंबी अवधि (5+
                            वर्ष) में लगातार महंगाई (Inflation) को मात देती है।
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-slate-200 bg-slate-50">
                        <CardContent className="p-5">
                          <div className="mb-2 text-emerald-600">
                            <ShieldCheck className="h-6 w-6" />
                          </div>
                          <h4 className="font-semibold text-slate-900 mb-2">
                            SIP की सुविधा
                          </h4>
                          <p className="text-sm text-slate-600">
                            आपको बड़ी एकमुश्त राशि की आवश्यकता नहीं है। SIP के
                            जरिए सिर्फ ₹500 प्रति माह से टैक्स बचाना शुरू करें।
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न (FAQs)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={faqItems[0]?.id}
                    className="space-y-2"
                  >
                    {faqItems.map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="text-left text-slate-900 font-medium">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <AuthorBio />
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <HindiSidebar adId="hi-elss-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

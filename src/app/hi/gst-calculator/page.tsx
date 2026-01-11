import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GSTClient from '@/app/gst-calculator/GSTClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import LiveRateTable from '@/components/LiveRateTable'; // Added for Business Context
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import FAQSchema from '@/components/FAQSchema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Briefcase, ArrowRight } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'GST कैलकुलेटर – GST जोड़ें या हटाएं (Online Tool) | Fincado',
  description:
    'GST कैलकुलेटर हिंदी में: किसी भी राशि पर GST (5%, 12%, 18%, 28%) की गणना करें। जानें कि टैक्स के बाद फाइनल कीमत क्या होगी और रिवर्स कैलकुलेशन कैसे करें।',
  keywords: [
    'GST Calculator Hindi',
    'GST Calculation Formula Hindi',
    'Reverse GST Calculator Hindi',
    'जीएसटी कैलकुलेटर',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/gst-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/gst-calculator/',
    },
  },
  openGraph: {
    title: 'GST कैलकुलेटर – टैक्स गणना आसान बनाएं',
    description: 'मुफ्त टूल: GST जोड़ें या हटाएं और सही इनवॉइस बनाएं।',
    url: 'https://fincado.com/hi/gst-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiGSTPage() {
  // ✅ Hindi Labels
  const hindiLabels = {
    modeLabel: 'कैलकुलेशन मोड (Mode)',
    addMode: 'GST जोड़ें (+)',
    removeMode: 'GST हटाएं (-)',
    amountLabelAdd: 'मूल राशि (Net Price)',
    amountLabelRemove: 'कुल राशि (Gross Price/MRP)',
    rateLabel: 'GST दर (%)',
    resultNet: 'टैक्स हटाने के बाद (Net Price)',
    resultGross: 'टैक्स जोड़ने के बाद (Gross Price)',
    resultTax: 'कुल टैक्स (Total Tax)',
    resultBase: 'मूल कीमत (Base Price)',
    taxSplit: 'टैक्स विभाजन (CGST/SGST)',
  };

  // ✅ FAQ Items (Hindi)
  const gstFaqs = [
    {
      id: 'faq-1',
      question: 'GST पंजीकरण (Registration) किसे कराना चाहिए?',
      answer:
        'जिन व्यवसायों का वार्षिक कारोबार ₹40 लाख (सेवाओं के लिए ₹20 लाख) से अधिक है, उन्हें पंजीकरण कराना अनिवार्य है। ई-कॉमर्स विक्रेताओं के लिए यह सीमा लागू नहीं होती, उन्हें अनिवार्य रूप से पंजीकरण कराना होता है।',
    },
    {
      id: 'faq-2',
      question: 'HSN और SAC कोड क्या हैं?',
      answer:
        'HSN (Harmonized System of Nomenclature) वस्तुओं के लिए उपयोग किया जाता है, जबकि SAC (Services Accounting Code) सेवाओं के लिए है। ये कोड जीएसटी दर निर्धारित करते हैं।',
    },
    {
      id: 'faq-3',
      question: 'रिवर्स चार्ज मैकेनिज्म (RCM) क्या है?',
      answer:
        'सामान्यतः सप्लायर टैक्स जमा करता है, लेकिन RCM में खरीदार (Recipient) को सरकार को GST जमा करना होता है। यह तब लागू होता है जब आप किसी अपंजीकृत डीलर से सामान खरीदते हैं।',
    },
  ];

  return (
    <>
      <CalculatorSchema
        name="GST Calculator Hindi"
        description="Calculate GST inclusive and exclusive amounts in Hindi."
        url="https://fincado.com/hi/gst-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'GST कैलकुलेटर',
            url: 'https://fincado.com/hi/gst-calculator/',
          },
        ]}
      />

      <FAQSchema
        faqs={gstFaqs.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <main className="container px-4 py-6 sm:py-8">
        {/* --- HEADER --- */}
        <header className="no-print my-4">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="GST कैलकुलेटर (Hindi)" />
            <LanguageToggle path="/gst-calculator" />
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
            <span className="block mb-2">GST कैलकुलेटर</span>
            <span className="block text-base sm:text-lg font-medium text-lime-700 mb-4">
              सामान और सेवाओं पर टैक्स (GST) की गणना करें
            </span>
          </h1>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <p>
              यह टूल आपको किसी भी सामान या सेवा पर GST की गणना करने में मदद करता
              है। आप <strong>GST जोड़ भी सकते हैं</strong> और MRP से{' '}
              <strong>GST हटा (Reverse Calculate)</strong> भी सकते हैं।
            </p>
          </div>
        </header>

        {/* --- LAYOUT GRID --- */}
        <div className="layout-grid">
          <div className="main-content">
            {/* CALCULATOR */}
            <GSTClient labels={hindiLabels} />

            {/* 💰 AD: AFTER CALCULATOR */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hi-gst-mid" type="banner" />
            </div>

            {/* LIVE RATES */}
            <LiveRateTable type="personalLoan" />

            {/* MOBILE ONLY TOOLS */}
            <div className="mobile-only-suggestions my-8 lg:hidden no-print">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                बिजनेस टूल्स
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/sip-calculator"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  📈 SIP कैलकुलेटर
                </Link>
                <Link
                  href="/hi/loans/personal-loan"
                  className="
                    flex items-center justify-center gap-2
                    rounded-lg border border-slate-200
                    bg-white px-3 py-3
                    text-sm font-medium text-slate-900
                    shadow-sm transition hover:border-lime-300 hover:bg-lime-50
                  "
                >
                  💸 बिज़नेस लोन
                </Link>
              </div>
            </div>

            {/* PROMO BOX */}
            <Card className="no-print my-8 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Briefcase className="h-5 w-5" />
                </div>

                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    क्या आप बिज़नेस चलाते हैं?
                  </strong>

                  <Link
                    href="/guides/gst-guide" // Fallback to English if Hindi guide absent
                    className="group inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800"
                  >
                    <span>पढ़ें: GST रिटर्न फाइलिंग की पूरी जानकारी</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* --- SEO ARTICLE --- */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  {/* SECTION 1: WHAT IS GST */}
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      GST क्या है? (What is GST?)
                    </h2>
                    <div className="text-slate-700 leading-relaxed space-y-4">
                      <p>
                        GST (Goods and Services Tax) एक अप्रत्यक्ष कर (Indirect
                        Tax) है जो पूरे भारत में वस्तुओं और सेवाओं की सप्लाई पर
                        लगता है। इसे &apos;वन नेशन, वन टैक्स&apos; के सिद्धांत
                        पर लाया गया था।
                      </p>
                    </div>
                  </section>

                  {/* SECTION 2: SLAB RATES */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      GST दरें (Tax Slabs 2025)
                    </h3>

                    <div className="overflow-x-auto rounded-lg border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-slate-50">
                            <TableHead className="font-bold text-slate-900">
                              दर (Rate)
                            </TableHead>
                            <TableHead className="font-bold text-slate-900">
                              शामिल वस्तुएं
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell className="font-medium">
                              0% (छूट)
                            </TableCell>
                            <TableCell>
                              ताजा दूध, सब्जियां, किताबें, समाचार पत्र
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">3%</TableCell>
                            <TableCell>सोना, चांदी, हीरे</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">5%</TableCell>
                            <TableCell>
                              पैकेट बंद खाना, दवाएं, कपड़े (सस्ते)
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">12%</TableCell>
                            <TableCell>मोबाइल फोन, प्रोसेस फूड</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">18%</TableCell>
                            <TableCell>
                              इलेक्ट्रॉनिक्स, आईटी सेवाएं, रेस्तरां
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell className="font-medium">28%</TableCell>
                            <TableCell>
                              लक्जरी कार, सीमेंट, तंबाकू (+ सेस)
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </section>

                  {/* AD SLOT */}
                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  {/* SECTION 3: COMPONENTS */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      GST के प्रकार
                    </h3>
                    [Image of CGST SGST IGST flow diagram]
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                      <li>
                        <strong>CGST:</strong> यह केंद्र सरकार (Central Govt) के
                        पास जाता है।
                      </li>
                      <li>
                        <strong>SGST:</strong> यह राज्य सरकार (State Govt) के
                        पास जाता है।
                      </li>
                      <li>
                        <strong>IGST:</strong> यह तब लगता है जब आप एक राज्य से
                        दूसरे राज्य में व्यापार (Inter-state) करते हैं।
                      </li>
                    </ul>
                  </section>

                  {/* SECTION 4: FORMULA */}
                  <section className="space-y-6">
                    <h3 className="text-xl font-semibold text-slate-900">
                      रिवर्स GST फॉर्मूला (Reverse Calculation)
                    </h3>
                    <p className="text-slate-700">
                      अक्सर हमें MRP पता होती है और हमें बिना टैक्स वाली मूल
                      कीमत (Base Price) निकालनी होती है। इसका सूत्र है:
                    </p>
                    [Image of GST calculation formula example]
                    <div className="overflow-x-auto rounded-lg border bg-slate-50 p-4">
                      <BlockMath math="\text{Base Price} = \frac{\text{Total MRP}}{1 + (\text{GST Rate} / 100)}" />
                    </div>
                    <div className="text-slate-700 leading-relaxed">
                      <p>
                        <strong>उदाहरण:</strong>
                      </p>
                      <p>
                        यदि किसी वस्तु की MRP ₹118 है और GST दर 18% है:
                        <br />
                        मूल कीमत = 118 / 1.18 = <strong>₹100</strong>
                        <br />
                        GST राशि = ₹18
                      </p>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* --- FAQ SECTION --- */}
            <section className="no-print my-12">
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
                    defaultValue={gstFaqs[0]?.id}
                    className="space-y-2"
                  >
                    {gstFaqs.map((faq) => (
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
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6 mb-12">
              <HindiSidebar adId="hi-gst-sidebar" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HindiRentReceiptClient from './HindiRentReceiptClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { ArrowRight, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title: 'फ्री रेंट रसीद (Rent Receipt) जेनरेटर 2026 – HRA छूट के लिए PDF',
  description:
    'HRA टैक्स छूट पाने के लिए मुफ्त में रेंट रसीद (Rent Receipt) बनाएं और PDF डाउनलोड करें। रेवेन्यू स्टाम्प नियम और मकान मालिक के PAN की पूरी जानकारी। HR द्वारा 100% स्वीकृत।',
  keywords: [
    'rent receipt generator in hindi',
    'रेंट रसीद',
    'मकान किराया रसीद फॉर्मेट',
    'Rent Receipt for HRA',
    'free rent receipt PDF',
    'HRA rent receipt 2026',
    'generate rent receipt online',
    'Section 10(13A) receipt hindi',
    'HRA proof submission',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/rent-receipt-generator/',
    languages: {
      'en-IN': 'https://fincado.com/rent-receipt-generator/',
      'hi-IN': 'https://fincado.com/hi/rent-receipt-generator/',
    },
  },
  openGraph: {
    title: 'फ्री रेंट रसीद जेनरेटर (PDF डाउनलोड) 2026',
    description:
      'HRA छूट के लिए HR द्वारा स्वीकृत रेंट रसीद तुरंत बनाएं। प्रोफेशनल फॉर्मेट और रेवेन्यू स्टाम्प के नियमों के साथ।',
    url: 'https://fincado.com/hi/rent-receipt-generator/',
    type: 'website',
  },
};

export default function HindiRentReceiptPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>रेंट रसीद (Rent Receipt)</strong> किरायेदार (Tenant) द्वारा मकान मालिक (Landlord) को दिए गए किराए का एक लिखित प्रमाण है। 
    भारत में नौकरीपेशा (Salaried) लोगों को <strong>House Rent Allowance (HRA)</strong> पर टैक्स छूट पाने के लिए अपने HR विभाग को ये रसीदें (Investment Proof) के तौर पर जमा करनी होती हैं। 
    यह इनकम टैक्स एक्ट के <strong>सेक्शन 10(13A)</strong> के तहत आता है। बिना रेंट रसीद के आपका पूरा HRA टैक्सेबल हो जाता है, जिससे आपकी <a href="/hi/salary-calculator/">इन-हैंड सैलरी</a> कम हो जाती है।
  </p>
  `);

  const rulesContent = autoLinkContent(`
    <ul class="list-disc pl-5 space-y-2">
      <li><strong>सालाना किराया ₹1,00,000 से अधिक है:</strong> तो मकान मालिक का PAN कार्ड देना अनिवार्य है। यदि उनके पास PAN नहीं है, तो आपको उनसे एक डिक्लेरेशन (Declaration form) भरवाकर HR को देना होगा।</li>
      <li><strong>रेवेन्यू स्टाम्प (Revenue Stamp):</strong> 1 रुपये का रेवेन्यू स्टाम्प केवल तभी लगाना ज़रूरी है जब आपने किराए का भुगतान <strong>कैश (नकद)</strong> में किया हो और एक रसीद की रकम ₹5,000 से अधिक हो। <strong>ऑनलाइन ट्रांसफर (NEFT/UPI/Cheque) के मामले में रेवेन्यू स्टाम्प की कोई कानूनी आवश्यकता नहीं है।</strong></li>
      <li><strong>Old vs New Regime:</strong> याद रखें, आप HRA टैक्स छूट का लाभ केवल तभी उठा सकते हैं जब आप <strong>पुराने टैक्स रिजीम (Old Tax Regime)</strong> का चुनाव करते हैं। हमारे <a href="/hi/income-tax-calculator/">इनकम टैक्स कैलकुलेटर</a> का उपयोग करके अपनी टैक्स बचत की तुलना करें।</li>
    </ul>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question:
        'क्या रेंट रसीद पर रेवेन्यू स्टाम्प (Revenue Stamp) लगाना अनिवार्य है?',
      answer:
        '1 रुपये का रेवेन्यू स्टाम्प कानूनी रूप से केवल तभी आवश्यक है जब किराए का भुगतान नकद (CASH) में किया गया हो और वह ₹5,000 प्रति रसीद से अधिक हो। यदि आप चेक, NEFT, RTGS या UPI के माध्यम से अपना किराया देते हैं, तो रेवेन्यू स्टाम्प की आवश्यकता नहीं है। आपके मकान मालिक को केवल रसीद पर हस्ताक्षर (Signature) करने होंगे।',
    },
    {
      id: 'faq-2',
      question: 'क्या मुझे अपने मकान मालिक का PAN कार्ड चाहिए?',
      answer:
        'हाँ, यदि आपका वार्षिक किराया भुगतान ₹1,00,000 से अधिक है (यानी ₹8,333 प्रति माह से अधिक), तो आपको HRA का दावा करने के लिए अपने नियोक्ता (Employer) को अपने मकान मालिक का PAN जमा करना होगा।',
    },
    {
      id: 'faq-3',
      question: 'क्या मैं पूरे साल के लिए एक ही रसीद बना सकता हूँ?',
      answer:
        'कानूनी रूप से यह संभव है, लेकिन अधिकांश कॉर्पोरेट HR विभाग और इनकम टैक्स पोर्टल मासिक, त्रैमासिक (Quarterly) या छमाही रसीदें पसंद करते हैं। सबसे सुरक्षित तरीका यह है कि प्रत्येक तिमाही (Quarter) या महीने के लिए एक रसीद जनरेट करें।',
    },
    {
      id: 'faq-4',
      question:
        'अगर मैं अपने माता-पिता को किराया देता हूँ तो क्या मुझे HRA मिल सकता है?',
      answer:
        'हाँ, आप अपने माता-पिता को किराया देकर HRA का दावा कर सकते हैं, बशर्ते संपत्ति उनके नाम पर पंजीकृत (Registered) हो और वे अपने वार्षिक इनकम टैक्स रिटर्न (ITR) में इस किराये की आय (Rental Income) को दिखाएं। इसके लिए भी आपको रेंट रसीद जनरेट करनी होगी और सबूत के लिए बैंक ट्रांसफर के ज़रिये पैसे भेजना सबसे अच्छा है।',
    },
    {
      id: 'faq-5',
      question:
        'क्या यह रेंट रसीद का फॉर्मेट सभी कंपनियों द्वारा स्वीकार किया जाता है?',
      answer:
        'हाँ। यह फॉर्मेट सेक्शन 10(13A) की सटीक आवश्यकताओं का पालन करता है (यही कारण है कि यह रसीद अंग्रेजी में जनरेट होती है) और इसे लगभग सभी भारतीय कंपनियों और सरकारी विभागों द्वारा स्वीकार किया जाता है।',
    },
    {
      id: 'faq-6',
      question:
        'अगर मेरा मकान मालिक हस्ताक्षर (Sign) करने से मना कर दे तो क्या होगा?',
      answer:
        'आप अभी भी बैंक ट्रांसफर के सबूत (Bank statement) और एक सेल्फ-डिक्लेरेशन (Self-declaration) जमा करके HRA का दावा कर सकते हैं। हालांकि, हस्ताक्षर की हुई रेंट रसीद सबसे मजबूत और सुरक्षित प्रमाण होती है।',
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'रेंट रसीद जेनरेटर',
            url: 'https://fincado.com/hi/rent-receipt-generator/',
          },
        ]}
      />

      <CalculatorSchema
        name="रेंट रसीद जेनरेटर (Rent Receipt Generator)"
        description="HRA छूट के लिए आसानी से अपनी मकान किराया रसीद बनाएं और PDF डाउनलोड करें।"
        url="https://fincado.com/hi/rent-receipt-generator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="रेंट रसीद जेनरेटर – HRA के लिए फ्री PDF" />
            <LanguageToggle path="/rent-receipt-generator" />
          </div>
          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            रेंट रसीद (Rent Receipt) जेनरेटर
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-1">
              HRA प्रूफ के लिए फ्री PDF रसीद बनाएं
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ वित्तीय वर्ष (FY) 2026-27 के लिए अपडेटेड
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              अप्रैल 2026
            </span>
            <span className="text-xs">• सेक्शन 10(13A) के अनुकूल</span>
          </div>

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="receipt-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
                <p>
                  अपने HR विभाग में जमा करने के लिए प्रोफेशनल <strong>रेंट रसीद (Rent Receipt)</strong> तुरंत जनरेट करें। नीचे अपना विवरण भरें, और सीधे PDF डाउनलोड करें या प्रिंट करें। किसी साइन-अप की आवश्यकता नहीं है। हाउस रेंट अलाउंस (HRA) टैक्स छूट का दावा करने के लिए यह आवश्यक है।
                </p>
              `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <Alert className="no-print mb-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Printer className="h-4 w-4 text-emerald-600 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong>PDF में कैसे सेव करें (Save as PDF):</strong> फॉर्म
                भरें, नीचे दिए गए हरे रंग के प्रिंट बटन पर क्लिक करें, और अपने
                ब्राउज़र के प्रिंट डायलॉग बॉक्स में Destination के रूप में{' '}
                &quot;Save as PDF&quot; चुनें।
              </AlertDescription>
            </Alert>

            {/* The Generator Component */}
            <HindiRentReceiptClient />

            {/* Related Tools Links */}
            <div className="mt-10 flex flex-wrap gap-3 no-print border-t pt-8 border-slate-100">
              <Link
                href="/hi/hra-calculator/"
                className="inline-flex items-center rounded-md bg-blue-50 px-4 py-2.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
              >
                <Image
                  src="/images/icons/tax.svg"
                  alt="Tax icon"
                  width={16}
                  height={16}
                  className="mr-2"
                />{' '}
                HRA टैक्स छूट कैलकुलेट करें
              </Link>
              <Link
                href="/hi/salary-calculator/"
                className="inline-flex items-center rounded-md bg-emerald-50 px-4 py-2.5 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
              >
                इन-हैंड (In-Hand) सैलरी चेक करें{' '}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

            {/* Expanded Educational Content */}
            <article className="no-print mt-16 space-y-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-10">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      आपको रेंट रसीद की आवश्यकता क्यों है?
                    </h2>
                    <div className="text-slate-700 leading-relaxed">
                      <WikiText content={introContent} />
                    </div>
                  </section>

                  <div className="no-print my-8 flex justify-center">
                    <AdSlot type="square" label="Advertisement" />
                  </div>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      HRA छूट के महत्वपूर्ण नियम (2026-27)
                    </h3>
                    <div className="text-slate-700 leading-relaxed bg-brand-50 border border-brand-200 p-6 rounded-xl">
                      <WikiText content={rulesContent} />
                    </div>
                  </section>

                  {/* HRA Exemption Table */}
                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      HRA छूट की गणना कैसे होती है? (Quick Reference)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left p-4 border text-slate-700">
                              शर्तें (इनमें से जो सबसे कम हो)
                            </th>
                            <th className="text-left p-4 border text-slate-700">
                              टैक्स छूट की राशि
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-4 border font-medium">
                              1. आपको मिलने वाला वास्तविक HRA
                            </td>
                            <td className="p-4 border text-slate-600">
                              Actual HRA received
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium">
                              2. आपके द्वारा चुकाया गया किराया - बेसिक सैलरी का
                              10%
                            </td>
                            <td className="p-4 border text-slate-600">
                              Rent paid - 10% Basic
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium">
                              3. बेसिक सैलरी का 50% (मेट्रो शहर) या 40%
                              (गैर-मेट्रो)
                            </td>
                            <td className="p-4 border text-slate-600">
                              50%/40% of Basic
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </article>

            {/* FAQ Section */}
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
                        <AccordionTrigger className="text-left text-slate-900">
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

            <div className="no-print mt-8">
              <AuthorBio />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="receipt-sidebar-hi" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

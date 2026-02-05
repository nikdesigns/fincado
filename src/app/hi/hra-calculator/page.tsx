import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import HRAClient from '@/app/hra-calculator/HRAClient'; // Reuse existing logic
import FinancialNavWidget from '@/components/FinancialNavWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';
import LanguageToggle from '@/components/LanguageToggle';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { autoLinkContent } from '@/utils/autoLinker';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import FAQSchema from '@/components/FAQSchema';
import { BadgeCheck, AlertTriangle, Calculator } from 'lucide-react';

/* ---------------- SEO METADATA (HINDI) ---------------- */
export const metadata: Metadata = {
  title: 'HRA कैलकुलेटर 2026 – हाउस रेंट अलाउंस (मकान किराया भत्ता) छूट',
  description:
    'आयकर (FY 2026-27) के लिए HRA छूट की गणना करें। पुरानी कर व्यवस्था (Old Regime) के तहत मेट्रो और गैर-मेट्रो शहरों के लिए टैक्स-फ्री किराए की जांच करें।',
  keywords: [
    'HRA Calculator Hindi',
    'House Rent Allowance Exemption Hindi',
    'HRA Calculation Formula',
    'Income Tax 80C Hindi',
    'Old Tax Regime HRA',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/hra-calculator/',
  },
  openGraph: {
    title: 'HRA कैलकुलेटर – किराए पर टैक्स बचाएं',
    description:
      'धारा 10(13A) के तहत अपने कर-मुक्त हाउस रेंट अलाउंस (HRA) की गणना तुरंत करें।',
    url: 'https://fincado.com/hi/hra-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

const HRA_FAQS_HINDI = [
  {
    question: 'क्या नई कर व्यवस्था (New Tax Regime) में HRA छूट मिलती है?',
    answer:
      'नहीं। नई कर व्यवस्था (जो FY 2026-27 के लिए डिफ़ॉल्ट है) में HRA छूट की अनुमति नहीं है। HRA का लाभ लेने के लिए आपको पुरानी कर व्यवस्था (Old Regime) को चुनना होगा।',
  },
  {
    question: 'क्या HRA के लिए मकान मालिक का पैन कार्ड जरूरी है?',
    answer:
      'हाँ, यदि आपका वार्षिक किराया भुगतान ₹1,00,000 से अधिक है, तो HRA छूट का दावा करने के लिए मकान मालिक का पैन नंबर देना अनिवार्य है।',
  },
  {
    question: 'क्या मैं माता-पिता के साथ रहकर HRA क्लेम कर सकता हूँ?',
    answer:
      'हाँ, यदि आप अपने माता-पिता को किराया देते हैं और रसीद प्राप्त करते हैं, तो आप HRA का दावा कर सकते हैं। हालांकि, आपके माता-पिता को इस आय को अपने टैक्स रिटर्न में दिखाना होगा।',
  },
  {
    question: 'HRA गणना के लिए कौन से शहर मेट्रो माने जाते हैं?',
    answer:
      'केवल चार शहरों को HRA के लिए मेट्रो (50%) माना जाता है: दिल्ली, मुंबई, कोलकाता और चेन्नई। अन्य सभी शहर (जैसे बैंगलोर, पुणे, हैदराबाद) गैर-मेट्रो (40%) माने जाते हैं।',
  },
];

/* ---------------- HINDI LABELS ---------------- */
const HINDI_LABELS = {
  basicSalary: 'मूल वेतन + DA (वार्षिक)',
  da: 'महंगाई भत्ता (DA)', // (Usually combined in basic for simplified input, but kept if needed)
  hraReceived: 'प्राप्त HRA (वार्षिक)',
  rentPaid: 'चुकाया गया किराया (वार्षिक)',
  cityType: 'शहर का प्रकार',
  exemptHRA: 'कर-मुक्त HRA (Exempt)',
  taxableHRA: 'कर-योग्य HRA (Taxable)',
  metro: 'मेट्रो (50%)',
  nonMetro: 'गैर-मेट्रो (40%)',
};

/* ---------------- PAGE ---------------- */

export default function HRAPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>हाउस रेंट अलाउंस (HRA)</strong> नियोक्ताओं द्वारा कर्मचारियों को उनके आवास खर्चों को पूरा करने के लिए दिया जाने वाला वेतन का एक हिस्सा है। 
      आयकर अधिनियम की <strong>धारा 10(13A)</strong> के तहत, HRA का एक हिस्सा कर-मुक्त (Tax-Free) हो सकता है, बशर्ते आप किराए के घर में रहते हों।
    </p>
    <p class="mt-2">
      यह कैलकुलेटर आपके वेतन, किराए और शहर के आधार पर सटीक <strong>कर-मुक्त HRA</strong> राशि निर्धारित करने में आपकी मदद करता है।
    </p>
  `);

  const logicContent = autoLinkContent(`
    <p>
      HRA छूट की गणना निम्नलिखित तीन राशियों में से जो भी <strong>सबसे कम</strong> हो, उसके आधार पर की जाती है:
    </p>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>वास्तविक प्राप्त HRA:</strong> जो राशि आपको नियोक्ता से मिलती है।</li>
      <li><strong>किराया - वेतन का 10%:</strong> वास्तविक चुकाया गया किराया माइनस (मूल वेतन + DA) का 10%।</li>
      <li><strong>वेतन का 50% या 40%:</strong> मेट्रो शहरों (दिल्ली, मुंबई, कोलकाता, चेन्नई) के लिए 50% और गैर-मेट्रो शहरों के लिए 40%।</li>
    </ul>
  `);

  return (
    <>
      <CalculatorSchema
        name="HRA Calculator Hindi"
        description="Calculate House Rent Allowance (HRA) tax exemption limits in Hindi."
        url="https://fincado.com/hi/hra-calculator/"
      />

      <FAQSchema
        faqs={HRA_FAQS_HINDI.map((faq) => ({
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
              name: 'HRA Calculator',
              url: 'https://fincado.com/hi/hra-calculator/',
            },
          ]}
        />

        <header className="no-print my-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <ShareTools title="HRA कैलकुलेटर 2026" />
            <LanguageToggle path="/hra-calculator/" />
          </div>

          <h1 className="text-[clamp(1.9rem,4vw,2.6rem)] font-semibold leading-tight tracking-[-0.02em] text-slate-900">
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              HRA कैलकुलेटर
            </span>
            <span className="block mt-2 text-base sm:text-lg font-medium text-emerald-700">
              मकान किराया भत्ता (HRA) छूट की गणना करें
            </span>
          </h1>

          <div className="mt-4 max-w-3xl text-slate-500 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  अपने वेतन पर टैक्स बचाएं। जानें कि आयकर अधिनियम की धारा 10(13A) के तहत 
                  आपका कितना हाउस रेंट अलाउंस <strong>टैक्स-फ्री</strong> है।
                </p>
              `}
            />
          </div>

          {/* ✅ Budget 2026 Alert (Hindi) */}
          <div className="mt-6 flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg items-start shadow-sm max-w-2xl">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold text-amber-900">
                महत्वपूर्ण: केवल पुरानी कर व्यवस्था (Old Regime)
              </p>
              <p className="text-xs text-amber-800 leading-relaxed">
                नई कर व्यवस्था (New Tax Regime) के तहत HRA छूट उपलब्ध{' '}
                <strong>नहीं</strong> है। FY 2026-27 में इस लाभ का दावा करने के
                लिए आपको Old Regime चुनना होगा।
              </p>
            </div>
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Using English Client with Hindi Labels */}
            <HRAClient labels={HINDI_LABELS} />

            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="hra-after-calc" type="banner" />
            </div>

            {/* Related Tools */}
            <div className="mobile-only-suggestions my-8">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                अन्य टैक्स टूल्स
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/hi/income-tax-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  <Calculator className="w-4 h-4" /> टैक्स कैलकुलेटर
                </Link>
                <Link
                  href="/hi/sip-calculator/"
                  className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
                >
                  📈 SIP कैलकुलेटर
                </Link>
              </div>
            </div>

            {/* --- RICH SEO CONTENT --- */}
            <article className="article content-for-seo no-print space-y-10">
              {/* INTRO */}
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  HRA छूट को समझें
                </h2>
                <WikiText content={introContent} />
              </section>

              <div className="no-print my-8 flex justify-center">
                <AdSlot type="square" label="Advertisement" />
              </div>

              {/* CALCULATION LOGIC */}
              <section className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900">
                  HRA छूट की गणना कैसे होती है?
                </h3>
                <WikiText content={logicContent} />

                {/* Visual Cards for 3 Rules */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
                        1
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        वास्तविक HRA
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (नियोक्ता से प्राप्त)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
                        2
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        किराया - 10% वेतन
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (अतिरिक्त किराया)
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200 bg-slate-50">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mb-3">
                        3
                      </div>
                      <p className="text-sm font-medium text-slate-800">
                        वेतन का 50% / 40%
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        (मेट्रो / गैर-मेट्रो)
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-xs text-center text-slate-500 italic">
                  *वेतन = मूल वेतन (Basic) + महंगाई भत्ता (DA)
                </p>
              </section>

              {/* FORMULA */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  गणितीय सूत्र (Formula)
                </h3>
                <div className="py-6 overflow-x-auto bg-slate-50 px-4 rounded-md border border-slate-200">
                  <BlockMath math="\text{Exempt} = \min(\text{HRA}, \text{Rent} - 0.1 \times \text{Salary}, 0.5 \times \text{Salary})" />
                </div>
              </section>

              {/* DOCUMENTS */}
              <section className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">
                  HRA क्लेम करने के लिए आवश्यक दस्तावेज
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 bg-white">
                    <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">
                        किराये की रसीद (Rent Receipts)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        मासिक या त्रैमासिक रसीद अनिवार्य है। ₹5000 से अधिक नकद
                        पर राजस्व टिकट (Revenue Stamp) आवश्यक है।
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-slate-100 bg-white">
                    <BadgeCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900">
                        मकान मालिक का पैन (PAN)
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        यदि वार्षिक किराया ₹1,00,000 से अधिक है, तो यह अनिवार्य
                        है।
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </article>

            {/* FAQs */}
            <section className="article no-print mt-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">
                अक्सर पूछे जाने वाले प्रश्न (FAQs)
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {HRA_FAQS_HINDI.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`hra-faq-${index}`}
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
              <AdSlot id="hra-sidebar" type="box" />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
// Note: If you want the calculator UI itself in Hindi, you can duplicate SalaryClient to HindiSalaryClient later,
// but reusing the English one is standard practice for numbers/math in India.
import SalaryClient from './HindiSalaryClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
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
import { BookOpen, ArrowRight, Info } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';

/* ---------------- SEO METADATA (HINDI) ---------------- */

export const metadata: Metadata = {
  title: 'सैलरी कैलकुलेटर 2026: CTC से इन-हैंड (Take Home) सैलरी निकालें',
  description:
    'अपने CTC से हर महीने मिलने वाली सटीक इन-हैंड सैलरी की गणना करें। नए टैक्स रिजीम, TDS, PF और HRA कटौती के साथ भारत का सबसे बेहतरीन सैलरी कैलकुलेटर।',
  keywords: [
    'सैलरी कैलकुलेटर',
    'इन हैंड सैलरी कैलकुलेटर',
    'CTC से इन हैंड',
    'टेक होम सैलरी',
    'TDS कैलकुलेटर',
    'PF कटौती कैलकुलेटर',
    'सैलरी ब्रेकअप',
    'In Hand Salary in Hindi'
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/salary-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/salary-calculator/',
      'hi-IN': 'https://fincado.com/hi/salary-calculator/',
    },
  },
  openGraph: {
    title: 'CTC से इन-हैंड सैलरी कैलकुलेटर (बजट 2026 अपडेटेड)',
    description:
      'जानें आपकी असल इन-हैंड सैलरी कितनी होगी। नए टैक्स रिजीम (New Tax Regime), TDS और PF कटौती के साथ सटीक गणना।',
    url: 'https://fincado.com/hi/salary-calculator/',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ---------------- PAGE (Server Component) ---------------- */

export default function HindiSalaryCalculatorPage() {
  const introContent = autoLinkContent(`
    <p>
    <strong>CTC (Cost to Company)</strong> वह कुल राशि है जो कोई कंपनी एक वर्ष में आप पर खर्च करती है, लेकिन यह वह राशि नहीं है जो आपके बैंक खाते में आती है। 
    आपकी <strong>इन-हैंड (Take-Home) सैलरी</strong> आपके ग्रॉस सैलरी से कंपनी के योगदान (जैसे Employer PF और ग्रेच्युटी) को घटाने के बाद बनती है, 
    और फिर उसमें से आपके व्यक्तिगत टैक्स (TDS, प्रोफेशनल टैक्स) और Employee PF को काटा जाता है। 
    अपनी टेक-होम सैलरी को बढ़ाने के लिए हमारे <a href="/hi/income-tax-calculator/">इनकम टैक्स कैलकुलेटर</a> का उपयोग करके अपनी टैक्स देनदारी (Tax Liability) की तुलना करें।
  </p>
  `);

  const benefitsContent = autoLinkContent(`
    <p>
      यह कैलकुलेटर आपके जॉब ऑफर लेटर (Job Offer Letter) को सही से समझने में मदद करता है। अपनी सटीक मासिक टेक-होम सैलरी जानकर, 
      आप अपने घर के किराए का बजट बना सकते हैं, हमारे <a href="/hi/emi-calculator/">EMI कैलकुलेटर</a> का उपयोग करके अपने लोन की योजना बना सकते हैं, 
      और यह सुनिश्चित कर सकते हैं कि नौकरी बदलते समय आप सही CTC की मांग कर रहे हैं।
    </p>
  `);

  const faqItems = [
    {
      id: 'faq-1',
      question: 'CTC और इन-हैंड सैलरी (In-Hand Salary) में क्या अंतर है?',
      answer:
        'CTC (Cost to Company) कंपनी द्वारा आप पर किया गया कुल खर्च है, जिसमें Employer PF, ग्रेच्युटी और बीमा शामिल है। इन-हैंड सैलरी वह पैसा है जो सभी कटौतियों (Employer PF, Employee PF, TDS और प्रोफेशनल टैक्स) के बाद वास्तव में आपके बैंक खाते में आता है।',
    },
    {
      id: 'faq-2',
      question: 'मेरी सैलरी पर PF की गणना कैसे की जाती है?',
      answer:
        'PF (Provident Fund) आमतौर पर आपकी बेसिक सैलरी (Basic Salary) का 12% होता है। इसमें कर्मचारी (आप) और नियोक्ता (कंपनी) दोनों 12-12% का योगदान करते हैं। कंपनी का हिस्सा आपके CTC का हिस्सा होता है, लेकिन आपकी ग्रॉस सैलरी का नहीं।',
    },
    {
      id: 'faq-3',
      question: 'मेरी इन-हैंड सैलरी मेरे CTC से इतनी कम क्यों होती है?',
      answer:
        'आपकी इन-हैंड सैलरी कम होती है क्योंकि ग्रॉस सैलरी तक पहुंचने से पहले CTC से Employer PF और ग्रेच्युटी घटा दी जाती है। फिर उस ग्रॉस सैलरी से आपका अपना PF योगदान (Employee PF), प्रोफेशनल टैक्स और इनकम टैक्स (TDS) काटा जाता है।',
    },
    {
      id: 'faq-4',
      question:
        'क्या यह कैलकुलेटर नए टैक्स रिजीम (New Tax Regime) का उपयोग करता है?',
      answer:
        'हाँ, यह कैलकुलेटर डिफ़ॉल्ट रूप से नए टैक्स रिजीम के आधार पर आपके इनकम टैक्स (TDS) का अनुमान लगाता है, जिसमें ₹75,000 का स्टैंडर्ड डिडक्शन शामिल है और ₹7 लाख तक की टैक्सेबल इनकम पर रिबेट मिलता है।',
    }
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'कैलकुलेटर', url: 'https://fincado.com/hi/calculators/' },
          {
            name: 'सैलरी कैलकुलेटर',
            url: 'https://fincado.com/hi/salary-calculator/',
          }
        ]}
      />

      <CalculatorSchema
        name="सैलरी कैलकुलेटर (CTC से इन-हैंड)"
        description="CTC से अपनी मासिक इन-हैंड सैलरी की गणना करें। बजट 2026 के नए टैक्स नियमों के साथ।"
        url="https://fincado.com/hi/salary-calculator/"
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="सैलरी कैलकुलेटर – CTC से इन-हैंड सैलरी निकालें" />
            <LanguageToggle path="/salary-calculator/" />
          </div>

          <h1 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
            सैलरी कैलकुलेटर (CTC से In-Hand)
            <span className="block max-w-fit text-base sm:text-lg font-medium text-brand-700 mb-4 mt-2">
              अपने जॉब ऑफर को डिकोड करें
            </span>
          </h1>

          {/* LAST UPDATED BANNER */}
          <div className="flex items-center gap-2 text-sm font-medium bg-brand-50 border border-brand-400 text-brand-700 px-5 py-3 rounded-2xl mb-6">
            <span className="flex items-center gap-1">
              ✅ बजट 2026 के लिए अपडेटेड
            </span>
            <span className="text-xs bg-white px-3 py-1 rounded-xl border border-brand-400">
              अप्रैल 2026
            </span>
            <span className="text-xs">• ₹75,000 स्टैंडर्ड डिडक्शन लागू</span>
          </div>

          {/* 💰 AD 1: TOP LEADERBOARD */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <AdSlot id="salary-top-hi" type="leaderboard" />
          </div>

          <div className="max-w-3xl text-slate-600 text-base font-medium leading-relaxed">
            <WikiText
              content={`
                <p>
                  अपने वार्षिक CTC को सटीक मासिक टेक-होम (In-Hand) सैलरी में बदलने के लिए Fincado के <strong>सैलरी कैलकुलेटर</strong> का उपयोग करें। 
                  हम नए टैक्स नियमों के तहत आपकी बेसिक पे, HRA, पीएफ (PF) कटौती और अनुमानित इनकम टैक्स (TDS) का सटीक ब्रेकअप देते हैं।
                </p>
              `}
            />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Benefit Highlight Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-brand-400 bg-linear-to-br from-[white] to-brand-50">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">
                      नए रिजीम का लाभ
                    </div>
                    <div className="text-sm font-medium text-brand-600 mb-2">
                      स्टैंडर्ड डिडक्शन
                    </div>
                    <div className="text-3xl font-semibold text-slate-900">
                      ₹75,000
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-400 bg-linear-to-br from-[white] to-brand-50">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">
                      टैक्स फ्री लिमिट
                    </div>
                    <div className="text-sm font-medium text-brand-600 mb-2">
                      यहाँ तक कोई टैक्स नहीं
                    </div>
                    <div className="text-3xl font-semibold text-slate-900">
                      ₹7.75L
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-brand-400 bg-linear-to-br from-[white] to-brand-50">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">
                      EPF योगदान
                    </div>
                    <div className="text-sm font-medium text-brand-600 mb-2">
                      कंपनी + कर्मचारी
                    </div>
                    <div className="text-3xl font-semibold text-slate-900">
                      24%
                      <span className="text-base font-medium text-slate-600">
                        {' '}
                        (Basic का)
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* CALCULATOR (Client Component) - Reusing the core logic component */}
            <SalaryClient />

            <Alert className="mt-6 bg-slate-50/50 border-slate-200 text-slate-600">
              <Info className="h-4 w-4 text-indigo-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <span className="text-slate-900 font-semibold block mb-0.5">
                  टैक्स कैलकुलेशन नोट
                </span>
                यह कैलकुलेटर TDS का अनुमान लगाने के लिए डिफ़ॉल्ट रूप से नए टैक्स
                रिजीम (New Tax Regime) का उपयोग करता है। प्रोफेशनल टैक्स (PT)
                राज्य के अनुसार अलग-अलग होता है लेकिन अधिकतम ₹2,500/वर्ष तक ही
                कटता है।
              </AlertDescription>
            </Alert>

            {/* How is In-Hand Salary Calculated? */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    इन-हैंड (In-Hand) सैलरी की गणना कैसे की जाती है?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="text-sm text-slate-600 mb-3">
                      CTC को नेट टेक-होम सैलरी में बदलने के फॉर्मूले में कंपनी
                      द्वारा दिए गए लाभों और आपके व्यक्तिगत टैक्स को हटाना शामिल
                      है:
                    </div>
                    <div className="my-4 p-6 bg-white rounded border border-slate-300 overflow-x-auto whitespace-nowrap">
                      <div className="text-center text-lg sm:text-xl font-serif text-slate-800">
                        ग्रॉस सैलरी (Gross) = CTC − Employer PF − ग्रेच्युटी
                      </div>
                      <div className="text-center text-lg sm:text-xl font-serif text-brand-700 mt-4 border-t pt-4">
                        इन-हैंड सैलरी = ग्रॉस सैलरी − Employee PF − इनकम टैक्स
                        (TDS) − प्रोफेशनल टैक्स
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-[#F9FAFB] rounded-lg border border-[#E5E7EB]">
                    <h4 className="font-semibold text-[#111827] mb-2 flex items-center gap-2">
                      <span>💡</span>
                      सैलरी के हिस्सों को समझें
                    </h4>
                    <ul className="text-sm text-slate-700 space-y-2 list-disc pl-5">
                      <li>
                        <strong>Employer PF:</strong> बेसिक का 12%। यह आपके CTC
                        का हिस्सा है लेकिन यह सीधे आपके रिटायरमेंट फंड में जाता
                        है, आपके बैंक खाते में नहीं।
                      </li>
                      <li>
                        <strong>Employee PF:</strong> बेसिक का अन्य 12% जो आपकी
                        ग्रॉस सैलरी से काटा जाता है।
                      </li>
                      <li>
                        <strong>TDS (Tax Deducted at Source):</strong> आपका HR
                        विभाग आपकी अनुमानित वार्षिक टैक्स देनदारी की गणना करता
                        है और हर महीने आपकी सैलरी से एक हिस्सा काट लेता है।
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* 💰 AD 2: AFTER RESULT */}
            <div className="no-print" style={{ margin: '32px 0' }}>
              <AdSlot id="salary-after-calc-hi" type="banner" />
            </div>

            {/* Promo Card */}
            <Card className="no-print my-6 border-brand-200 bg-brand-50 transition-colors hover:bg-brand-100">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-500">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-brand-900">
                    क्या आप और अधिक टैक्स बचाना चाहते हैं?
                  </strong>
                  <Link
                    href="/guides/best-tax-saving-options-80c/"
                    className="group inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <span>हमारी सेक्शन 80C इन्वेस्टमेंट गाइड पढ़ें</span>
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* EXPANDED SEO CONTENT */}
            <article className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardContent className="p-6 sm:p-10 space-y-12">
                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-slate-900">
                      CTC क्या होता है?
                    </h2>
                    <WikiText content={introContent} />
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      यह कैलकुलेटर कैसे मदद करता है?
                    </h3>
                    <WikiText content={benefitsContent} />
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      सामान्य सैलरी ब्रेकअप (CTC के % के रूप में)
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-slate-50">
                            <th className="text-left p-4 border text-slate-700">
                              सैलरी का हिस्सा (Component)
                            </th>
                            <th className="text-right p-4 border text-slate-700">
                              CTC का प्रतिशत
                            </th>
                            <th className="text-left p-4 border text-slate-700">
                              उद्देश्य (Purpose)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="p-4 border font-medium text-slate-800">
                              बेसिक सैलरी (Basic)
                            </td>
                            <td className="text-right p-4 border font-medium text-brand-700">
                              40–50%
                            </td>
                            <td className="p-4 border text-slate-600">
                              मूल वेतन, PF और HRA की गणना के लिए
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium text-slate-800">
                              HRA
                            </td>
                            <td className="text-right p-4 border font-medium text-brand-700">
                              15–25%
                            </td>
                            <td className="p-4 border text-slate-600">
                              हाउस रेंट अलाउंस (House Rent Allowance)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium text-slate-800">
                              स्पेशल अलाउंस
                            </td>
                            <td className="text-right p-4 border font-medium text-brand-700">
                              10–20%
                            </td>
                            <td className="p-4 border text-slate-600">
                              बैलेंसिंग अमाउंट (Flexible component)
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium text-slate-800">
                              Employer PF
                            </td>
                            <td className="text-right p-4 border font-medium text-brand-700">
                              बेसिक का 12%
                            </td>
                            <td className="p-4 border text-slate-600">
                              कंपनी द्वारा रिटायरमेंट फंड में योगदान
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border font-medium text-slate-800">
                              ग्रेच्युटी (Gratuity)
                            </td>
                            <td className="text-right p-4 border font-medium text-brand-700">
                              4.81%
                            </td>
                            <td className="p-4 border text-slate-600">
                              लॉन्ग-टर्म कंपनी छोड़ने पर मिलने वाला लाभ
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      नए टैक्स रिजीम (New Tax Regime) स्लैब 2026
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-brand-50">
                            <th className="text-left p-4 border text-slate-800">
                              टैक्सेबल इनकम (Taxable Income)
                            </th>
                            <th className="text-right p-4 border text-slate-800">
                              टैक्स दर (Rate)
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr>
                            <td className="p-4 border">₹0 – ₹3,00,000</td>
                            <td className="text-right p-4 border font-semibold text-green-600">
                              0%
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹3,00,001 – ₹6,00,000
                            </td>
                            <td className="text-right p-4 border">5%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹6,00,001 – ₹9,00,000
                            </td>
                            <td className="text-right p-4 border">10%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹9,00,001 – ₹12,00,000
                            </td>
                            <td className="text-right p-4 border">15%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">
                              ₹12,00,001 – ₹15,00,000
                            </td>
                            <td className="text-right p-4 border">20%</td>
                          </tr>
                          <tr>
                            <td className="p-4 border">₹15,00,000 से ऊपर</td>
                            <td className="text-right p-4 border font-semibold">
                              30%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-slate-500 mt-3">
                        + ₹75,000 स्टैंडर्ड डिडक्शन शामिल • ₹7.75 लाख टैक्सेबल
                        इनकम तक धारा 87A के तहत रिबेट।
                      </p>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      वास्तविक उदाहरण (अप्रैल 2026)
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <Card className="text-center bg-slate-50/50">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-slate-800">
                            ₹8 लाख CTC
                          </div>
                          <div className="text-sm font-medium text-brand-700 mt-2 bg-brand-100 py-1 px-3 rounded-full inline-block">
                            ≈ ₹54,200 / महीना
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="text-center bg-slate-50/50">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-slate-800">
                            ₹12 लाख CTC
                          </div>
                          <div className="text-sm font-medium text-brand-700 mt-2 bg-brand-100 py-1 px-3 rounded-full inline-block">
                            ≈ ₹79,800 / महीना
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="text-center bg-slate-50/50">
                        <CardContent className="pt-6">
                          <div className="text-3xl font-bold text-slate-800">
                            ₹20 लाख CTC
                          </div>
                          <div className="text-sm font-medium text-brand-700 mt-2 bg-brand-100 py-1 px-3 rounded-full inline-block">
                            ≈ ₹1,28,500 / महीना
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">
                      राज्यों के अनुसार प्रोफेशनल टैक्स (PT)
                    </h3>
                    <div className="overflow-x-auto border border-slate-200 rounded-lg">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="p-4 border-b text-left font-medium text-slate-700">
                              राज्य (State)
                            </th>
                            <th className="p-4 border-b border-l text-right font-medium text-slate-700">
                              मासिक कटौती
                            </th>
                            <th className="p-4 border-b border-l text-right font-medium text-slate-700">
                              वार्षिक कटौती
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="p-4">महाराष्ट्र (Maharashtra)</td>
                            <td className="p-4 border-l text-right">₹200</td>
                            <td className="p-4 border-l text-right font-medium">
                              ₹2,500*
                            </td>
                          </tr>
                          <tr className="bg-slate-50/30">
                            <td className="p-4">कर्नाटक (Karnataka)</td>
                            <td className="p-4 border-l text-right">₹200</td>
                            <td className="p-4 border-l text-right font-medium">
                              ₹2,400
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">तमिलनाडु (Tamil Nadu)</td>
                            <td className="p-4 border-l text-right">₹200</td>
                            <td className="p-4 border-l text-right font-medium">
                              ₹2,400
                            </td>
                          </tr>
                          <tr className="bg-slate-50/30">
                            <td className="p-4">पश्चिम बंगाल (West Bengal)</td>
                            <td className="p-4 border-l text-right">₹200</td>
                            <td className="p-4 border-l text-right font-medium">
                              ₹2,400
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4">
                              अन्य राज्य (जैसे दिल्ली, हरियाणा)
                            </td>
                            <td
                              colSpan={2}
                              className="p-4 border-l text-center text-slate-500"
                            >
                              प्रोफेशनल टैक्स लागू नहीं है
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-slate-400 p-3 bg-white">
                        *महाराष्ट्र में फरवरी महीने में ₹300 काटे जाते हैं।
                      </p>
                    </div>
                  </section>

                  <section className="space-y-5">
                    <h3 className="text-xl font-semibold text-slate-900">
                      अन्य महत्वपूर्ण टैक्स और सैलरी टूल्स
                    </h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                      <Link href="/hi/income-tax-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <span className="flex h-12 w-12 items-center justify-center rounded-xl">
                                <Image
                                  src="/images/icons/tax.svg"
                                  alt="Tax icon"
                                  width={24}
                                  height={24}
                                  className="w-12 h-12"
                                />
                              </span>
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  इनकम टैक्स कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  ओल्ड बनाम न्यू रिजीम के लिए अपनी सटीक टैक्स
                                  देनदारी जानें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/hra-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Image
                                src="/images/icons/tax.svg"
                                alt="HRA icon"
                                width={24}
                                height={24}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  HRA छूट कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  जानें कि आप हाउस रेंट अलाउंस (HRA) पर कितना
                                  टैक्स बचा सकते हैं।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/epf-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Image
                                src="/images/icons/epf.svg"
                                alt="EPF icon"
                                width={24}
                                height={24}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  EPF (PF) कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  रिटायरमेंट के समय आपके प्रोविडेंट फंड (EPF)
                                  में कितना पैसा होगा, यह जानें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>

                      <Link href="/hi/gratuity-calculator/" className="group">
                        <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                          <CardContent className="p-5">
                            <div className="flex items-start gap-3">
                              <Image
                                src="/images/icons/tax.svg"
                                alt="Gratuity icon"
                                width={24}
                                height={24}
                                className="w-12 h-12"
                              />
                              <div className="flex-1">
                                <div className="font-semibold text-slate-900 group-hover:text-brand-600 mb-1">
                                  ग्रेच्युटी (Gratuity) कैलकुलेटर
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                  कंपनी छोड़ने या 5 साल पूरे होने पर मिलने वाली
                                  ग्रेच्युटी की गणना करें।
                                </p>
                                <div className="mt-3 flex items-center text-xs font-semibold text-brand-600">
                                  <span>अभी कैलकुलेट करें</span>
                                  <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
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

            <div className="mt-8">
              <AuthorBio />
            </div>
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id="salary-sidebar-hi" type="box" />
              <SidebarCompareWidget />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

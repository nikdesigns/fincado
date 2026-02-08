import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import GSTClient from '@/app/gst-calculator/GSTClient';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import FAQSchema from '@/components/FAQSchema';
import { GSTSchemas } from '@/components/schemas/GSTSchemas';
import { BadgeCheck, Info, ArrowRight, Receipt, Building } from 'lucide-react';

/* ---------------- SEO METADATA ---------------- */
export const metadata: Metadata = {
  title: 'GST कैलकुलेटर भारत 2026 – ऑनलाइन GST टैक्स गणना करें | रिवर्स GST',
  description:
    'भारत के लिए मुफ्त GST कैलकुलेटर। CGST/SGST विभाजन के साथ GST Exclusive (टैक्स जोड़ें) और Inclusive (टैक्स हटाएं) गणना करें। 3%, 5%, 12%, 18%, 28% दरों का समर्थन। व्यवसायों के लिए तुरंत परिणाम।',
  keywords: [
    'GST कैलकुलेटर भारत',
    'रिवर्स GST कैलकुलेटर',
    'GST गणना फॉर्मूला',
    'GST दरें 2026',
    'सोने पर GST गणना',
    'IGST CGST SGST कैलकुलेटर',
    'GST टैक्स कैलकुलेटर ऑनलाइन',
    'कीमत में GST जोड़ें',
    'MRP से GST हटाएं',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/gst-calculator/',
    languages: {
      'en-IN': 'https://fincado.com/gst-calculator/',
    },
  },
  openGraph: {
    title: 'GST कैलकुलेटर 2026 – तुरंत GST टैक्स गणना करें',
    description:
      'व्यवसायों और उपभोक्ताओं के लिए मुफ्त ऑनलाइन GST कैलकुलेटर। CGST, SGST, IGST विभाजन के साथ GST exclusive/inclusive कीमतें गणना करें।',
    url: 'https://fincado.com/hi/gst-calculator/',
    type: 'website',
    locale: 'hi_IN',
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

/* ---------------- FAQ DATA ---------------- */
const faqItems = [
  {
    id: 'gst-faq-1',
    question: 'भारत में GST पंजीकरण किसे कराना होगा?',
    answer:
      'जिन व्यवसायों का वार्षिक कारोबार ₹40 लाख (सेवाओं के लिए ₹20 लाख) से अधिक है, उन्हें GST पंजीकरण कराना अनिवार्य है। ई-कॉमर्स विक्रेताओं, अंतर-राज्य आपूर्तिकर्ताओं, और अपंजीकृत डीलरों से सामान/सेवाएं प्राप्त करने वाले व्यवसायों को कारोबार की परवाह किए बिना अनिवार्य रूप से पंजीकरण कराना होगा।',
  },
  {
    id: 'gst-faq-2',
    question: 'CGST, SGST, और IGST में क्या अंतर है?',
    answer:
      'CGST (केंद्रीय GST) और SGST (राज्य GST) अंतर-राज्य लेनदेन (एक ही राज्य के भीतर) पर लागू होते हैं और समान रूप से विभाजित होते हैं। IGST (एकीकृत GST) अंतर-राज्य लेनदेन (दो राज्यों के बीच) और आयात पर लागू होता है। 18% GST अंतर-राज्य के लिए: CGST 9% + SGST 9%। अंतर-राज्य के लिए: IGST 18%।',
  },
  {
    id: 'gst-faq-3',
    question: 'MRP से GST की गणना कैसे करें (रिवर्स GST)?',
    answer:
      'रिवर्स GST फॉर्मूला: मूल कीमत = MRP ÷ (1 + GST दर/100)। उदाहरण: MRP = ₹11,800 जिसमें 18% GST है। मूल = ₹11,800 ÷ 1.18 = ₹10,000। GST राशि = ₹1,800। अंतिम चालान से वास्तविक उत्पाद मूल्य जानने के लिए इसका उपयोग करें।',
  },
  {
    id: 'gst-faq-4',
    question: 'GST में Input Tax Credit (ITC) क्या है?',
    answer:
      'ITC व्यवसायों को खरीद पर भुगतान किए गए GST का क्रेडिट दावा करने और इसे बिक्री पर GST देयता को ऑफसेट करने के लिए उपयोग करने की अनुमति देता है। उदाहरण: आप कच्चे माल पर ₹1,800 GST चुकाते हैं (इनपुट), तैयार माल पर ₹3,000 GST एकत्र करते हैं (आउटपुट)। आप सरकार को केवल ₹1,200 (₹3,000 - ₹1,800) चुकाते हैं। यह कर cascading को समाप्त करता है।',
  },
  {
    id: 'gst-faq-5',
    question: '2026 में वर्तमान GST दर स्लैब क्या हैं?',
    answer:
      'GST दरें: 0% (छूट - ताजा भोजन, किताबें), 0.25% (कच्चे हीरे), 3% (सोना, चांदी), 5% (आवश्यक वस्तुएं - पैकेज्ड फूड, दवाएं), 12% (मानक सामान - मोबाइल, प्रोसेस्ड फूड), 18% (सेवाएं, इलेक्ट्रॉनिक्स, IT), 28% (लक्जरी सामान - कार, AC, तंबाकू + सेस)। बजट 2026 में दरें अपरिवर्तित।',
  },
  {
    id: 'gst-faq-6',
    question: 'GST रिटर्न फाइलिंग की देय तिथि कब है?',
    answer:
      'GSTR-1 (बिक्री): अगले महीने की 11 तारीख। GSTR-3B (सारांश): अगले महीने की 20 तारीख। वार्षिक रिटर्न (GSTR-9): अगले वित्तीय वर्ष के 31 दिसंबर। QRMP के तहत तिमाही फाइलर: तिमाही के बाद महीने की 13 और 22/24 तारीख। देर से फाइलिंग पर ₹50/दिन का जुर्माना (शून्य रिटर्न के लिए ₹20/दिन)।',
  },
  {
    id: 'gst-faq-7',
    question: 'GST कंपोजीशन स्कीम क्या है?',
    answer:
      'कंपोजीशन स्कीम छोटे व्यवसायों (माल के लिए ₹1.5 करोड़ तक का कारोबार, सेवाओं के लिए ₹75 लाख) के लिए है। फ्लैट 1% GST (निर्माता), 2.5% (रेस्तरां सेवाएं), या 6% (अन्य सेवाएं) चुकाएं। लाभ: सरलीकृत अनुपालन, तिमाही रिटर्न। सीमाएं: ITC दावा नहीं, अंतर-राज्य बिक्री नहीं, ई-कॉमर्स नहीं।',
  },
  {
    id: 'gst-faq-8',
    question: 'क्या सभी व्यवसायों के लिए ई-चालान अनिवार्य है?',
    answer:
      'अगस्त 2023 से ₹5 करोड़ से अधिक कुल कारोबार वाले व्यवसायों के लिए ई-चालान अनिवार्य है। यह केवल B2B (व्यवसाय-से-व्यवसाय) और निर्यात चालान पर लागू होता है। B2C (खुदरा) चालान छूट प्राप्त हैं। ई-चालान IRP (Invoice Registration Portal) के माध्यम से IRN (Invoice Reference Number) उत्पन्न करता है।',
  },
  {
    id: 'gst-faq-9',
    question: 'क्या मैं उपभोक्ता के रूप में GST रिफंड का दावा कर सकता हूं?',
    answer:
      'उपभोक्ता GST रिफंड का दावा नहीं कर सकते। केवल पंजीकृत व्यवसाय इन मामलों में रिफंड का दावा कर सकते हैं: शून्य-रेटेड आपूर्ति (निर्यात), उल्टी शुल्क संरचना (जब इनपुट GST > आउटपुट GST), अतिरिक्त ITC संचय। विदेशी पर्यटक पर्यटक रिफंड योजना के तहत हवाई अड्डे पर खरीद पर GST रिफंड का दावा कर सकते हैं।',
  },
  {
    id: 'gst-faq-10',
    question: 'GST में HSN/SAC कोड क्या है?',
    answer:
      'HSN (Harmonized System of Nomenclature) माल वर्गीकरण के लिए 6-8 अंकों का कोड है। SAC (Services Accounting Code) सेवाओं के लिए 6 अंकों का कोड है। लागू GST दर निर्धारित करने के लिए उपयोग किया जाता है। चालान में अनिवार्य: कारोबार > ₹5 करोड़ के लिए 4-अंक, ₹1.5-5 करोड़ के लिए 2-अंक, ₹1.5 करोड़ से नीचे वैकल्पिक।',
  },
];

/* ---------------- PAGE ---------------- */
export default function GSTPageHindi() {
  const introContent = autoLinkContent(`
    <p>
      <strong>GST (माल और सेवा कर)</strong> भारत में माल और सेवाओं की आपूर्ति पर व्यापक 
      अप्रत्यक्ष कर है। 1 जुलाई, 2017 को लागू, GST ने VAT, सेवा कर, केंद्रीय उत्पाद शुल्क, 
      और प्रवेश कर जैसे कई cascading करों को बदल दिया, एक एकीकृत 
      <strong>"वन नेशन, वन टैक्स, वन मार्केट"</strong> प्रणाली बनाई।
    </p>
    <p class="mt-4">
      GST एक गंतव्य-आधारित उपभोग कर है जहां कर उपभोग के बिंदु पर एकत्र किया जाता है, 
      उत्पादन पर नहीं। इसमें पांच दर स्लैब हैं: 0% (छूट), 3% (कीमती धातुएं), 5% (आवश्यक 
      वस्तुएं), 12% (मानक सामान), 18% (सेवाएं/इलेक्ट्रॉनिक्स), और 28% (लक्जरी सामान)।
    </p>
  `);

  const howCalculatedContent = autoLinkContent(`
    <h4 class="font-semibold text-slate-900 mt-4">GST Exclusive (मूल कीमत में GST जोड़ें):</h4>
    <p class="mt-2">
      जब आपके पास शुद्ध/मूल कीमत है और GST सहित अंतिम चालान मूल्य की गणना करनी है:
    </p>
    <div class="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
      <div class="space-y-2 text-sm">
        <div><strong>GST राशि</strong> = मूल कीमत × (GST दर ÷ 100)</div>
        <div><strong>अंतिम चालान</strong> = मूल कीमत + GST राशि</div>
        <div class="mt-3 pt-3 border-t border-blue-300">
          <strong>उदाहरण:</strong> वस्तु कीमत = ₹10,000, GST = 18%<br/>
          GST राशि = ₹10,000 × 0.18 = ₹1,800<br/>
          अंतिम चालान = ₹10,000 + ₹1,800 = <strong>₹11,800</strong>
        </div>
      </div>
    </div>

    <h4 class="font-semibold text-slate-900 mt-6">GST Inclusive (रिवर्स GST - MRP से टैक्स हटाएं):</h4>
    <p class="mt-2">
      जब आपके पास MRP/अंतिम चालान मूल्य है और मूल कीमत और GST राशि जानने की आवश्यकता है:
    </p>
    <div class="mt-3 p-4 bg-indigo-50 rounded-lg border border-indigo-200">
      <div class="space-y-2 text-sm">
        <div><strong>मूल कीमत</strong> = MRP ÷ (1 + GST दर ÷ 100)</div>
        <div><strong>GST राशि</strong> = MRP - मूल कीमत</div>
        <div class="mt-3 pt-3 border-t border-indigo-300">
          <strong>उदाहरण:</strong> MRP = ₹11,800, GST = 18%<br/>
          मूल कीमत = ₹11,800 ÷ 1.18 = ₹10,000<br/>
          GST राशि = ₹11,800 - ₹10,000 = <strong>₹1,800</strong>
        </div>
      </div>
    </div>

    <h4 class="font-semibold text-slate-900 mt-6">CGST, SGST, IGST विभाजन:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li><strong>अंतर-राज्य (एक ही राज्य के भीतर):</strong> GST समान रूप से CGST (केंद्रीय) और SGST (राज्य) में विभाजित। 18% GST के लिए: CGST 9% + SGST 9%</li>
      <li><strong>अंतर-राज्य (दो राज्यों के बीच):</strong> पूर्ण GST IGST (एकीकृत) के रूप में। 18% GST के लिए: IGST 18%</li>
      <li><strong>आयात:</strong> IGST कस्टम ड्यूटी और IGST सेस के साथ लागू (यदि लागू हो)</li>
    </ul>
  `);

  const itcContent = autoLinkContent(`
    <p>
      <strong>Input Tax Credit (ITC)</strong> GST का मुख्य तंत्र है जो cascading प्रभाव 
      (कर पर कर) को समाप्त करता है। यह व्यवसायों को इनपुट (खरीद) पर भुगतान किए गए GST 
      का क्रेडिट दावा करने और इसे आउटपुट (बिक्री) पर GST देयता के विरुद्ध ऑफसेट करने की अनुमति देता है।
    </p>
    <h4 class="font-semibold text-slate-900 mt-4">ITC कैसे काम करता है:</h4>
    <ol class="list-decimal pl-5 space-y-2 mt-2">
      <li><strong>इनपुट टैक्स:</strong> आप ₹10,000 + 18% GST (₹1,800) का कच्चा माल खरीदते हैं। कुल भुगतान = ₹11,800</li>
      <li><strong>आउटपुट टैक्स:</strong> आप ₹20,000 + 18% GST (₹3,600) का तैयार माल बेचते हैं। कुल एकत्रित = ₹23,600</li>
      <li><strong>ITC दावा:</strong> शुद्ध GST देय = आउटपुट GST - इनपुट GST = ₹3,600 - ₹1,800 = <strong>₹1,800</strong></li>
      <li><strong>लाभ:</strong> ITC के बिना, आप पूर्ण ₹3,600 चुकाते। ITC के साथ, आप केवल ₹1,800 चुकाते हैं</li>
    </ol>

    <h4 class="font-semibold text-slate-900 mt-4">ITC पात्रता शर्तें:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>वैध कर चालान या डेबिट नोट होना चाहिए</li>
      <li>माल/सेवाएं प्राप्त होनी चाहिए</li>
      <li>आपूर्तिकर्ता को भुगतान किया गया GST सरकार के पास जमा होना चाहिए</li>
      <li>रिटर्न (GSTR-3B) दाखिल होना चाहिए</li>
      <li>आपूर्तिकर्ता ने अपना रिटर्न (GSTR-1) दाखिल किया होना चाहिए</li>
    </ul>

    <h4 class="font-semibold text-slate-900 mt-4">ITC पर अनुमति नहीं:</h4>
    <ul class="list-disc pl-5 space-y-2 mt-2">
      <li>व्यक्तिगत उपयोग के लिए मोटर वाहन (सिवाय जब व्यावसायिक उद्देश्यों के लिए उपयोग किया जाए जैसे टैक्सी, ड्राइविंग स्कूल)</li>
      <li>भोजन, पेय पदार्थ, बाहरी खानपान, सौंदर्य उपचार</li>
      <li>व्यक्तिगत उपभोग के लिए उपयोग किए गए माल/सेवाएं</li>
      <li>अचल संपत्ति का निर्माण (संयंत्र और मशीनरी को छोड़कर)</li>
      <li>कंपोजीशन स्कीम के तहत भुगतान किया गया GST</li>
    </ul>
  `);

  return (
    <>
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

      <CalculatorSchema
        name="GST कैलकुलेटर भारत - माल और सेवा कर कैलकुलेटर"
        description="CGST/SGST विभाजन के साथ GST exclusive और inclusive राशियां गणना करें। सभी GST दरों का समर्थन: 3%, 5%, 12%, 18%, 28%।"
        url="https://fincado.com/hi/gst-calculator/"
      />

      <FAQSchema
        faqs={faqItems.map((f) => ({
          question: f.question,
          answer: f.answer,
        }))}
      />

      <GSTSchemas />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title="GST कैलकुलेटर 2026" />
            <LanguageToggle path="/gst-calculator" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-green-100 text-emerald-700">
              <Receipt className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                GST कैलकुलेटर
              </h1>
              <p className="text-base sm:text-lg font-medium text-emerald-700">
                माल और सेवा कर भारत
              </p>
            </div>
          </div>

          <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
            <WikiText
              content={`
                <p>
                  CGST/SGST/IGST विभाजन के साथ <strong>GST Exclusive (टैक्स जोड़ें)</strong> और 
                  <strong>Inclusive (टैक्स हटाएं)</strong> राशियां तुरंत गणना करें। व्यवसायों, 
                  चालान, और कीमत सत्यापन के लिए बिल्कुल सही।
                </p>
              `}
            />
          </div>

          {/* Budget 2026 Status */}
          <div className="mt-6 flex gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg items-start shadow-sm max-w-2xl">
            <BadgeCheck className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-sm font-semibold text-emerald-900">
                बजट 2026: GST स्लैब अपरिवर्तित
              </p>
              <p className="text-xs text-emerald-800 leading-relaxed">
                केंद्रीय बजट 2026 ने मानक GST दरों (5%, 12%, 18%, 28%) में कोई
                बदलाव की घोषणा नहीं की। सभी दर संशोधन GST परिषद द्वारा शासित
                होते रहेंगे।
              </p>
            </div>
          </div>

          {/* AD #1: TOP LEADERBOARD */}
          <div className="no-print my-6">
            <AdSlot id="hi-gst-top" type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* Key Stats Cards */}
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-blue-200 bg-linear-to-br from-blue-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-blue-700 mb-1">
                      पंजीकरण सीमा
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      व्यवसायों के लिए अनिवार्य
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      ₹40L
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        कारोबार
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      सेवाओं के लिए ₹20L
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-indigo-200 bg-linear-to-br from-indigo-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-indigo-700 mb-1">
                      सबसे आम दर
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सेवाएं, इलेक्ट्रॉनिक्स, IT
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      18%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        GST
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      CGST 9% + SGST 9%
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-emerald-200 bg-linear-to-br from-emerald-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-emerald-700 mb-1">
                      कीमती धातुएं
                    </div>
                    <div className="text-sm text-slate-600 mb-2">
                      सोना, चांदी, प्लैटिनम
                    </div>
                    <div className="text-3xl font-bold text-slate-900">
                      3%
                      <span className="text-base font-normal text-slate-600">
                        {' '}
                        GST
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      न्यूनतम गैर-छूट दर
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Calculator */}
            <GSTClient />

            {/* AD #2: AFTER CALCULATOR */}
            <div className="no-print my-8">
              <AdSlot id="hi-gst-after-calc" type="square" />
            </div>

            {/* Info Alert */}
            <Alert className="mt-6 bg-blue-50/50 border-blue-200 text-slate-600">
              <Info className="h-4 w-4 text-blue-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">
                  गणना नोट
                </strong>
                यह कैलकुलेटर अंतर-राज्य लेनदेन के लिए CGST/SGST विभाजन दिखाता
                है। अंतर-राज्य बिक्री के लिए, पूरी राशि IGST है। अपने
                उत्पादों/सेवाओं पर सटीक GST दर के लिए हमेशा HSN/SAC कोड सत्यापित
                करें।
              </AlertDescription>
            </Alert>

            {/* Promo Card */}
            <Card className="no-print my-6 border-emerald-200 bg-emerald-50/50 transition-colors hover:bg-emerald-50">
              <CardContent className="flex items-start gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <Building className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <strong className="block text-base font-semibold text-emerald-900">
                    GST-पंजीकृत व्यवसाय चला रहे हैं?
                  </strong>
                  <p className="text-sm text-slate-700">
                    कर देयता की गणना करें, ITC को समझें, और उचित चालान के साथ
                    GST अनुपालन सुनिश्चित करें
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* GST Rate Slabs Table */}
            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    GST दर स्लैब 2026 (भारत)
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>GST दर</TableHead>
                          <TableHead>श्रेणियां और वस्तुएं</TableHead>
                          <TableHead>उदाहरण</TableHead>
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        <TableRow>
                          <TableCell className="font-semibold text-emerald-700">
                            0% (छूट)
                          </TableCell>
                          <TableCell>
                            बुनियादी आवश्यकताएं, शिक्षा, स्वास्थ्य सेवा
                          </TableCell>
                          <TableCell className="text-sm">
                            ताजी सब्जियां, दूध, अंडे, फल, ब्रेड, समाचार पत्र,
                            शैक्षिक सेवाएं, स्वास्थ्य सेवा
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-purple-700">
                            0.25%
                          </TableCell>
                          <TableCell>कच्चे हीरे</TableCell>
                          <TableCell className="text-sm">
                            आभूषण निर्माण के लिए अनकट/कच्चे हीरे
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-yellow-700">
                            3%
                          </TableCell>
                          <TableCell>कीमती धातुएं</TableCell>
                          <TableCell className="text-sm">
                            सोना, चांदी, प्लैटिनम, कटे और पॉलिश किए हुए हीरे,
                            सोने/चांदी के आभूषण
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-blue-700">
                            5%
                          </TableCell>
                          <TableCell>आवश्यक वस्तुएं, खाद्य उत्पाद</TableCell>
                          <TableCell className="text-sm">
                            पैकेज्ड खाद्य पदार्थ, दवाएं, जीवन रक्षक दवाएं, घरेलू
                            LPG, इकोनॉमी एयर ट्रैवल, कोयला
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-indigo-700">
                            12%
                          </TableCell>
                          <TableCell>मानक सामान</TableCell>
                          <TableCell className="text-sm">
                            मोबाइल फोन, प्रोसेस्ड फूड, कंप्यूटर, बिजनेस क्लास
                            एयर ट्रैवल, फ्रोजन मीट
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-slate-900">
                            18%
                          </TableCell>
                          <TableCell>सेवाएं, इलेक्ट्रॉनिक्स, IT</TableCell>
                          <TableCell className="text-sm">
                            IT सेवाएं, दूरसंचार, वित्तीय सेवाएं, बिना AC वाले
                            रेस्तरां, इलेक्ट्रॉनिक्स, पूंजीगत सामान
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell className="font-semibold text-red-700">
                            28%
                          </TableCell>
                          <TableCell>लक्जरी सामान, सिन गुड्स</TableCell>
                          <TableCell className="text-sm">
                            लक्जरी कार, AC, रेफ्रिजरेटर, तंबाकू, पान मसाला,
                            एरेटेड ड्रिंक्स, सीमेंट (कुछ वस्तुओं पर अतिरिक्त
                            सेस)
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-4 p-3 bg-amber-50 rounded border border-amber-200">
                    <p className="text-sm text-slate-700">
                      <strong>नोट:</strong> 28% स्लैब के तहत कुछ वस्तुओं पर
                      अतिरिक्त GST मुआवजा उपकर लगता है (जैसे, तंबाकू, पान मसाला,
                      कोयला, एरेटेड ड्रिंक्स)। अपने उत्पाद/सेवा पर लागू सटीक दर
                      के लिए हमेशा HSN/SAC कोड जांचें।
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* AD #3: MID-CONTENT */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-gst-mid-content" type="square" label="विज्ञापन" />
            </div>

            {/* --- FULL SEO ARTICLE --- */}
            <article className="article content-for-seo no-print mt-12">
              <section className="space-y-4">
                <h2 className="text-2xl font-semibold text-slate-900">
                  GST (माल और सेवा कर) क्या है?
                </h2>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={introContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  GST की गणना कैसे करें: Exclusive vs Inclusive
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={howCalculatedContent} />
                </div>
              </section>

              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  Input Tax Credit (ITC) समझाया गया
                </h3>
                <div className="text-slate-700 leading-relaxed">
                  <WikiText content={itcContent} />
                </div>
              </section>

              {/* GST vs Old Tax System */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  GST vs पुरानी अप्रत्यक्ष कर प्रणाली
                </h3>

                <div className="overflow-x-auto mt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>पहलू</TableHead>
                        <TableHead>पुरानी कर प्रणाली (2017 से पहले)</TableHead>
                        <TableHead>GST प्रणाली (2017 के बाद)</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">
                          कर संरचना
                        </TableCell>
                        <TableCell>
                          कई कर: VAT, सेवा कर, उत्पाद शुल्क, प्रवेश कर, ऑक्ट्रॉय
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          एकल एकीकृत कर: GST (CGST + SGST + IGST)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          Cascading प्रभाव
                        </TableCell>
                        <TableCell>
                          कर पर कर (पिछले करों के लिए कोई क्रेडिट नहीं)
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          Input Tax Credit (ITC) के माध्यम से समाप्त
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">अनुपालन</TableCell>
                        <TableCell>
                          केंद्र और राज्य को अलग-अलग कई रिटर्न
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          एकल ऑनलाइन पोर्टल (GST नेटवर्क)
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          पंजीकरण सीमा
                        </TableCell>
                        <TableCell>
                          राज्य द्वारा भिन्न (VAT के लिए ₹5-10 लाख)
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          समान ₹40L माल / ₹20L सेवाएं
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          अंतर-राज्य कर
                        </TableCell>
                        <TableCell>
                          CST 2% (कोई इनपुट क्रेडिट नहीं), प्रवेश कर
                        </TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          पूर्ण ITC उपलब्ध के साथ IGST
                        </TableCell>
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-semibold">
                          ई-कॉमर्स
                        </TableCell>
                        <TableCell>कोई विशिष्ट प्रावधान नहीं, जटिल</TableCell>
                        <TableCell className="text-emerald-700 font-semibold">
                          विशिष्ट TCS प्रावधान, सरलीकृत अनुपालन
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </section>

              {/* E-Invoice Guidelines */}
              <section className="space-y-6 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  GST के लिए ई-चालान दिशानिर्देश
                </h3>

                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-3">
                    ई-चालान क्या है?
                  </h4>
                  <p className="text-sm text-slate-700">
                    ई-चालान Invoice Registration Portal (IRP) के माध्यम से
                    उत्पन्न एक इलेक्ट्रॉनिक चालान है। यह प्रमाणीकरण के लिए एक
                    अद्वितीय Invoice Reference Number (IRN) और QR कोड प्रदान
                    करता है। ₹5 करोड़ से अधिक कारोबार वाले व्यवसायों के लिए B2B
                    और निर्यात चालान के लिए ई-चालान अनिवार्य है।
                  </p>
                </div>

                <div className="space-y-4">
                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        ई-चालान किसे उत्पन्न करना होगा?
                      </h4>
                      <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                        <li>₹5 करोड़ से अधिक कुल कारोबार वाले सभी व्यवसाय</li>
                        <li>B2B चालान, निर्यात, SEZ आपूर्ति पर लागू</li>
                        <li>B2C (खुदरा) चालान पर लागू नहीं</li>
                        <li>
                          विशेष आर्थिक क्षेत्र (SEZ) इकाइयां/डेवलपर्स अनिवार्य
                          रूप से
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        ई-चालान उत्पादन प्रक्रिया
                      </h4>
                      <ol className="text-sm text-slate-700 list-decimal pl-5 space-y-2">
                        <li>
                          लेखा सॉफ्टवेयर में चालान बनाएं (Tally, SAP, आदि)
                        </li>
                        <li>
                          IRP पोर्टल पर चालान JSON अपलोड करें (सीधे या GSP के
                          माध्यम से)
                        </li>
                        <li>
                          IRP सत्यापित करता है और IRN (64-अक्षर हैश) उत्पन्न
                          करता है
                        </li>
                        <li>चालान विवरण के साथ QR कोड उत्पन्न</li>
                        <li>
                          IRN और QR कोड के साथ डिजिटल रूप से हस्ताक्षरित चालान
                          वापस
                        </li>
                        <li>GSTR-1 और E-way bill प्रणाली में स्वतः भरा गया</li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="border-slate-200">
                    <CardContent className="p-5">
                      <h4 className="font-semibold text-slate-900 mb-2">
                        ई-चालान के लाभ
                      </h4>
                      <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
                        <li>
                          GSTR-1 का स्वतः भरना (कोई मैनुअल एंट्री आवश्यक नहीं)
                        </li>
                        <li>
                          कर अधिकारियों द्वारा चालान की रीयल-टाइम ट्रैकिंग
                        </li>
                        <li>मानकीकृत प्रारूप के माध्यम से कम त्रुटियां</li>
                        <li>
                          तेज ITC दावा प्रक्रिया (प्राप्तकर्ता के लिए पूर्व-भरी)
                        </li>
                        <li>
                          E-way bill प्रणाली के साथ एकीकरण (एक-क्लिक उत्पादन)
                        </li>
                        <li>नकली चालान और कर चोरी की रोकथाम</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Common GST Mistakes */}
              <section className="space-y-4 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  बचने योग्य सामान्य GST गणना गलतियां
                </h3>

                <div className="space-y-3">
                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            गलत GST दर चयन
                          </h4>
                          <p className="text-sm text-slate-700">
                            सोने के लिए 18% GST (सही: 3%) या इलेक्ट्रॉनिक्स के
                            लिए 5% (सही: 18%) का उपयोग करना। हमेशा GST पोर्टल पर
                            HSN/SAC कोड जांचें या CA से परामर्श लें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            चालान में राउंडिंग त्रुटियां
                          </h4>
                          <p className="text-sm text-slate-700">
                            GST की गणना पहले लाइन आइटम पर की जानी चाहिए, फिर
                            योग। GST जोड़ने से पहले मूल राशि को राउंड न करें।
                            केवल अंतिम चालान कुल को राउंड करें।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            वैध दस्तावेजों के बिना ITC दावा करना
                          </h4>
                          <p className="text-sm text-slate-700">
                            ITC के लिए आपूर्तिकर्ता GSTIN, HSN/SAC कोड, और कर
                            विभाजन के साथ वैध GST-अनुपालन चालान की आवश्यकता है।
                            क्रेडिट नोट, डिलीवरी चालान योग्य नहीं हैं।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            गलत आपूर्ति स्थान
                          </h4>
                          <p className="text-sm text-slate-700">
                            सेवाओं के लिए, आपूर्ति स्थान निर्धारित करता है कि
                            IGST या CGST+SGST लागू होता है या नहीं। माल: माल का
                            स्थान। सेवाएं: प्राप्तकर्ता का स्थान (B2B) या
                            आपूर्तिकर्ता (B2C)।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-red-200 bg-red-50/30">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">❌</span>
                        <div>
                          <h4 className="font-semibold text-red-900 mb-1">
                            देर से रिटर्न फाइलिंग
                          </h4>
                          <p className="text-sm text-slate-700">
                            GSTR-1 देय 11 तारीख, GSTR-3B देय 20 तारीख। देर से
                            फाइलिंग: ₹50/दिन जुर्माना (शून्य रिटर्न के लिए
                            ₹20/दिन)। आपूर्तिकर्ता के GSTR-1 दाखिल करने के बाद
                            ही ITC का दावा किया जा सकता है।
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Related Tools */}
              <section className="space-y-5 mt-10">
                <h3 className="text-xl font-semibold text-slate-900">
                  संबंधित वित्तीय कैलकुलेटर
                </h3>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Link href="/hi/income-tax-calculator/" className="group">
                    <Card className="h-full border-slate-200 transition hover:-translate-y-1 hover:shadow-lg hover:border-emerald-300">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-3">
                          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-emerald-50 to-emerald-100 text-emerald-700 text-2xl">
                            💰
                          </span>
                          <div className="flex-1">
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 mb-1">
                              आयकर कैलकुलेटर
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                              व्यवसायों और पेशेवरों के लिए आयकर देयता की गणना
                              करें। पुरानी vs नई कर व्यवस्था की तुलना करें।
                            </p>
                            <div className="mt-3 flex items-center text-xs font-semibold text-emerald-700">
                              <span>टैक्स गणना करें</span>
                              <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </section>
            </article>

            {/* AD #4: BEFORE FAQ */}
            <div className="no-print my-8">
              <AdSlot id="hi-gst-before-faq" type="leaderboard" lazyLoad />
            </div>

            {/* FAQs */}
            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    अक्सर पूछे जाने वाले प्रश्न
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

            {/* AD #5: BOTTOM */}
            <div className="no-print my-8 flex justify-center">
              <AdSlot id="hi-gst-bottom" type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              {/* AD #6: SIDEBAR TOP */}
              <AdSlot id="hi-gst-sidebar-top" type="skyscraper" />

              <SidebarCompareWidget />

              {/* AD #7: SIDEBAR BOTTOM */}
              <AdSlot id="hi-gst-sidebar-bottom" type="box" lazyLoad />

              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

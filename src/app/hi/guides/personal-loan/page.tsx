import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';
import FAQSchema from '@/components/FAQSchema';

// --- UI COMPONENTS ---
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
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Banknote,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Percent,
  Calculator,
  ShieldCheck,
  CreditCard,
  Plane,
  Stethoscope,
  XCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'पर्सनल लोन (Personal Loan) हिंदी गाइड: ब्याज, नियम और फायदे | Fincado',
  description:
    'Personal Loan Guide in Hindi: ब्याज दरें, EMI कैलकुलेशन, और लोन लेने से पहले की सावधानियां। जानें कि पर्सनल लोन आपके लिए सही है या नहीं।',
  keywords: [
    'Personal Loan Hindi',
    'Personal Loan Interest Rates',
    'Personal Loan EMI Calculator',
    'Instant Loan Apps',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/guides/personal-loan/',
  },
  openGraph: {
    title: 'पर्सनल लोन हिंदी गाइड: लेने से पहले सब कुछ जान लें',
    description:
      'गलत जानकारी के साथ लिया गया पर्सनल लोन बोझ बन सकता है। यहाँ पढ़ें पूरी जानकारी।',
    url: 'https://fincado.com/hi/guides/personal-loan/',
    type: 'article',
    images: [
      {
        url: '/images/og/personal-loan-guide.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiPersonalLoanGuide() {
  const pageTitle = 'पर्सनल लोन हिंदी गाइड: लेने से पहले सब कुछ जान लें';

  // --- FAQ SCHEMA ---
  const faqData = [
    {
      question: 'पर्सनल लोन के लिए सिबिल स्कोर कितना चाहिए?',
      answer:
        '750 से ऊपर का स्कोर सबसे अच्छा माना जाता है। 700-750 पर भी लोन मिल जाता है लेकिन ब्याज थोड़ा ज्यादा हो सकता है。',
    },
    {
      question: 'मैं कितना लोन ले सकता हूँ?',
      answer:
        'यह आपकी इनकम पर निर्भर करता है। आमतौर पर बैंक आपकी नेट मंथली सैलरी का 10 से 15 गुना तक लोन दे सकते हैं。',
    },
    {
      question: 'लोन जल्दी बंद करने (Foreclosure) पर चार्ज लगता है?',
      answer:
        'हाँ, ज्यादातर बैंक लोन की बची हुई राशि पर 2% से 5% तक Foreclosure Charge लेते हैं। कुछ बैंक इसे फ्री भी करते हैं。',
    },
    {
      question: 'लोन रिजेक्ट क्यों होता है?',
      answer:
        'खराब सिबिल स्कोर, बहुत सारे पुराने लोन, या बार-बार नौकरी बदलने के कारण लोन रिजेक्ट हो सकता है。',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto">
      {/* --- SCHEMAS --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'hi',
            headline: pageTitle,
            description:
              'पर्सनल लोन की ब्याज दरें, EMI और जरूरी नियम हिंदी में।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/hi/guides/personal-loan',
            },
            author: {
              '@type': 'Organization',
              name: 'Fincado Research Team',
            },
            publisher: {
              '@type': 'Organization',
              name: 'Fincado',
              logo: {
                '@type': 'ImageObject',
                url: '/logo.png',
              },
            },
            datePublished: '2025-12-19',
            dateModified: '2025-12-19',
          }),
        }}
      />
      <FAQSchema faqs={faqData} />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/' },
          { name: 'हिंदी गाइड्स', url: 'https://fincado.com/hi/' },
          {
            name: 'Personal Loan',
            url: 'https://fincado.com/hi/guides/personal-loan/',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 mb-4 px-3 py-1 text-sm font-semibold">
          Finance Basics
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          {pageTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            Last Updated: <strong>Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            Verified by Experts
          </span>
        </div>
      </header>

      <div className="mb-8">
        <ShareTools title="Personal Loan Guide (Hindi)" />
      </div>

      {/* --- ARTICLE CONTENT --- */}
      <div className="prose prose-slate max-w-none mb-8">
        <WikiText
          content={`
          <p>
            आज के समय में <strong>पर्सनल लोन (Personal Loan)</strong> सबसे आसान और तेज़ तरीकों में से एक माना जाता है जब अचानक पैसों की ज़रूरत पड़ जाए। लेकिन गलत जानकारी के साथ लिया गया लोन आपके लिए मदद से ज़्यादा बोझ बन सकता है। इस गाइड में पर्सनल लोन को आसान हिंदी में, स्टेप‑बाय‑स्टेप समझाया गया है।
          </p>
        `}
        />
      </div>

      {/* [AD SLOT 1] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-1" type="leaderboard" label="Sponsored" />
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- SECTION 1 --- */}
      <h2
        id="what-is-personal-loan"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <Banknote className="w-6 h-6 text-blue-600" />
        1. Personal Loan क्या होता है?
      </h2>
      <p className="text-slate-700 mb-4 leading-relaxed">
        पर्सनल लोन एक <strong>बिना collateral</strong> (बिना गारंटी / security)
        वाला लोन होता है। इसका मतलब:
      </p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
        <li>आपको घर, ज़मीन, गोल्ड या कोई और संपत्ति गिरवी नहीं रखनी पड़ती।</li>
        <li>
          बैंक या NBFC आपकी <strong>Repayment क्षमता और Credit Profile</strong>{' '}
          देखकर लोन approve करते हैं।
        </li>
      </ul>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="p-4">
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              किसी भी personal जरूरत के लिए
            </h4>
            <p className="text-sm text-slate-600">
              शादी, मेडिकल, ट्रैवल, घर का सामान, या पुराने कर्ज चुकाने के लिए।
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="p-4">
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              Bank + NBFC दोनों देते हैं
            </h4>
            <p className="text-sm text-slate-600">
              सरकारी बैंक, प्राइवेट बैंक और Bajaj/Tata Capital जैसी कंपनियां।
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-amber-50 border-amber-200 mb-8">
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
        <AlertDescription className="text-amber-900 text-sm leading-relaxed">
          ध्यान रहे: आसान approval का मतलब यह नहीं कि हर offer आपके लिए सही भी
          हो – शर्तें (Terms & Conditions) ज़रूर पढ़ें।
        </AlertDescription>
      </Alert>

      {/* [AD SLOT 2] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2 --- */}
      <h2
        id="use-cases"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <CheckCircle2 className="w-6 h-6 text-emerald-600" />
        2. Personal Loan किन कामों के लिए लिया जाता है?
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          {
            icon: <Stethoscope className="w-5 h-5 text-red-500" />,
            title: 'Medical Emergency',
            desc: 'अचानक अस्पताल का खर्च जब इंश्योरेंस कम पड़ जाए。',
          },
          {
            icon: <div className="text-xl">💍</div>,
            title: 'शादी (Marriage)',
            desc: 'भारतीय शादियों का बजट अक्सर बढ़ जाता है。',
          },
          {
            icon: <Plane className="w-5 h-5 text-blue-500" />,
            title: 'Travel / Vacation',
            desc: 'विदेश यात्रा या हनीमून के लिए。',
          },
          {
            icon: <CreditCard className="w-5 h-5 text-purple-500" />,
            title: 'Credit Card Repayment',
            desc: 'क्रेडिट कार्ड का 40% ब्याज चुकाने के लिए कम ब्याज वाला लोन。',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-4 bg-white border border-slate-200 rounded-lg items-start hover:border-slate-300 transition-colors"
          >
            <div className="shrink-0 mt-0.5">{item.icon}</div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- SECTION 3 & 4: Pros & Cons --- */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-emerald-800 flex items-center gap-2">
              ✅ फायदे (Pros)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />{' '}
                जल्दी Approval (24-48 घंटे)
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />{' '}
                कोई Security/Collateral नहीं चाहिए
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />{' '}
                Fixed EMI से बजट बनाना आसान
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />{' '}
                पैसे का इस्तेमाल कहीं भी कर सकते हैं
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-red-800 flex items-center gap-2">
              ❌ नुकसान (Cons)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />{' '}
                ब्याज दर (Interest Rate) काफी ज़्यादा (11-24%)
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />{' '}
                लेट फीस और पेनल्टी बहुत भारी होती है
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />{' '}
                गलत Tenure चुनने पर ब्याज का बोझ
              </li>
              <li className="flex gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />{' '}
                Prepayment पर पेनल्टी लग सकती है
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* [AD SLOT 3] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-3" type="leaderboard" />
      </div>

      {/* --- SECTION 5: INTEREST RATE --- */}
      <h2
        id="interest-factors"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <Percent className="w-6 h-6 text-indigo-600" />
        5. Interest Rate कैसे तय होता है?
      </h2>
      <p className="text-slate-700 mb-6">
        बैंक ये 5 चीजें देखकर तय करता है कि आपको लोन सस्ता मिलेगा या महंगा:
      </p>

      {/* ✅ IMAGE PLACEHOLDER */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/personal-loan/personal-loan-interest-factors.webp"
          alt="Factors affecting Personal Loan Interest Rates"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Infographic: पर्सनल लोन की ब्याज दर तय करने वाले कारक
          </p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <ol className="list-decimal pl-5 space-y-3 text-slate-700 font-medium text-sm">
          <li>
            <strong>Credit Score (CIBIL):</strong> 750+ स्कोर है तो ब्याज कम
            मिलेगा। 650 से कम है तो लोन रिजेक्ट हो सकता है।
          </li>
          <li>
            <strong>Income (आय):</strong> जितनी ज्यादा सैलरी, उतना कम रिस्क,
            उतना बेहतर रेट।
          </li>
          <li>
            <strong>Job Type:</strong> सरकारी या MNC नौकरी वालों को बैंक पसंद
            करते हैं।
          </li>
          <li>
            <strong>Relationship:</strong> जिस बैंक में आपका सैलरी अकाउंट है,
            वहां प्री-अप्रूव्ड ऑफर मिल सकता है।
          </li>
          <li>
            <strong>Existing Debt:</strong> अगर पहले से बहुत लोन चल रहे हैं, तो
            नया लोन महंगा मिलेगा।
          </li>
        </ol>
      </div>

      {/* --- SECTION 6: EMI CALCULATION --- */}
      <h2
        id="emi-calculation"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <Calculator className="w-6 h-6 text-purple-600" />
        6. EMI कैसे calculate होती है?
      </h2>
      <p className="text-slate-700 mb-6">
        EMI तीन चीजों पर निर्भर करती है:{' '}
        <strong>Loan Amount, Interest Rate, Tenure</strong>.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-blue-900">
              Basic Logic
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-800 space-y-2">
            <p>• छोटा Tenure → EMI ज़्यादा → Total Interest कम (सस्ता लोन)</p>
            <p>• लंबा Tenure → EMI कम → Total Interest ज़्यादा (महंगा लोन)</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800">
              उदाहरण (₹3 लाख का लोन @ 14%)
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-600 space-y-2">
            <p>• 2 साल के लिए EMI भारी होगी, लेकिन ब्याज कम लगेगा。</p>
            <p>
              • 5 साल के लिए EMI हल्की होगी, लेकिन ब्याज बहुत ज्यादा चुकाना
              पड़ेगा。
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mb-8">
        <Link href="/hi/emi-calculator/">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            👉 अपनी EMI यहाँ कैलकुलेट करें
          </Button>
        </Link>
      </div>

      {/* [AD SLOT 4] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-4" type="leaderboard" />
      </div>

      {/* --- SECTION 7: CHECKLIST --- */}
      <h2
        id="checklist"
        className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"
      >
        <ShieldCheck className="w-6 h-6 text-emerald-600" />
        7. लोन लेने से पहले ये 7 बातें ज़रूर देखें
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {[
          'Processing Fee: क्या बैंक 1-3% फीस काट रहा है?',
          'Prepayment Charges: लोन जल्दी बंद करने पर पेनाल्टी कितनी है?',
          'Part Prepayment: क्या बीच में थोड़े पैसे जमा कर सकते हैं?',
          'Hidden Charges: लेट फीस, इंश्योरेंस चार्ज, आदि।',
          'Fixed vs Floating: पर्सनल लोन फिक्स्ड रेट पर ही लें।',
          'EMI Affordability: आपकी इनकम का 40% से ज्यादा EMI में नहीं जाना चाहिए।',
          'Compare Offers: कम से कम 3 बैंकों से तुलना करें。',
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-3 p-3 bg-white border border-slate-200 rounded-lg items-center"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-sm text-slate-700">{item}</span>
          </div>
        ))}
      </div>

      {/* --- SECTION 8: PL vs CC --- */}
      <h2 id="comparison" className="text-2xl font-bold text-slate-900 mb-4">
        8. Personal Loan vs Credit Card (Table)
      </h2>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">पॉइंट</TableHead>
              <TableHead className="font-bold text-slate-700">
                Personal Loan
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Credit Card Loan
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ब्याज दर</TableCell>
              <TableCell className="font-bold text-emerald-600">
                11–24% सालाना
              </TableCell>
              <TableCell className="font-bold text-red-600">
                30–45% सालाना
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">EMI Type</TableCell>
              <TableCell>Fixed EMI, Fixed Tenure</TableCell>
              <TableCell>Revolving (Minimum Due Trap)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Best For</TableCell>
              <TableCell>बड़ी ज़रूरत (शादी, मेडिकल)</TableCell>
              <TableCell>छोटी खरीदारी (Short Term)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Discipline</TableCell>
              <TableCell className="text-emerald-600 font-medium">
                High (मजबूरी में भरना पड़ता है)
              </TableCell>
              <TableCell className="text-red-600 font-medium">
                Low (खर्च बढ़ता जाता है)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* [AD SLOT 5] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-5" type="leaderboard" />
      </div>

      {/* --- SECTION 9: SUITABILITY --- */}
      <h2
        id="who-should-take"
        className="text-2xl font-bold text-slate-900 mb-4"
      >
        9. Personal Loan किसे लेना चाहिए?
      </h2>
      <div className="space-y-4 mb-12">
        <Alert className="bg-emerald-50 border-emerald-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />

          <AlertTitle className="text-emerald-800 font-bold mb-1">
            सही है अगर:
          </AlertTitle>
          <AlertDescription className="text-emerald-900/80 text-sm leading-relaxed">
            आपको मेडिकल इमरजेंसी है, शादी का खर्च है, या क्रेडिट कार्ड का भारी
            कर्ज चुकाना है और आपकी नौकरी पक्की है。
          </AlertDescription>
        </Alert>

        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />

          <AlertTitle className="text-red-800 font-bold mb-1">
            गलत है अगर:
          </AlertTitle>
          <AlertDescription className="text-red-900/80 text-sm leading-relaxed">
            आप नया फोन, पार्टी, या दिखावे के लिए लोन ले रहे हैं, या आपकी नौकरी
            स्थिर नहीं है。
          </AlertDescription>
        </Alert>
      </div>

      {/* --- SECTION 10: MISTAKES --- */}
      <h2
        id="mistakes"
        className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"
      >
        <AlertTriangle className="w-6 h-6 text-red-500" />
        10. आम गलतियाँ (Common Mistakes)
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {[
          {
            title: 'सिर्फ EMI देखना',
            desc: 'लोग कम EMI के चक्कर में बहुत लंबा लोन (Long Tenure) ले लेते हैं, जिससे उन्हें दोगुना ब्याज चुकाना पड़ता है।',
          },
          {
            title: 'एक साथ कई Loans लेना',
            desc: 'थोड़े समय में कई छोटे-छोटे लोन या क्रेडिट कार्ड अप्लाई करने से आपका CIBIL स्कोर तेजी से गिरता है।',
          },
          {
            title: 'Terms & Conditions न पढ़ना',
            desc: 'बिना प्री-पेमेंट (Foreclosure) चार्ज देखे साइन कर देना। बाद में लोन बंद करने पर भारी पेनाल्टी लगती है।',
          },
          {
            title: 'Auto-Debit फेल होना',
            desc: 'खाते में बैलेंस न होने से बाउंस चार्ज लगता है, और यह आपकी क्रेडिट हिस्ट्री पर एक बड़ा "Red Flag" है।',
          },
        ].map((item, i) => (
          <Card
            key={i}
            className="border-red-100 bg-white shadow-sm hover:shadow-md hover:border-red-200 transition-all group"
          >
            <CardContent className="p-5 flex items-start gap-4">
              <div className="shrink-0 w-10 h-10 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
                <XCircle className="w-5 h-5 text-red-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* [AD SLOT 6] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-6" type="leaderboard" />
      </div>

      {/* --- SECTION 11: FAQS --- */}
      <h2 id="faqs" className="text-2xl font-bold text-slate-900 mb-6">
        11. Personal Loan FAQs (Hindi)
      </h2>
      <div className="mb-12">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-slate-800 font-semibold hover:text-blue-700 text-left">
                Q{index + 1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- SECTION 12: TOOLS --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        12. Tools & Internal Links
      </h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Link href="/hi/emi-calculator/">
          <Card className="hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">🏠</span>
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-700">
                  EMI Calculator
                </h4>
              </div>
              <p className="text-sm text-slate-600">
                लोन लेने से पहले अपनी किस्त (EMI) यहाँ चेक करें。
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/hi/sip-calculator/">
          <Card className="hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">📈</span>
                <h4 className="font-bold text-slate-900 group-hover:text-emerald-700">
                  SIP Calculator
                </h4>
              </div>
              <p className="text-sm text-slate-600">
                लोन चुकाने के बाद बचत शुरू करने का प्लान बनाएं。
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* [AD SLOT 7] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-pl-7" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="bg-slate-900 text-slate-100 border-none mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            निष्कर्ष: Personal Loan सोच‑समझ कर ही लें
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            पर्सनल लोन बुरा नहीं है, बस इसका इस्तेमाल सही होना चाहिए। जरूरत हो
            तभी लें, EMI पहले कैलकुलेट करें, और हमेशा समय पर चुकाएं। सही फैसला
            आपकी फाइनेंशियल लाइफ को आसान बना सकता है, और गलत फैसला आपको कर्ज के
            जाल में फंसा सकता है।
          </p>
        </CardContent>
      </Card>

      {/* --- FOOTER ELEMENTS --- */}
      <AuthorBio />

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <p className="text-xs text-slate-500 leading-relaxed italic">
          <strong>अस्वीकरण:</strong> इस पृष्ठ पर दी गई जानकारी केवल शैक्षिक
          उद्देश्यों के लिए है और इसे वित्तीय सलाह नहीं माना जाना चाहिए। लोन
          लेने से पहले कृपया बैंक की आधिकारिक शर्तों को ध्यान से पढ़ें।
        </p>
      </div>
    </article>
  );
}

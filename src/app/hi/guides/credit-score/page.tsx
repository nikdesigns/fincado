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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  TrendingUp,
  CalendarDays,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Credit Score कैसे बढ़ाएं? 750+ Score पाने के 10 आसान तरीके | Fincado',
  description:
    'जानिए credit score बढ़ाने के आसान और सही तरीके। 90 दिनों में score improve करने की practical Hindi guide।',
  keywords: [
    'Credit Score Hindi',
    'CIBIL Score Kaise Badhaye',
    'Improve Credit Score India',
    'Credit Score Check',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/guides/credit-score/',
  },
  openGraph: {
    title: 'Credit Score कैसे बढ़ाएं? (Complete Hindi Guide)',
    description:
      'CIBIL स्कोर खराब है? इसे ठीक करने के 10 पक्के तरीके यहाँ पढ़ें।',
    url: 'https://fincado.com/hi/guides/credit-score/',
    type: 'article',
    images: [
      {
        url: '/images/og/credit-score-guide.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiCreditScoreGuide() {
  const pageTitle =
    'Credit Score कैसे बढ़ाएं? 750+ Score पाने के 10 आसान तरीके';

  const faqData = [
    {
      question: 'Loan के लिए minimum credit score कितना चाहिए?',
      answer:
        'ज्यादातर बैंक पर्सनल लोन या क्रेडिट कार्ड के लिए 700-750+ स्कोर पसंद करते हैं। होम लोन 650+ पर भी मिल सकता है।',
    },
    {
      question: 'Credit score free में कैसे check करें?',
      answer:
        'कई बैंक और फिनटेक ऐप्स फ्री स्कोर चेक की सुविधा देते हैं। CIBIL की वेबसाइट पर भी साल में एक बार फ्री रिपोर्ट मिल सकती है।',
    },
    {
      question: 'Zero credit history हो तो क्या करें?',
      answer:
        'शुरुआत के लिए एक छोटा क्रेडिट कार्ड या कंज्यूमर लोन लें और उसकी EMI समय पर भरें। इससे आपकी हिस्ट्री बननी शुरू होगी।',
    },
  ];

  return (
    <article className="max-w-4xl mx-auto">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'hi',
            headline: pageTitle,
            description:
              'Credit Score बढ़ाने की पूरी जानकारी हिंदी में। EMI पेमेंट, क्रेडिट कार्ड यूसेज और CIBIL सुधारने के टिप्स।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/hi/guides/credit-score/',
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

      {/* --- FAQ SCHEMA --- */}
      <FAQSchema faqs={faqData} />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com' },
          { name: 'हिंदी गाइड्स', url: 'https://fincado.com/hi/' },
          {
            name: 'Credit Score',
            url: 'https://fincado.com/hi/guides/credit-score/',
          },
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 border-blue-200 mb-4 px-3 py-1 text-sm font-semibold">
          Banking & Loans
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
            <Clock className="w-4 h-4" />
            12 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
            <ShieldCheck className="w-4 h-4" />
            Verified Information
          </span>
        </div>
      </header>

      <div className="mb-8">
        <ShareTools title="Credit Score Guide (Hindi)" />
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        <WikiText
          content={`
          <p>
            <strong>Credit Score</strong> आपके पूरे फाइनेंशियल जीवन का आधार है – इससे तय होता है कि आपको लोन आसानी से, सस्ते ब्याज पर मिलेगा या बार‑बार रिजेक्ट होगा। इस गाइड में क्रेडिट स्कोर को बहुत आसान हिंदी में और पूरी तरह प्रैक्टिकल तरीके से समझाया गया है।
          </p>
        `}
        />
      </div>

      {/* [AD SLOT 1] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-1" type="leaderboard" label="Sponsored" />
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- SECTION 1 --- */}
      <h2
        id="what-is-credit-score"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        1. Credit Score क्या होता है?
      </h2>
      <p className="text-slate-700 mb-4 leading-relaxed">
        क्रेडिट स्कोर एक <strong>3‑digit number</strong> होता है जो यह बताता है
        कि आप उधार लिया हुआ पैसा कितनी जिम्मेदारी से वापस करते हैं।
      </p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-6">
        <li>
          भारत में क्रेडिट स्कोर की रेंज आम तौर पर <strong>300 से 900</strong>{' '}
          के बीच होती है।
        </li>
        <li>
          जितना ज़्यादा स्कोर, उतना ज़्यादा भरोसा बैंक और लेंडर को आप पर होता
          है।
        </li>
      </ul>

      <Card className="bg-slate-50 border-slate-200 mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-slate-800">
            Credit Score कौन बनाता है?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-600 mb-3">
            भारत में चार प्रमुख क्रेडिट ब्यूरो हैं:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm font-semibold text-slate-700">
            <div className="bg-white p-2 rounded border border-slate-200 text-center">
              CIBIL
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 text-center">
              Experian
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 text-center">
              Equifax
            </div>
            <div className="bg-white p-2 rounded border border-slate-200 text-center">
              CRIF High Mark
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-4 leading-relaxed">
            ये कंपनियां आपके लोन, क्रेडिट कार्ड और EMI पेमेंट हिस्ट्री का डेटा
            कलेक्ट करके आपकी क्रेडिट रिपोर्ट और क्रेडिट स्कोर बनाती हैं।
          </p>
        </CardContent>
      </Card>

      {/* [AD SLOT 2] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2 --- */}
      <h2
        id="good-score"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        2. अच्छा Credit Score कितना होना चाहिए?
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        सिर्फ &quot;अच्छा score होना चाहिए&quot; कहना काफी नहीं है, range साफ
        समझना ज़रूरी है:
      </p>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-6 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                Score Range
              </TableHead>
              <TableHead className="font-bold text-slate-700">Rating</TableHead>
              <TableHead className="font-bold text-slate-700 hidden sm:table-cell">
                Approval Chance
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-emerald-50/50">
              <TableCell className="font-bold text-emerald-700">
                750 - 900
              </TableCell>
              <TableCell className="font-bold text-emerald-700">
                Excellent
              </TableCell>
              <TableCell className="text-sm text-slate-600 hidden sm:table-cell">
                Best (लोन जल्दी और सस्ता मिलता है)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-green-600">
                700 - 749
              </TableCell>
              <TableCell className="font-bold text-green-600">Good</TableCell>
              <TableCell className="text-sm text-slate-600 hidden sm:table-cell">
                Good (ज्यादातर प्रोडक्ट्स के लिए acceptable)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-bold text-amber-600">
                650 - 699
              </TableCell>
              <TableCell className="font-bold text-amber-600">
                Average
              </TableCell>
              <TableCell className="text-sm text-slate-600 hidden sm:table-cell">
                Risky Zone (लोन मिल भी सकता है पर रेट ज्यादा होगा)
              </TableCell>
            </TableRow>
            <TableRow className="bg-red-50/50">
              <TableCell className="font-bold text-red-600">&lt; 650</TableCell>
              <TableCell className="font-bold text-red-600">Poor</TableCell>
              <TableCell className="text-sm text-slate-600 hidden sm:table-cell">
                Rejected (Approval बहुत मुश्किल)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <Alert className="bg-indigo-50 border-indigo-200 mb-8">
        <AlertDescription className="text-indigo-900 text-sm">
          <strong>याद रखें:</strong> 750+ स्कोर होने पर लोन और क्रेडिट कार्ड के
          ऑफर्स बेहतर आते हैं – अप्रूवल जल्दी, डॉक्यूमेंटेशन हल्का और इंटरेस्ट
          रेट आमतौर पर कम।
        </AlertDescription>
      </Alert>

      {/* --- SECTION 3 --- */}
      <h2
        id="why-score-drops"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <TrendingUp className="w-6 h-6 text-red-500 rotate-180" />
        3. Credit Score क्यों गिरता है? (सबसे ज़रूरी सेक्शन)
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        क्रेडिट स्कोर अचानक नहीं गिरता, ये कुछ नियमित आदतों का नतीजा होता है:
      </p>

      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/credit-score/credit-score-factors.webp"
          alt="Factors affecting Credit Score"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            Infographic: क्रेडिट स्कोर प्रभावित करने वाले 5 मुख्य कारक
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        {[
          {
            icon: '📉',
            title: 'EMI Late Payment',
            desc: "लोन की EMI या क्रेडिट कार्ड बिल की due date मिस होना। कुछ दिन भी लेट होने पर 'delayed payment' रिपोर्ट हो जाता है।",
          },
          {
            icon: '💳',
            title: 'High Credit Utilization',
            desc: 'अगर आप हर महीने अपनी लिमिट का 80–90% या पूरा 100% यूज कर रहे हैं, तो यह lenders को risky लगता है। (Ideal: < 30%)',
          },
          {
            icon: '🏦',
            title: 'Too Many Inquiries',
            desc: 'बार‑बार Loan या Card Apply करना: हर बार जब बैंक आपका स्कोर चेक करता है (hard inquiry), तो छोटे‑छोटे पॉइंट्स कम हो सकते हैं।',
          },
          {
            icon: '💸',
            title: 'Minimum Due Trap',
            desc: "क्रेडिट कार्ड पर सिर्फ 'minimum due' भरते रहना। इससे प्रिंसिपल कम नहीं होता, ब्याज बढ़ता है, और स्कोर खराब होता है।",
          },
          {
            icon: '❌',
            title: 'Unpaid Loans / Write-off',
            desc: 'कोई पुराना लोन जिस पर पेमेंट बंद कर दिया हो। Settlement या Write-off जैसे रिमार्क्स रिपोर्ट में बहुत निगेटिव माने जाते हैं।',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 bg-white border border-slate-200 rounded-xl hover:border-red-200 hover:bg-red-50/10 transition-colors"
          >
            <div className="text-2xl shrink-0">{item.icon}</div>
            <div>
              <h4 className="font-bold text-slate-800 text-base mb-1">
                {item.title}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* [AD SLOT 3] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-3" type="leaderboard" />
      </div>

      {/* --- SECTION 4 --- */}
      <h2
        id="how-to-improve"
        className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"
      >
        <ShieldCheck className="w-6 h-6 text-emerald-600" />
        4. Credit Score बढ़ाने के 7 पक्के तरीके
      </h2>
      <p className="text-slate-700 mb-8 leading-relaxed">
        नीचे दिए गए steps लगातार follow करें तो धीरे‑धीरे score improve होना
        almost निश्चित है:
      </p>

      <div className="grid gap-4 mb-12">
        {[
          {
            title: 'EMI और Credit Card dues समय पर भरें',
            desc: 'Auto-debit या Standing Instruction लगाएँ। एक भी किश्त मिस न होने दें।',
          },
          {
            title: 'Credit card utilization 30% से कम रखें',
            desc: 'अगर लिमिट ₹1,00,000 है, तो ideally ₹30,000 तक का ही use करें।',
          },
          {
            title: 'Multiple loans एक साथ न लें',
            desc: 'पर्सनल लोन, बाइक लोन, कार्ड EMI – सब मिलकर debt burden बढ़ाते हैं। एक लोन संभल जाए, फिर नया सोचें।',
          },
          {
            title: 'Old credit cards बंद न करें',
            desc: 'पुराने कार्ड आपके क्रेडिट हिस्ट्री की उम्र बढ़ाते हैं। पुराना क्लीन ट्रैक रिकॉर्ड स्कोर के लिए पॉजिटिव होता है।',
          },
          {
            title: 'Credit report में गलती check करें',
            desc: 'साल में 1–2 बार रिपोर्ट निकालें। गलत एंट्री या डुप्लीकेट लोन दिखे तो डिस्प्यूट करें।',
          },
          {
            title: 'Minimum due से बचें',
            desc: 'हमेशा पूरा बिल अमाउंट भरें। मिनिमम अमाउंट सिर्फ इमरजेंसी में ही विकल्प होना चाहिए।',
          },
          {
            title: 'Secured + Unsecured mix रखें',
            desc: 'सिर्फ पर्सनल लोन (unsecured) ही न हो। होम लोन या कार लोन (secured) भी मिक्स में होने से प्रोफाइल हेल्दी दिखती है।',
          },
        ].map((step, index) => (
          <div
            key={index}
            className="flex gap-4 p-5 bg-white border border-slate-200 rounded-xl hover:border-emerald-300 hover:shadow-md transition-all group"
          >
            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-700 font-bold rounded-full group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              {index + 1}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg mb-1">
                {step.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* [AD SLOT 4] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-4" type="leaderboard" />
      </div>

      {/* --- SECTION 5: 90 DAYS PLAN --- */}
      <h2
        id="90-days-plan"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <CalendarDays className="w-6 h-6 text-indigo-600" />
        5. 90 दिनों में Credit Score कैसे बढ़ाएं? (Practical Plan)
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        कोई magic नहीं है जो 90 दिन में 600 से 800 कर दे – लेकिन सही steps से
        साफ improvement दिखने लगता है।
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-4">
        {[
          {
            month: 'Month 1',
            title: 'सफाई (Clean-up Phase)',
            desc: 'Overdue clear करें और Credit Utilization कम करें। एक्स्ट्रा पेमेंट करके आउटस्टैंडिंग कम करें।',
          },
          {
            month: 'Month 2',
            title: 'Discipline (On-time Track)',
            desc: 'No new loans. कोई नया लोन अप्लाई न करें। हर ड्यू डेट से पहले पेमेंट क्लियर कर दें।',
          },
          {
            month: 'Month 3',
            title: 'Stability दिखाएँ',
            desc: 'लगातार तीन महीने समय पर पेमेंट और कम यूटिलाइजेशन से ब्यूरो की नजर में पॉजिटिव सिग्नल जाता है।',
          },
        ].map((item, i) => (
          <Card key={i} className="border-indigo-100 bg-indigo-50/30">
            <CardHeader className="pb-2">
              <Badge className="w-fit mb-2 bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                🗓️ {item.month}
              </Badge>
              <CardTitle className="text-base font-bold text-indigo-900">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-slate-500 italic mb-8">
        *Realistic expectation: 90 दिनों में dramatic jump की बजाय gradual सुधार
        की सोच रखें। Strong improvement आमतौर पर 3–12 महीने की consistent habit
        से आता है।
      </p>

      {/* --- SECTION 6 --- */}
      <h2
        id="credit-card-usage"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <CreditCard className="w-6 h-6 text-purple-600" />
        6. Credit Card का सही इस्तेमाल कैसे करें?
      </h2>
      <ul className="grid sm:grid-cols-2 gap-4 mb-8">
        {[
          '1–2 cards enough हैं: बहुत सारे कार्ड्स से ट्रैकिंग मुश्किल हो जाती है।',
          'EMI conversion सावधानी से करें: हर छोटे खर्च को EMI में न बदलें।',
          'Cash withdrawal avoid करें: ATM से कैश निकालना सबसे महंगा होता है।',
          'Billing cycle समझें: स्टेटमेंट डेट और ड्यू डेट जानकर स्मार्ट खर्च करें।',
        ].map((tip, i) => (
          <li
            key={i}
            className="flex gap-3 p-4 bg-white border border-slate-200 rounded-lg items-start"
          >
            <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
            <span className="text-sm text-slate-700">{tip}</span>
          </li>
        ))}
      </ul>

      {/* [AD SLOT 5] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-5" type="leaderboard" />
      </div>

      {/* --- SECTION 7 --- */}
      <h2
        id="interest-impact"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        7. Credit Score और Loan Interest का relation
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        High credit score सिर्फ approval आसान नहीं बनाता, वह आपको{' '}
        <strong>लाखों रुपये की saving</strong> भी दिला सकता है।
      </p>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h3 className="font-bold text-amber-900 mb-4 text-lg">
          1% Interest Difference कितना महंगा होता है?
        </h3>
        <p className="text-sm text-amber-800 mb-4">
          मान लीजिए: Loan amount: ₹20,00,000 (15 साल के लिए)
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-100">
            <span className="text-slate-600 font-medium">
              Option A (Score &lt; 700)
            </span>
            <span className="text-red-600 font-bold">
              11% Interest (EMI ~ ₹22,800)
            </span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-amber-100">
            <span className="text-slate-600 font-medium">
              Option B (Score &gt; 750)
            </span>
            <span className="text-emerald-600 font-bold">
              10% Interest (EMI ~ ₹21,500)
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-amber-200/50">
          <p className="text-slate-700 font-medium">
            Difference: ~ ₹1,300 प्रति महीना
          </p>
          <p className="text-red-600 font-extrabold text-lg mt-2 sm:mt-0">
            15 साल में Extra Payment: ₹2,34,000
          </p>
        </div>
      </div>

      <div className="text-center mb-8">
        <Link href="/hi/emi-calculator/">
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
          >
            👉 खुद चेक करें: EMI कैलकुलेटर
          </Button>
        </Link>
      </div>

      {/* --- SECTION 8 --- */}
      <h2 id="check-score" className="text-2xl font-bold text-slate-900 mb-4">
        8. Credit Score check करने से score गिरता है?
      </h2>
      <p className="text-slate-700 mb-4">यह बहुत common confusion है।</p>
      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card className="border-green-200 bg-green-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-green-800">
              Self Check (Soft Inquiry)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              <strong>NO Impact:</strong> जब आप खुद किसी ऐप/वेबसाइट से अपना
              स्कोर देखते हैं, तो इसे सॉफ्ट इंक्वायरी कहा जाता है। इससे स्कोर कम
              नहीं होता।
            </p>
          </CardContent>
        </Card>
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-amber-800">
              Bank Inquiry (Hard Inquiry)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">
              <strong>Low Impact:</strong> जब आप लोन या कार्ड के लिए अप्लाई करते
              हैं और बैंक चेक करता है। बहुत सारी इंक्वायरीज से पॉइंट्स कम हो
              सकते हैं。
            </p>
          </CardContent>
        </Card>
      </div>

      {/* [AD SLOT 6] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-6" type="leaderboard" />
      </div>

      {/* --- SECTION 9 --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        9. Credit Score improve होने में कितना time लगता है?
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {[
          { time: '1 Month', desc: 'Small change (थोड़ी हलचल, drastic नहीं).' },
          {
            time: '3-6 Months',
            desc: 'Visible improvement (अगर आपने overdue clear किए).',
          },
          {
            time: '6-12 Months',
            desc: 'Strong profile (लगातार अच्छी हिस्ट्री से प्रोफाइल मजबूत बनती है).',
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex-1 bg-slate-50 p-4 rounded-lg border border-slate-200 text-center"
          >
            <div className="text-lg font-bold text-slate-800 mb-1">
              {item.time}
            </div>
            <div className="text-xs text-slate-500">{item.desc}</div>
          </div>
        ))}
      </div>

      {/* --- SECTION 10 --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        10. Credit Score improve करने में common mistakes
      </h2>
      <ul className="space-y-3 mb-12">
        {[
          "Fake apps और scams: 'Guaranteed 800+ score' का दावा करने वाले फ्रॉड हो सकते हैं。",
          'Credit repair scams: हाई फीस लेकर झूठे वादे करने वाली एजेंसीज से बचें。',
          'पुराने accounts तुरंत बंद करना: इससे क्रेडिट हिस्ट्री छोटी हो जाती है।',
          'Too many enquiries: हर WhatsApp/SMS ऑफर पर क्लिक करके लोन अप्लाई करना।',
        ].map((mistake, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-3 bg-red-50 border border-red-100 rounded-lg"
          >
            <span className="text-red-500 font-bold shrink-0">❌</span>
            <span className="text-sm text-red-900">{mistake}</span>
          </li>
        ))}
      </ul>

      {/* --- FAQS --- */}
      <h2 id="faqs" className="text-2xl font-bold text-slate-900 mb-6">
        11. FAQs (Hindi)
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

      {/* [AD SLOT 7] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-cibil-7" type="leaderboard" />
      </div>

      {/* --- CONCLUSION --- */}
      <Card className="bg-slate-900 text-slate-100 border-none mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            12. निष्कर्ष: Credit Score – आपकी Financial Life की नींव
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            क्रेडिट स्कोर सिर्फ एक नंबर नहीं, आपकी{' '}
            <strong>financial reputation</strong> है। अच्छा स्कोर आपको आसान
            अप्रूवल और सस्ता लोन दिलाता है, जबकि खराब स्कोर महंगे ब्याज का कारण
            बनता है।
          </p>
          <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-200 italic leading-relaxed">
              &quot;EMI टाइम पर भरें, यूटिलाइजेशन कम रखें और बेवजह लोन से बचें।
              स्कोर धीरे‑धीरे बनता है, 6–12 महीने की अच्छी आदतें किसी भी मैजिक
              ट्रिक से ज़्यादा पावरफुल हैं।&quot;
            </p>
          </div>
        </CardContent>
      </Card>

      <AuthorBio />
    </article>
  );
}

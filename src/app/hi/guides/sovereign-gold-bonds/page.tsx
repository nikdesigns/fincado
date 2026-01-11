import type { Metadata } from 'next';
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Coins,
  CalendarDays,
  Clock,
  ShieldCheck,
  Landmark,
  TrendingUp,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'Sovereign Gold Bond (SGB) Guide Hindi: ब्याज, टैक्स और नियम | Fincado',
  description:
    'SGB Guide in Hindi: Sovereign Gold Bond क्या है? जानें 2.5% ब्याज, टैक्स फ्री रिटर्न और मैच्योरिटी के नियम। Physical Gold vs SGB की पूरी तुलना।',
  keywords: [
    'Sovereign Gold Bond Hindi',
    'SGB Interest Rate',
    'SGB Tax Benefits Hindi',
    'How to buy SGB online',
    'SGB Redemption Rules',
  ],
  alternates: {
    canonical: 'https://fincado.com/hi/guides/sovereign-gold-bonds/',
  },
  openGraph: {
    title: 'Sovereign Gold Bond (SGB): सोना खरीदने का सबसे स्मार्ट तरीका',
    description:
      'गोल्ड बॉन्ड में निवेश करें और पाएं 2.5% एक्स्ट्रा ब्याज + टैक्स फ्री रिटर्न। पूरी जानकारी हिंदी में।',
    url: 'https://fincado.com/hi/guides/sovereign-gold-bonds/',
    type: 'article',
    images: [
      {
        url: 'https://fincado.com/images/guides/sgb/sgb-guide-hindi.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiSGBGuide() {
  // --- FAQ DATA ---
  const faqData = [
    {
      question: 'SGB पर कितना ब्याज मिलता है?',
      answer:
        'SGB पर सालाना 2.5% का फिक्स्ड ब्याज मिलता है, जो साल में दो बार आपके बैंक खाते में जमा किया जाता है।',
    },
    {
      question: 'क्या SGB टैक्स फ्री है?',
      answer:
        'हाँ, अगर आप SGB को मैच्योरिटी (8 साल) तक होल्ड करते हैं, तो कैपिटल गेन्स टैक्स पूरी तरह माफ होता है। लेकिन सालाना ब्याज पर टैक्स लगता है।',
    },
    {
      question: 'क्या मैं SGB को 8 साल से पहले बेच सकता हूँ?',
      answer:
        'हाँ, आप 5 साल बाद RBI के जरिए रिडीम कर सकते हैं या स्टॉक एक्सचेंज पर कभी भी बेच सकते हैं (अगर डीमैट में है)。',
    },
    {
      question: 'SGB कैसे खरीदें?',
      answer:
        'आप अपने बैंक (नेट बैंकिंग), पोस्ट ऑफिस, स्टॉक ब्रोकर (Zerodha, Upstox) या एजेंट के जरिए SGB खरीद सकते हैं।',
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
            headline:
              'Sovereign Gold Bond (SGB) Guide: ब्याज, टैक्स और रिडेम्पशन',
            description:
              'Sovereign Gold Bond क्या है? जानें 2.5% ब्याज, टैक्स फ्री रिटर्न और मैच्योरिटी के नियम। Physical Gold vs SGB की पूरी तुलना।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/hi/guides/sovereign-gold-bonds/',
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
                url: 'https://fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-21',
            dateModified: '2025-12-21',
          }),
        }}
      />
      <FAQSchema faqs={faqData} />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/' },
          { name: 'हिंदी गाइड्स', url: 'https://fincado.com/hi/' },
          {
            name: 'Sovereign Gold Bonds',
            url: 'https://fincado.com/hi/guides/sovereign-gold-bonds/',
          },
        ]}
      />

      {/* --- ARTICLE HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200 mb-4 px-3 py-1 text-sm font-semibold">
          Gold Investment
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          Sovereign Gold Bonds (SGB) Guide: ब्याज, टैक्स और रिडेम्पशन
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
            <Landmark className="w-4 h-4" />
            RBI Regulated
          </span>
        </div>
      </header>

      <div className="mb-8">
        <ShareTools title="SGB Guide (Hindi)" />
      </div>

      {/* --- ARTICLE CONTENT --- */}
      <div className="prose prose-slate max-w-none mb-8">
        <WikiText
          content={`
          <p>
            <strong>Sovereign Gold Bonds (SGB)</strong> भारत सरकार और RBI द्वारा जारी किया गया एक अनोखा डिजिटल गोल्ड निवेश विकल्प है। यह आपको सोने की कीमतों का फायदा तो देता ही है, साथ ही <strong>2.5% तक अतिरिक्त ब्याज, टैक्स बेनिफिट और पूरी तरह सरकारी सुरक्षा</strong> भी प्रदान करता है।
          </p>
        `}
        />
      </div>

      {/* ✅ IMAGE PLACEHOLDER: HERO */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/sgb/sgb-guide-hero.webp"
          alt="Sovereign Gold Bond Concept: Gold + Interest"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            SGB = सोने का भाव + 2.5% सालाना ब्याज (Dual Benefit)
          </p>
        </div>
      </div>

      {/* [AD SLOT 1] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-1" type="leaderboard" label="Sponsored" />
      </div>

      <hr className="my-8 border-slate-200" />

      {/* --- SECTION 1: WHAT IS SGB --- */}
      <h2
        id="what-is-sgb"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <Landmark className="w-6 h-6 text-amber-600" />
        1. Sovereign Gold Bonds क्या हैं?
      </h2>
      <p className="text-slate-700 mb-6 leading-relaxed">
        SGB एक सरकारी सिक्योरिटी (Government Security) है जिसकी वैल्यू सोने
        (Gold) के भाव से जुड़ी होती है। इसे <strong>RBI</strong> भारत सरकार की
        ओर से जारी करता है।
      </p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-8">
        <li>1 यूनिट SGB = 1 ग्राम (999 शुद्धता वाला) सोना।</li>
        <li>
          आप इसमें डीमैट फॉर्म या फिजिकल सर्टिफिकेट के रूप में निवेश कर सकते
          हैं।
        </li>
      </ul>

      <Card className="bg-amber-50 border-amber-200 mb-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold text-amber-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" /> मुख्य हाइलाइट्स (Key Features)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex gap-2 items-center text-sm text-amber-900">
              <span className="font-bold">समर्थन:</span> भारत सरकार (Sovereign
              Guarantee)
            </div>
            <div className="flex gap-2 items-center text-sm text-amber-900">
              <span className="font-bold">ब्याज:</span> 2.5% सालाना (फिक्स्ड)
            </div>
            <div className="flex gap-2 items-center text-sm text-amber-900">
              <span className="font-bold">अवधि:</span> 8 साल (5 साल बाद निकलने
              का विकल्प)
            </div>
            <div className="flex gap-2 items-center text-sm text-amber-900">
              <span className="font-bold">रिडेम्पशन:</span> मैच्योरिटी पर पैसा
              सीधे बैंक खाते में
            </div>
          </div>
        </CardContent>
      </Card>

      {/* [AD SLOT 2] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-2" type="leaderboard" />
      </div>

      {/* --- SECTION 2: SGB BENEFITS --- */}
      <h2
        id="benefits"
        className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2"
      >
        <Coins className="w-6 h-6 text-yellow-500" />
        2. SGB क्यों बेहतर है Physical Gold से?
      </h2>
      <p className="text-slate-700 mb-6">
        फिजिकल गोल्ड (जेवर, सिक्के) खरीदने में मेकिंग चार्ज और सुरक्षा की चिंता
        होती है। SGB इन सभी समस्याओं का समाधान है।
      </p>

      <div className="grid gap-6 mb-8">
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              1. 2.5% अतिरिक्त ब्याज (Extra Interest)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-sm text-slate-600 mb-4">
              फिजिकल गोल्ड सिर्फ भाव बढ़ने पर फायदा देता है। लेकिन SGB में आपको
              सोने के भाव के अलावा <strong>हर साल 2.5% ब्याज</strong> भी मिलता
              है।
            </p>
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-900 text-sm">
                <strong>उदाहरण:</strong>
                <br />
                निवेश: ₹1,00,000 (SGB में)
                <br />
                ब्याज: ₹2,500 हर साल (सीधे बैंक खाते में)
                <br />
                <span className="font-bold">
                  8 साल में कुल ब्याज: ₹20,000 (सोने के भाव से अलग एक्स्ट्रा
                  कमाई)
                </span>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              2. कोई मेकिंग चार्ज नहीं, कोई चोरी का डर नहीं
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5" /> जेवर
                खरीदने पर 10-20% मेकिंग चार्ज लगता है, जो निवेश के लिहाज से घाटा
                है। SGB में <strong>0% मेकिंग चार्ज</strong> है。
              </li>
              <li className="flex gap-2">
                <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5" /> SGB
                डिजिटल फॉर्मेट में होता है (RBI की किताबों में या डीमैट में),
                इसलिए चोरी या शुद्धता की कोई चिंता नहीं。
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* [AD SLOT 3] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-3" type="leaderboard" />
      </div>

      {/* --- SECTION 3: TAX BENEFITS --- */}
      <h2
        id="tax-benefits"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <TrendingUp className="w-6 h-6 text-emerald-600" />
        3. टैक्स बेनिफिट्स (Tax on SGB)
      </h2>
      <p className="text-slate-700 mb-6">
        SGB का सबसे बड़ा फायदा इसका टैक्स स्ट्रक्चर है, खासकर मैच्योरिटी पर。
      </p>

      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-emerald-900">
              मैच्योरिटी पर टैक्स फ्री
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-emerald-800 leading-relaxed">
              अगर आप SGB को पूरे <strong>8 साल (मैच्योरिटी)</strong> तक होल्ड
              करते हैं, तो सोने का भाव बढ़ने से हुआ पूरा मुनाफा (Capital Gain){' '}
              <strong>100% टैक्स फ्री</strong> होता है।
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800">
              ब्याज पर टैक्स
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600 leading-relaxed">
              जो 2.5% सालाना ब्याज मिलता है, वह आपकी इनकम में जुड़ता है और आपके
              टैक्स स्लैब के अनुसार टैक्सेबल होता है。
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-blue-50 border-blue-200 mb-8">
        <Info className="h-5 w-5 text-blue-600 mt-0.5" />
        <AlertDescription className="text-blue-900 text-sm leading-relaxed">
          <strong>ध्यान दें:</strong> यह छूट केवल इंडिविजुअल इन्वेस्टर्स के लिए
          है। फिजिकल गोल्ड या गोल्ड ETF बेचने पर आपको टैक्स देना पड़ता है, लेकिन
          SGB मैच्योरिटी पर नहीं।
        </AlertDescription>
      </Alert>

      {/* ✅ IMAGE PLACEHOLDER: TAX CHART */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
        <Image
          src="/images/guides/sgb/sgb-tax-benefits-hindi.webp"
          alt="SGB Tax Benefits Explained Chart"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            चार्ट: SGB पर टैक्स के नियम (ब्याज vs मैच्योरिटी)
          </p>
        </div>
      </div>

      {/* [AD SLOT 4] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-4" type="leaderboard" />
      </div>

      {/* --- SECTION 4: HOW TO BUY --- */}
      <h2
        id="how-to-buy"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <ArrowRight className="w-6 h-6 text-blue-600" />
        4. SGB कैसे खरीदें? (Online & Offline)
      </h2>
      <p className="text-slate-700 mb-6">
        SGB की नई सीरीज़ RBI द्वारा समय-समय पर (Tranches में) जारी की जाती है。
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          {
            title: 'Bank (Net Banking)',
            desc: 'SBI, HDFC, ICICI, Axis आदि की वेबसाइट से।',
          },
          {
            title: 'Stock Broker (Demat)',
            desc: 'Zerodha, Upstox, Groww आदि के गोल्ड बॉन्ड सेक्शन से।',
          },
          {
            title: 'Post Office',
            desc: 'फॉर्म भरकर ऑफलाइन आवेदन कर सकते हैं।',
          },
        ].map((item, i) => (
          <Card key={i} className="border-slate-200 bg-slate-50">
            <CardContent className="p-4">
              <h4 className="font-bold text-slate-800 text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-slate-600">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
        <h4 className="font-bold text-yellow-900 mb-1">
          ऑनलाइन खरीदने पर डिस्काउंट
        </h4>
        <p className="text-sm text-yellow-800">
          आमतौर पर, अगर आप ऑनलाइन अप्लाई करते हैं और डिजिटल पेमेंट करते हैं, तो
          सरकार प्रति ग्राम <strong>₹50 की छूट</strong> देती है।
        </p>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-3">
        सेकेंडरी मार्केट (Stock Exchange)
      </h3>
      <p className="text-slate-700 mb-8">
        अगर कोई नई सीरीज़ नहीं खुली है, तो आप शेयर बाजार (NSE/BSE) से पुराने
        लिस्टेड SGB यूनिट्स भी खरीद सकते हैं। इसके लिए डीमैट अकाउंट जरूरी है।
      </p>

      {/* [AD SLOT 5] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-5" type="leaderboard" />
      </div>

      {/* --- SECTION 5: EXIT OPTIONS --- */}
      <h2
        id="exit-options"
        className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2"
      >
        <Lock className="w-6 h-6 text-red-500" />
        5. पैसे कब निकाल सकते हैं? (Premature Exit)
      </h2>
      <p className="text-slate-700 mb-6">
        SGB का कार्यकाल 8 साल का है, लेकिन निकलने के विकल्प मौजूद हैं:
      </p>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">विकल्प</TableHead>
              <TableHead className="font-bold text-slate-700">
                कब संभव है?
              </TableHead>
              <TableHead className="font-bold text-slate-700">शर्तें</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-emerald-50/50">
              <TableCell className="font-bold text-emerald-800">
                मैच्योरिटी (Maturity)
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                8 साल बाद
              </TableCell>
              <TableCell className="text-emerald-700">
                ऑटोमैटिक रिडेम्पशन, टैक्स फ्री।
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                RBI विंडो (Early Exit)
              </TableCell>
              <TableCell>5 साल बाद</TableCell>
              <TableCell>
                ब्याज भुगतान की तारीखों पर रिडीम कर सकते हैं。
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                स्टॉक एक्सचेंज (Sell)
              </TableCell>
              <TableCell>कभी भी</TableCell>
              <TableCell>
                डीमैट खाता जरूरी, लिक्विडिटी कम हो सकती है。
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* [AD SLOT 6] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-6" type="leaderboard" />
      </div>

      {/* --- SECTION 6: COMPARISON --- */}
      <h2 id="comparison" className="text-2xl font-bold text-slate-900 mb-4">
        6. SGB vs Physical Gold vs ETF – किसे चुनें?
      </h2>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">फीचर</TableHead>
              <TableHead className="font-bold text-slate-700">
                Sovereign Gold Bond
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Physical Gold
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Gold ETF
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ब्याज</TableCell>
              <TableCell className="font-bold text-emerald-600">
                2.5% सालाना
              </TableCell>
              <TableCell className="text-slate-500">कुछ नहीं</TableCell>
              <TableCell className="text-slate-500">कुछ नहीं</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">सुरक्षा</TableCell>
              <TableCell className="font-bold text-blue-600">
                सरकारी गारंटी
              </TableCell>
              <TableCell className="text-red-500">खुद रखनी पड़ती है</TableCell>
              <TableCell className="text-slate-700">डिजिटल (डीमैट)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">मेकिंग चार्ज</TableCell>
              <TableCell className="font-bold text-emerald-600">0%</TableCell>
              <TableCell className="text-red-500">8–25%</TableCell>
              <TableCell className="text-slate-700">0% (ब्रोकरेज)</TableCell>
            </TableRow>
            <TableRow className="bg-emerald-50/30">
              <TableCell className="font-medium">टैक्स (मैच्योरिटी)</TableCell>
              <TableCell className="font-bold text-emerald-600">
                Tax Free
              </TableCell>
              <TableCell className="text-slate-700">Taxable</TableCell>
              <TableCell className="text-slate-700">Taxable</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* --- SECTION 7: FAQS --- */}
      <h2 id="faqs" className="text-2xl font-bold text-slate-900 mb-6">
        7. सामान्य प्रश्न (FAQs)
      </h2>
      <div className="mb-12">
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              q: 'SGB में निवेश की लिमिट क्या है?',
              a: 'एक व्यक्ति (Individual) एक वित्तीय वर्ष में न्यूनतम 1 ग्राम और अधिकतम 4 किलोग्राम तक SGB खरीद सकता है。',
            },
            {
              q: 'क्या SGB पर लोन मिल सकता है?',
              a: 'हाँ, SGB को कोलैटरल (गिरवी) रखकर आप बैंकों से लोन ले सकते हैं। इसका LTV रेश्यो फिजिकल गोल्ड लोन जैसा ही होता है。',
            },
            {
              q: 'अगर 8 साल बाद सोने का भाव गिर गया तो?',
              a: 'SGB में कैपिटल प्रोटेक्शन की गारंटी नहीं है। आपको रिडेम्पशन के समय के बाजार भाव (Market Price) के अनुसार ही पैसा मिलेगा। अगर सोना सस्ता हुआ, तो नुकसान हो सकता है。',
            },
          ].map((item, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-slate-800 font-semibold hover:text-blue-700 text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* --- SECTION 8: CONCLUSION --- */}
      <Card className="bg-slate-900 text-slate-100 border-none mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            निष्कर्ष: SGB – गोल्ड + ब्याज का स्मार्ट कॉम्बो
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            अगर आप सोने को सिर्फ पहनने के लिए नहीं, बल्कि <strong>निवेश</strong>{' '}
            के लिए खरीद रहे हैं, तो Sovereign Gold Bond सबसे बेहतरीन विकल्प है।
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" /> फिजिकल गोल्ड की तरह भाव बढ़ने
              का फायदा।
            </li>
            <li className="flex gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" /> ऊपर से 2.5% का फिक्स्ड ब्याज।
            </li>
            <li className="flex gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" /> 8 साल बाद टैक्स फ्री रिटर्न।
            </li>
            <li className="flex gap-2 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" /> चोरी या मेकिंग चार्ज की कोई
              चिंता नहीं।
            </li>
          </ul>
          <p className="text-slate-300 italic">
            स्मार्ट निवेशक अपने पोर्टफोलियो का 5-10% हिस्सा गोल्ड में रखते हैं,
            और उसके लिए SGB पहली पसंद होनी चाहिए।
          </p>
        </CardContent>
      </Card>

      {/* [AD SLOT 7] */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-sgb-7" type="leaderboard" />
      </div>

      {/* --- FOOTER ELEMENTS --- */}
      <AuthorBio />

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <p className="text-xs text-slate-500 leading-relaxed italic">
          <strong>अस्वीकरण:</strong> Sovereign Gold Bond भारत सरकार की योजना है
          और इसके नियम समय-समय पर बदल सकते हैं। निवेश करने से पहले कृपया RBI की
          आधिकारिक अधिसूचना या अपने बैंक से नवीनतम जानकारी की पुष्टि करें। यह
          लेख केवल जानकारी के लिए है, वित्तीय सलाह नहीं।
        </p>
      </div>
    </article>
  );
}

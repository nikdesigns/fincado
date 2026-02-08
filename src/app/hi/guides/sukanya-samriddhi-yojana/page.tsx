import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Baby,
  Clock,
  CheckCircle2,
  AlertTriangle,
  PiggyBank,
  Landmark,
  Calculator,
  Percent,
  FileText,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'सुकन्या समृद्धि योजना (SSY) 2025: ब्याज दर और नियम (पूरी जानकारी)',
  description:
    'SSY 2025 की पूरी जानकारी: वर्तमान ब्याज दर 8.2%, खाता खोलने के नियम, डॉक्यूमेंट्स, और 21 साल बाद मिलने वाली मैच्योरिटी राशि।',
  alternates: {
    canonical: 'https://fincado.com/hi/guides/sukanya-samriddhi-yojana/',
  },
  openGraph: {
    title: 'सुकन्या समृद्धि योजना (SSY) 2025: ब्याज दर और नियम',
    description:
      'अपनी बेटी के भविष्य के लिए SSY में निवेश करें। जानें ब्याज दर, टैक्स लाभ और निकासी के नियम।',
    type: 'article',
    url: 'https://fincado.com/hi/guides/sukanya-samriddhi-yojana/',
    images: [
      { url: '/images/guides/hi/ssy-hero-2025.webp', width: 1200, height: 630 }
    ],
  },
};

export default function HindiSSYGuide() {
  const pageTitle =
    'सुकन्या समृद्धि योजना (SSY) 2025: ब्याज दर और खाता खोलने के नियम';

  // --- FAQ DATA ---
  const faqData = [
    {
      question: 'क्या NRI माता-पिता SSY खाता खोल सकते हैं?',
      answer:
        'नहीं, केवल भारत के निवासी ही SSY खाता खोल सकते हैं। अगर खाता खोलने के बाद लड़की या अभिभावक NRI बन जाते हैं, तो खाता बंद करना होगा。',
    },
    {
      question: 'क्या 3 बेटियों के लिए SSY खाता खोल सकते हैं?',
      answer:
        'सामान्यत: प्रति परिवार अधिकतम 2 खाते खोले जा सकते हैं। लेकिन अगर दूसरी डिलीवरी में जुड़वां या तीन बच्चे (triplets) होते हैं, तो मेडिकल सर्टिफिकेट देकर तीसरा खाता खोला जा सकता है。',
    },
    {
      question: '₹1.5 लाख से ज्यादा जमा करने पर क्या होगा?',
      answer:
        'एक वित्तीय वर्ष में ₹1.5 लाख से अधिक जमा की गई राशि पर कोई ब्याज नहीं मिलेगा और वह राशि आपको वापस कर दी जाएगी。',
    },
    {
      question: 'क्या बेटी खुद खाता operate कर सकती है?',
      answer:
        'हां, 18 वर्ष की आयु पूरी करने के बाद बेटी आवश्यक दस्तावेज जमा करके अपने खाते का संचालन खुद कर सकती है。',
    }
  ];

  return (
    <article className="max-w-4xl mx-auto">
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'गाइड्स', url: 'https://fincado.com/hi/guides/' },
          {
            name: 'सुकन्या समृद्धि योजना',
            url: 'https://fincado.com/hi/guides/sukanya-samriddhi-yojana/',
          }
        ]}
      />

      <FAQSchema faqs={faqData} />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <Badge className="bg-pink-100 text-pink-800 hover:bg-pink-200 border-pink-200 mb-4 px-3 py-1 text-sm font-semibold uppercase tracking-wide">
          सरकारी योजनाएं (Government Schemes)
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          {pageTitle}
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
          सुकन्या समृद्धि योजना (SSY) भारत सरकार की एक विशेष बचत योजना है जो
          खासतौर पर बेटियों के भविष्य को सुरक्षित करने के लिए शुरू की गई है।
          &quot;बेटी बचाओ बेटी पढ़ाओ&quot; अभियान के तहत लाई गई यह योजना
          माता-पिता को अपनी बेटी की शिक्षा और शादी के लिए बड़ी रकम जोड़ने में
          मदद करती है, वह भी पूरी तरह टैक्स-फ्री।
        </p>
      </header>

      {/* 🖼️ IMAGE 1: HERO */}
      <div className="mb-8 rounded-xl overflow-hidden border border-pink-200 shadow-sm bg-pink-50 relative aspect-video">
        <Image
          src="/images/guides/ssy/ssy-concept-hero.webp"
          alt="Sukanya Samriddhi Yojana Hindi Guide"
          fill
          className="object-cover"
        />
      </div>

      {/* AD SLOT 1 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-top" type="leaderboard" label="Sponsored" />
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        <WikiText
          content={`
          <h2>सुकन्या समृद्धि योजना 2025: मुख्य बातें</h2>
          <p>सुकन्या समृद्धि योजना की कुछ प्रमुख खासियतें जो इसे सबसे अच्छी सरकारी योजनाओं में से एक बनाती हैं:</p>
        `}
        />
      </div>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700 w-1/3">
                विशेषता
              </TableHead>
              <TableHead className="font-bold text-slate-700">विवरण</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium text-slate-900">
                वर्तमान ब्याज दर
              </TableCell>
              <TableCell className="text-emerald-700 font-bold">
                8.2% सालाना (जनवरी-मार्च 2025)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-900">
                न्यूनतम जमा राशि
              </TableCell>
              <TableCell>₹250 प्रति वर्ष</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-900">
                अधिकतम जमा राशि
              </TableCell>
              <TableCell>₹1,50,000 प्रति वर्ष</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-900">
                खाता खोलने की आयु
              </TableCell>
              <TableCell>बेटी के जन्म से 10 वर्ष की आयु तक</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-900">
                जमा अवधि
              </TableCell>
              <TableCell>15 वर्ष</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium text-slate-900">
                मैच्योरिटी
              </TableCell>
              <TableCell>21 वर्ष या 18 वर्ष के बाद शादी तक</TableCell>
            </TableRow>
            <TableRow className="bg-pink-50/50">
              <TableCell className="font-medium text-pink-900">
                टैक्स लाभ
              </TableCell>
              <TableCell className="font-bold text-pink-700">
                EEE (पूरी तरह टैक्स फ्री)
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Percent className="w-6 h-6 text-emerald-600" />
        सुकन्या समृद्धि योजना की ब्याज दर 2025
      </h2>
      <p className="text-slate-700 mb-6">
        सुकन्या समृद्धि योजना की ब्याज दर सरकार द्वारा हर तिमाही में review की
        जाती है और यह अन्य छोटी बचत योजनाओं की तुलना में अधिक होती है।
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-emerald-900">
              वर्तमान ब्याज दर
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-700 mb-2">
              8.2%{' '}
              <span className="text-sm font-normal text-slate-600">
                प्रति वर्ष
              </span>
            </div>
            <p className="text-sm text-slate-700">
              (जनवरी 2025 से मार्च 2025 तक)
            </p>
            <p className="text-xs text-slate-500 mt-2">
              यह दर वार्षिक चक्रवृद्धि (annually compounded) होती है。
            </p>
          </CardContent>
        </Card>

        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-bold text-slate-700 h-9">
                  अवधि
                </TableHead>
                <TableHead className="font-bold text-slate-700 h-9 text-right">
                  ब्याज दर
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="h-10">
                <TableCell>जनवरी-मार्च 2025 (Q4)</TableCell>
                <TableCell className="text-right font-bold">8.2%</TableCell>
              </TableRow>
              <TableRow className="h-10">
                <TableCell>अक्टूबर-दिसंबर 2024 (Q3)</TableCell>
                <TableCell className="text-right">8.2%</TableCell>
              </TableRow>
              <TableRow className="h-10">
                <TableCell>जुलाई-सितंबर 2024 (Q2)</TableCell>
                <TableCell className="text-right">8.2%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <Alert className="bg-amber-50 border-amber-200 mb-8">
        <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5" />
        <AlertDescription className="text-amber-900 text-sm leading-relaxed">
          <strong>महत्वपूर्ण:</strong> SSY की ब्याज दर PPF से 1% ज्यादा और बैंक
          FD से 1.5-2% ज्यादा होती है।
        </AlertDescription>
      </Alert>

      {/* AD SLOT 2 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-interest-rect" type="box" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <UserCheck className="w-6 h-6 text-blue-600" />
        खाता खोलने की योग्यता और शर्तें
      </h2>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Baby className="w-4 h-4" /> बेटी की आयु सीमा
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <p>• जन्म से लेकर 10 वर्ष की आयु तक।</p>
            <p>• 10 वर्ष पूरे होने से पहले खाता खोलना अनिवार्य है。</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <UserCheck className="w-4 h-4" /> कौन खोल सकता है?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-700">
            <p>• माता-पिता या कानूनी अभिभावक।</p>
            <p>• एक बेटी के नाम पर केवल एक ही खाता।</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <h3 className="font-bold text-slate-900 mb-3 text-lg flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" /> जरूरी दस्तावेज
          (Documents)
        </h3>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 text-sm">
          <li>
            <strong>खाता खोलने का फॉर्म:</strong> बैंक या पोस्ट ऑफिस से प्राप्त
            करें。
          </li>
          <li>
            <strong>बेटी का जन्म प्रमाण पत्र (Birth Certificate):</strong> यह
            सबसे जरूरी दस्तावेज है。
          </li>
          <li>
            <strong>माता-पिता की पहचान व पता प्रमाण:</strong> आधार कार्ड, पैन
            कार्ड, पासपोर्ट आदि。
          </li>
          <li>
            <strong>पासपोर्ट साइज फोटो:</strong> माता-पिता और बेटी की फोटो。
          </li>
          <li>
            <strong>शुरुआती जमा राशि:</strong> न्यूनतम ₹250 (नकद/चेक)。
          </li>
        </ol>
      </div>

      {/* AD SLOT 3 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-opening-banner" type="leaderboard" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Landmark className="w-6 h-6 text-purple-600" />
        न्यूनतम और अधिकतम जमा राशि
      </h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Card className="bg-white border-slate-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-slate-500 mb-1">
              न्यूनतम वार्षिक जमा
            </div>
            <div className="text-xl font-bold text-slate-900">₹250</div>
            <p className="text-xs text-slate-400 mt-2">नहीं तो ₹50 पेनल्टी</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-slate-500 mb-1">
              अधिकतम वार्षिक जमा
            </div>
            <div className="text-xl font-bold text-slate-900">₹1,50,000</div>
            <p className="text-xs text-slate-400 mt-2">80C के तहत टैक्स छूट</p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-blue-50 border-blue-200 mb-8">
        <Clock className="w-5 h-5 text-blue-600 mt-0.5" />

        <AlertTitle className="text-blue-900 font-bold text-sm">
          जमा अवधि (Deposit Period)
        </AlertTitle>
        <AlertDescription className="text-blue-800 text-sm">
          आपको खाता खोलने की तारीख से केवल 15 साल तक पैसे जमा करने होते हैं।
          15वें साल के बाद 21वें साल (मैच्योरिटी) तक आपको कुछ जमा नहीं करना
          होता, लेकिन ब्याज मिलता रहता है。
        </AlertDescription>
      </Alert>

      {/* 🖼️ IMAGE 2: DEPOSIT LIMITS */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50 relative aspect-video">
        <Image
          src="/images/guides/ssy/ssy-deposit-rules.webp"
          alt="SSY Minimum and Maximum Deposit Limits Hindi"
          fill
          className="object-contain p-4"
        />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <PiggyBank className="w-6 h-6 text-pink-500" />
        मैच्योरिटी पर कितना पैसा मिलेगा?
      </h2>
      <p className="text-slate-700 mb-6">
        मैच्योरिटी राशि आपकी जमा राशि और ब्याज दर (8.2%) पर निर्भर करती है। आइए
        उदाहरण से समझते हैं:
      </p>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div>
            <div className="font-bold text-slate-800">
              न्यूनतम जमा (₹250/माह)
            </div>
            <div className="text-xs text-slate-500">
              15 साल में कुल जमा: ₹45,000
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-emerald-600">₹1.10 लाख+</div>
            <div className="text-xs text-emerald-600">अनुमानित मैच्योरिटी</div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <div>
            <div className="font-bold text-slate-800">
              अधिकतम जमा (₹1.5 लाख/वर्ष)
            </div>
            <div className="text-xs text-slate-500">
              15 साल में कुल जमा: ₹22.50 लाख
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-emerald-600">₹69-70 लाख</div>
            <div className="text-xs text-emerald-600">पूरी तरह टैक्स-फ्री</div>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center mb-8">
        <h3 className="text-lg font-bold text-emerald-900 mb-2">
          अपनी रिटर्न कैलकुलेट करें
        </h3>
        <p className="text-emerald-800 text-sm mb-4">
          जानें कि आपको अपनी जमा राशि पर कितना ब्याज मिलेगा。
        </p>
        <Link href="/hi/sukanya-samriddhi">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold">
            <Calculator className="w-4 h-4 mr-2" /> SSY कैलकुलेटर खोलें
          </Button>
        </Link>
      </div>

      {/* AD SLOT 4 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-maturity-rect" type="box" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        निकासी के नियम (Withdrawal Rules)
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              उच्च शिक्षा के लिए (Partial)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700 space-y-2">
            <p>• जब बेटी 18 वर्ष की हो जाए या 10वीं पास कर ले。</p>
            <p>
              • पिछले वर्ष के बैलेंस का <strong>50% तक</strong> निकाल सकते हैं。
            </p>
            <p>• कॉलेज फीस या एडमिशन के लिए।</p>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardHeader className="bg-slate-50 pb-3 border-b border-slate-100">
            <CardTitle className="text-base font-bold text-slate-800">
              शादी के लिए (Closure)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-sm text-slate-700 space-y-2">
            <p>
              • बेटी के 18 साल पूरे होने पर शादी के समय खाता बंद किया जा सकता
              है।
            </p>
            <p>• पूरी राशि (ब्याज सहित) निकाली जा सकती है。</p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-8">
        <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4" /> समय से पहले खाता बंद करना
          (Premature Closure)
        </h4>
        <p className="text-sm text-red-800 mb-2">
          खाता 21 साल के लिए होता है, लेकिन विशेष परिस्थितियों में पहले बंद किया
          जा सकता है:
        </p>
        <ul className="list-disc pl-5 text-sm text-red-800 space-y-1">
          <li>बेटी की मृत्यु होने पर।</li>
          <li>जानलेवा बीमारी या अभिभावक की गंभीर आर्थिक स्थिति में।</li>
        </ul>
      </div>

      {/* AD SLOT 5 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-withdrawal-banner" type="leaderboard" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Percent className="w-6 h-6 text-green-600" />
        टैक्स लाभ: EEE Status (पूरी तरह टैक्स फ्री)
      </h2>
      <p className="text-slate-700 mb-6">
        सुकन्या समृद्धि योजना को <strong>EEE (Exempt-Exempt-Exempt)</strong> का
        दर्जा प्राप्त है, जो इसे निवेश के लिए बेहतरीन बनाता है:
      </p>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Card className="bg-green-50 border-green-200 text-center">
          <CardContent className="p-4">
            <div className="font-bold text-green-800 mb-1">निवेश पर छूट</div>
            <div className="text-xs text-green-700">
              Section 80C के तहत ₹1.5 लाख तक
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200 text-center">
          <CardContent className="p-4">
            <div className="font-bold text-green-800 mb-1">ब्याज पर छूट</div>
            <div className="text-xs text-green-700">
              मिलने वाला पूरा ब्याज टैक्स-फ्री
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200 text-center">
          <CardContent className="p-4">
            <div className="font-bold text-green-800 mb-1">
              मैच्योरिटी पर छूट
            </div>
            <div className="text-xs text-green-700">
              21 साल बाद मिलने वाली रकम टैक्स-फ्री
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 🖼️ IMAGE 3: TAX BENEFITS */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-lime-50 relative aspect-video">
        <Image
          src="/images/guides/ssy/ssy-eee-tax-benefit.webp"
          alt="SSY EEE Tax Benefits Hindi"
          fill
          className="object-contain p-4"
        />
      </div>

      {/* AD SLOT 6 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-tax-rect" type="box" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        सुकन्या समृद्धि योजना बनाम अन्य योजनाएं
      </h2>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                विशेषता
              </TableHead>
              <TableHead className="font-bold text-slate-700">SSY</TableHead>
              <TableHead className="font-bold text-slate-700">PPF</TableHead>
              <TableHead className="font-bold text-slate-700">
                FD (Tax Saver)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">ब्याज</TableCell>
              <TableCell className="font-bold text-pink-700">
                8.2% (सरकारी गारंटी)
              </TableCell>
              <TableCell>7.1%</TableCell>
              <TableCell>6-7%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Lock-in</TableCell>
              <TableCell>21 साल</TableCell>
              <TableCell>15 साल</TableCell>
              <TableCell>5 साल</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">टैक्स</TableCell>
              <TableCell className="font-bold text-green-700">
                EEE (पूरी छूट)
              </TableCell>
              <TableCell>EEE</TableCell>
              <TableCell>ब्याज पर टैक्स</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">उद्देश्य</TableCell>
              <TableCell>बेटी की शादी/शिक्षा</TableCell>
              <TableCell>रिटायरमेंट</TableCell>
              <TableCell>बचत</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        सामान्य प्रश्न (FAQs)
      </h2>
      <div className="mb-12">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border-slate-200"
            >
              <AccordionTrigger className="text-slate-800 font-semibold hover:text-pink-700 text-left">
                Q{index + 1}. {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card className="bg-linear-to-br from-pink-50 to-white border-pink-200 shadow-md mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-pink-900 mb-4">
            निष्कर्ष: क्या सुकन्या समृद्धि योजना सही है?
          </h2>
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">
              अगर आपकी 10 साल से छोटी बेटी है, तो{' '}
              <strong className="text-pink-700 bg-pink-100 px-1 rounded">
                SSY आपकी पहली पसंद होनी चाहिए
              </strong>
              । यह सरकारी गारंटी, सबसे ज्यादा ब्याज (8.2%) और टैक्स-फ्री रिटर्न
              का बेहतरीन संयोजन है।
            </p>
            <p className="text-slate-700 leading-relaxed">
              सिर्फ ₹1,000 प्रति माह जमा करके भी आप अपनी बेटी के लिए लाखों का
              फंड तैयार कर सकते हैं। आज ही नजदीकी पोस्ट ऑफिस या बैंक जाकर खाता
              खुलवाएं।
            </p>
          </div>
        </CardContent>
      </Card>

      {/* AD SLOT 7 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-ssy-bottom" type="leaderboard" />
      </div>

      {/* --- FOOTER --- */}
      <AuthorBio />

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-xl text-center">
        <p className="text-xs text-slate-500 leading-relaxed italic">
          <strong>अस्वीकरण:</strong> इस पृष्ठ पर दी गई जानकारी केवल शैक्षिक
          उद्देश्यों के लिए है और इसे वित्तीय सलाह नहीं माना जाना चाहिए। सुकन्या
          समृद्धि योजना की ब्याज दरें और नियम भारत सरकार द्वारा बदला जा सकता है।
          निवेश करने से पहले कृपया अपने बैंक या पोस्ट ऑफिस से मौजूदा दरों की
          पुष्टि करें।
        </p>
      </div>
    </article>
  );
}

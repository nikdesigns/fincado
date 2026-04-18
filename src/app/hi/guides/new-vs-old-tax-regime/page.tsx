import type { Metadata } from 'next';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Calculator,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingUp,
  FileText,
  Home,
  ShieldCheck,
  CalendarDays,
  Clock,
  Briefcase,
} from 'lucide-react';

export const metadata: Metadata = {
  title:
    'New vs Old Tax Regime: आपके लिए कौन सा टैक्स स्लैब बेहतर है? (हिंदी गाइड)',
  description:
    'जानें कि 2025 में नई और पुरानी टैक्स व्यवस्था में से आपके लिए कौन सी बेहतर है। 80C, HRA छूट, और 7 लाख तक टैक्स-फ्री आय के नियमों को समझें और अपना टैक्स बचाएं।',
  alternates: {
    canonical: 'https://fincado.com/hi/guides/new-vs-old-tax-regime/',
  },
  openGraph: {
    title:
      'New vs Old Tax Regime: आपके लिए कौन सा टैक्स स्लैब बेहतर है? (हिंदी गाइड)',
    description:
      'जानें कि 2025 में नई और पुरानी टैक्स व्यवस्था में से आपके लिए कौन सी बेहतर है। 80C, HRA छूट, और 7 लाख तक टैक्स-फ्री आय के नियमों को समझें और अपना टैक्स बचाएं।',
    url: 'https://fincado.com/hi/guides/new-vs-old-tax-regime/',
    type: 'article',
  },
};

export default function HindiTaxRegimeGuide() {
  const pageTitle =
    'New vs Old Tax Regime: आपके लिए कौन सा टैक्स स्लैब बेहतर है?';

  // --- GENERATED FAQ DATA (To match structure) ---
  const faqData = [
    {
      question: 'क्या मैं हर साल अपना Tax Regime बदल सकता हूँ?',
      answer:
        'अगर आप वेतनभोगी (Salaried) हैं, तो हाँ, आप हर साल अपनी सुविधा अनुसार New या Old Regime चुन सकते हैं। लेकिन अगर आपकी बिज़नेस इनकम है, तो आप केवल एक बार ही स्विच कर सकते हैं।',
    },
    {
      question: 'New Tax Regime में 80C की छूट मिलती है या नहीं?',
      answer:
        'नहीं, New Tax Regime में Section 80C (PPF, LIC, ELSS आदि) की कोई छूट नहीं मिलती। यह छूट केवल पुरानी व्यवस्था (Old Regime) में उपलब्ध है।',
    },
    {
      question: '7 लाख तक की आय पर टैक्स जीरो कैसे होता है?',
      answer:
        'New Tax Regime में अगर आपकी टैक्सेबल आय ₹7 लाख तक है, तो Section 87A के तहत आपको ₹25,000 तक की रिबेट मिलती है, जिससे आपका टैक्स जीरो हो जाता है।',
    },
    {
      question: 'HRA क्लेम करने के लिए कौन सा स्लैब चुनें?',
      answer:
        'HRA (House Rent Allowance) का लाभ केवल पुरानी टैक्स व्यवस्था (Old Regime) में मिलता है। अगर आप किराया देते हैं, तो Old Regime आपके लिए बेहतर हो सकता है।',
    }
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
              'New vs Old Tax Regime 2025: स्लैब रेट्स, 80C कटौती और HRA के नियमों का हिंदी में विश्लेषण।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://fincado.com/hi/guides/new-vs-old-tax-regime/',
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
            datePublished: '2025-12-20',
            dateModified: '2025-12-20',
          }),
        }}
      />
      <FAQSchema faqs={faqData} />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://fincado.com/hi/' },
          { name: 'गाइड्स', url: 'https://fincado.com/hi/guides/' },
          {
            name: 'New vs Old Tax Regime',
            url: 'https://fincado.com/hi/guides/new-vs-old-tax-regime/',
          }
        ]}
      />

      {/* --- HEADER --- */}
      <header className="mb-8 border-b border-slate-200 pb-8">
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200 mb-4 px-3 py-1 text-sm font-semibold uppercase tracking-wide">
          टैक्स प्लानिंग (Tax Planning)
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
          {pageTitle}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-6">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            Last Updated: <strong>Dec 2025</strong>
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />8 Min Read
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5 text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full">
            <Briefcase className="w-4 h-4" />
            For Salaried Employees
          </span>
        </div>

        <ShareTools title="New vs Old Tax Regime Guide (Hindi)" />
      </header>

      {/* 🖼️ HERO IMAGE */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
        <Image
          src="/images/guides/tax/hero-tax-regime.webp"
          alt="New vs Old Tax Regime India Hindi"
          width={1200}
          height={630}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="prose prose-slate max-w-none mb-8">
        <p className="text-lg text-slate-600 leading-relaxed">
          नई और पुरानी टैक्स व्यवस्था को समझे बिना सिर्फ “कम टैक्स” के चक्कर में
          चल देना खतरनाक हो सकता है, खासकर अगर आप 80C, HRA जैसी कटौतियाँ क्लेम
          करते हैं। नीचे पूरा आर्टिकल हिंदी ऑडियंस और वेतनभोगी कर्मचारियों को
          ध्यान में रखकर लिखा गया है।
        </p>
      </div>

      {/* AD SLOT 1 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-tax-guide-top" type="leaderboard" label="Sponsored" />
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="border-blue-200 bg-blue-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-blue-900 flex items-center gap-2">
              <FileText className="w-5 h-5" /> पुरानी व्यवस्था (Old Regime)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-sm leading-relaxed">
              इसमें टैक्स स्लैब की दरें थोड़ी ज़्यादा हैं, लेकिन आपको{' '}
              <strong>80C, 80D, HRA, LTA, Home Loan Interest</strong> जैसी कई
              deductions और exemptions मिलती हैं।
            </p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-emerald-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> नई व्यवस्था (New Regime)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 text-sm leading-relaxed">
              इसमें टैक्स स्लैब की दरें आमतौर पर कम और सरल हैं, लेकिन ज़्यादातर
              deductions हटा दी गई हैं। केवल कुछ limited benefit जैसे standard
              deduction आदि की अनुमति होती है।
            </p>
          </CardContent>
        </Card>
      </div>

      <hr className="my-8 border-slate-200" />

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Calculator className="w-6 h-6 text-indigo-600" />
        नया और पुराना टैक्स स्लैब: Basic Difference
      </h2>
      <p className="text-slate-700 mb-6">
        नीचे एक सरल तुलना दी गई है (income tax slab की exact दरें हर साल budget
        के साथ बदल सकती हैं):
      </p>

      <div className="border border-slate-200 rounded-lg overflow-hidden mb-8 shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-bold text-slate-700">
                पॉइंट (Point)
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                New Tax Regime
              </TableHead>
              <TableHead className="font-bold text-slate-700">
                Old Tax Regime
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">टैक्स स्लैब</TableCell>
              <TableCell>ज्यादा granular, कम rate वाली slabs</TableCell>
              <TableCell>पारंपरिक 5%, 20%, 30% वाली slabs</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">
                Deductions/Exemptions
              </TableCell>
              <TableCell className="text-red-600 font-medium">
                बहुत सीमित, ज़्यादातर हटाई गई
              </TableCell>
              <TableCell className="text-emerald-600 font-medium">
                80C, 80D, HRA, LTA, Home Loan interest आदि उपलब्ध
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Default Status</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className="bg-emerald-50 text-emerald-700 border-emerald-200"
                >
                  Default Option
                </Badge>
              </TableCell>
              <TableCell>
                इसे चुनने के लिए आपको अलग से opt‑in करना पड़ता है
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">किसके लिए बेहतर</TableCell>
              <TableCell>
                जिनके पास ज़्यादा deductions नहीं हैं या simple tax चाहिये
              </TableCell>
              <TableCell>
                जिनके पास home loan, HRA, बड़ी 80C/80D investments हैं
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <h4 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">
          सरल भाषा में:
        </h4>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
            <span className="text-slate-700 text-sm">
              अगर आप ज्यादा निवेश/insurance नहीं करते, किराया नहीं देते या home
              loan नहीं चल रहा, तो{' '}
              <strong className="text-emerald-700">new tax regime</strong>{' '}
              ज़्यादातर cases में फायदेमंद है।
            </span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />
            <span className="text-slate-700 text-sm">
              अगर आपकी 80C + 80D + HRA + home loan interest जैसी deductions
              अच्छी मात्रा में हैं, तो{' '}
              <strong className="text-blue-700">पुरानी व्यवस्था</strong> से
              टैक्स बचत ज्यादा हो सकती है।
            </span>
          </li>
        </ul>
      </div>

      {/* AD SLOT 2 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-tax-guide-slabs-bottom" type="box" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-purple-600" />
        80C और HRA की कटौती किसमें मिलेगी?
      </h2>
      <p className="text-slate-700 mb-6">
        यही सबसे बड़ा practical फर्क है – “new tax regime में 80C मिलेगा?”, “HRA
        exemption किसमें?” जैसे सवाल यहीं से आते हैं।
      </p>

      <h3 className="text-lg font-bold text-slate-900 mb-3">
        80C Deduction (PF, PPF, ELSS, LIC आदि)
      </h3>
      <p className="text-slate-700 mb-4">
        Section 80C के तहत आप सालाना अधिकतम ₹1,50,000 तक की deduction claim कर
        सकते हैं। सामान्य investments/खर्च जो 80C में आते हैं:
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {[
          'EPF (Employee Provident Fund)',
          'PPF (Public Provident Fund)',
          'ELSS (Tax Saving Mutual Funds)',
          'Life Insurance Premium (LIC आदि)',
          'Home Loan का principal repayment',
          'बच्चों की ट्यूशन फीस'
        ].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 p-3 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 shadow-sm"
          >
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>{' '}
            {item}
          </div>
        ))}
      </div>

      <div className="space-y-4 mb-8">
        <Alert className="bg-blue-50 border-blue-200">
          <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5" />

          <AlertTitle className="text-blue-900 font-bold text-sm">
            पुरानी टैक्स व्यवस्था (Old Regime)
          </AlertTitle>
          <AlertDescription className="text-blue-800 text-sm">
            80C पूरी तरह available है, इससे आपकी taxable income कम हो जाती है。
          </AlertDescription>
        </Alert>
        <Alert className="bg-red-50 border-red-200">
          <XCircle className="w-5 h-5 text-red-600 mt-0.5" />

          <AlertTitle className="text-red-900 font-bold text-sm">
            नई टैक्स व्यवस्था (New Regime)
          </AlertTitle>
          <AlertDescription className="text-red-800 text-sm">
            80C जैसी deductions आमतौर पर allow नहीं होतीं। PF, PPF, ELSS लेने से
            टैक्स में अलग से benefit नहीं मिलता।
          </AlertDescription>
        </Alert>
      </div>

      {/* 🖼️ IMAGE 2: DEDUCTIONS */}
      <div className="mb-8 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
        <Image
          src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
          alt="80C and HRA Deductions in Old Tax Regime"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
        <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
          <p className="text-xs text-slate-500 font-medium">
            पुरानी व्यवस्था में 80C और HRA जैसी कटौतियों से टैक्स काफी कम हो
            सकता है।
          </p>
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-3">
        HRA Exemption (House Rent Allowance)
      </h3>
      <p className="text-slate-700 mb-4">
        House Rent Allowance salaried employees के लिए बहुत बड़ा टैक्स benefit
        होता है, खासकर metros में रहने वालों के लिए।
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <h4 className="font-bold text-blue-900 text-sm mb-1">
              Old Tax Regime
            </h4>
            <p className="text-sm text-blue-800">
              HRA exemption fully available, इससे taxable income काफी कम हो सकती
              है。
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 bg-slate-50">
          <CardContent className="p-4">
            <h4 className="font-bold text-slate-800 text-sm mb-1">
              New Tax Regime
            </h4>
            <p className="text-sm text-slate-600">
              HRA exemption normally <strong>नहीं</strong> मिलती। salary में HRA
              दिखने पर भी tax exempt नहीं होगा。
            </p>
          </CardContent>
        </Card>
      </div>

      {/* AD SLOT 3 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-tax-guide-mid-banner" type="leaderboard" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-4">
        7 लाख तक की आय पर टैक्स छूट (Rebate u/s 87A)
      </h2>
      <p className="text-slate-700 mb-6">
        Rebate under Section 87A छोटे और मध्यम आय वाले taxpayers के लिए बहुत
        महत्वपूर्ण प्रावधान है।
      </p>

      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            Old Tax Regime में 87A Rebate
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            पुरानी व्यवस्था में rebate आमतौर पर तब मिलती है जब taxable income
            (सारी deductions के बाद) ₹5 लाख से कम हो। यदि आय सीमा से कम है, तो
            टैक्स liability शून्य हो जाती है।
          </p>
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">
            New Tax Regime में 87A Rebate
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            नई टैक्स व्यवस्था में यह सीमा ₹7 लाख (लगभग) तक बढ़ा दी गई है। यदि
            taxable income इस सीमा से कम है, तो income tax ज़ीरो हो जाता है।
          </p>
        </div>
      </div>

      <Alert className="bg-amber-50 border-amber-200 mb-8">
        <HelpCircle className="w-5 h-5 text-amber-600 mt-0.5" />

        <AlertTitle className="text-amber-900 font-bold text-sm mb-2">
          Practically क्या समझें?
        </AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-4 space-y-1 text-amber-800 text-sm">
            <li>
              Salary ~₹6–7 लाख, deductions कम → <strong>New Regime</strong> +
              87A rebate = Zero Tax
            </li>
            <li>
              Salary ~₹6–7 लाख, deductions ज़्यादा → <strong>Old Regime</strong>{' '}
              में भी 87A rebate से Zero Tax संभव है
            </li>
          </ul>
        </AlertDescription>
      </Alert>

      {/* AD SLOT 4 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-tax-guide-rebate-box" type="box" />
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        आपके लिए कौन सा Regime बेहतर हो सकता है?
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card className="border-emerald-200 shadow-sm">
          <CardHeader className="bg-emerald-50/50 pb-3 border-b border-emerald-100">
            <CardTitle className="text-base font-bold text-emerald-900">
              किसे New Regime चुनना चाहिए?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{' '}
                नई नौकरी, salary मध्यम (5–10 लाख) है।
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{' '}
                Parents के साथ रहते हैं, rent नहीं देते।
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{' '}
                PPF, ELSS, Insurance जैसी investments बहुत कम हैं।
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />{' '}
                Documentation का झंझट नहीं चाहिए।
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-blue-200 shadow-sm">
          <CardHeader className="bg-blue-50/50 pb-3 border-b border-blue-100">
            <CardTitle className="text-base font-bold text-blue-900">
              किसे Old Regime चुनना चाहिए?
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2">
                <Home className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" /> Home
                loan चल रहा है (Interest deduction)।
              </li>
              <li className="flex gap-2">
                <FileText className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{' '}
                Metro में rent पर रहते हैं (High HRA)।
              </li>
              <li className="flex gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{' '}
                हर साल 80C limit (₹1.5 lakh) भर लेते हैं।
              </li>
              <li className="flex gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />{' '}
                Health insurance (80D) का अच्छा deduction है।
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* AD SLOT 5 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-tax-guide-mid-content" type="leaderboard" />
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-slate-600" />
          Final Practical Checklist
        </h2>
        <p className="text-slate-600 text-sm mb-4">
          टैक्स भरने से पहले अपने लिए ये 5 सवाल ज़रूर पूछें:
        </p>
        <ol className="list-decimal pl-5 space-y-3 text-slate-700 text-sm font-medium">
          <li>मेरी सालाना taxable आय कितनी है (सिर्फ CTC नहीं)?</li>
          <li>
            मैं realistically कितनी 80C/80D/अन्य deductions claim कर सकता हूँ?
          </li>
          <li>
            क्या मेरे पास HRA, Home Loan Interest जैसे बड़े टैक्स फायदों वाले
            components हैं?
          </li>
          <li>
            New regime (बिना deductions) vs Old regime (सभी deductions के साथ) –
            दोनों में actual tax कितना बन रहा है?
          </li>
          <li>
            Long‑term wealth creation और investment discipline के लिए कौन‑सा
            option मेरे behaviour के साथ better fit होता है?
          </li>
        </ol>
      </div>

      {/* --- FAQS --- */}
      <h2 className="text-2xl font-bold text-slate-900 mb-6">
        अक्सर पूछे जाने वाले प्रश्न (FAQs)
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

      {/* AD SLOT 6 */}
      <div className="my-8 flex justify-center no-print bg-slate-50 border border-slate-100 rounded-lg p-2">
        <AdSlot id="hi-tax-guide-bottom" type="leaderboard" />
      </div>

      <Card className="bg-linear-to-br from-emerald-50 to-white border-emerald-200 shadow-md mt-12 mb-12">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            निष्कर्ष: समझदारी से चुनें
          </h2>
          <div className="space-y-4">
            <p className="text-slate-700 leading-relaxed">
              यदि आपकी deductions कम हैं और income mid‑range में है, तो अक्सर
              <strong className="text-emerald-700 bg-emerald-100 px-1 rounded ml-1">
                नई टैक्स व्यवस्था (New Regime)
              </strong>
              आपके लिए ज्यादा simple और tax‑efficient हो सकती है।
            </p>
            <p className="text-slate-700 leading-relaxed">
              यदि आपकी deductions heavy हैं (80C + HRA + home loan + 80D), तो
              <strong className="text-blue-700 bg-blue-100 px-1 rounded ml-1">
                पुरानी टैक्स व्यवस्था (Old Regime)
              </strong>
              अभी भी ज़्यादा powerful tax‑saving tool साबित हो सकती है।
            </p>
            <p className="text-slate-600 text-sm italic mt-4 pt-4 border-t border-emerald-100">
              इस तरह आप सिर्फ headline या दूसरों के example देखकर नहीं, बल्कि
              अपने numbers और goals के आधार पर सही टैक्स regime चुन पाएँगे।
            </p>
          </div>
        </CardContent>
      </Card>

      {/* --- FOOTER --- */}
      <AuthorBio />
    </article>
  );
}

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import EMIClient from '@/app/(en)/emi-calculator/EMIClient';
import FinancialNavWidget from '@/components/FinancialNavWidget';
import SidebarCompareWidget from '@/components/SidebarCompareWidget';
import AdSlot from '@/components/AdSlot';
import AuthorBio from '@/components/AuthorBio';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import FAQSchema from '@/components/FAQSchema';
import ShareTools from '@/components/ShareTools';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Car, Info } from 'lucide-react';
import CarVisual from '@/components/CarVisual';
import {
  carModels,
  getCarBySlug,
  CAR_PRICE_LAST_VERIFIED,
  CAR_PRICE_DISCLAIMER,
  TYPICAL_DOWN_PAYMENT_PERCENT,
  TYPICAL_TENURE_YEARS,
  TYPICAL_INTEREST_RATE,
} from '@/lib/carModels';

type Props = {
  params: Promise<{ slug: string }>;
};

const formatINR = (val: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);

const formatLakh = (val: number) => `₹${(val / 100000).toFixed(1)}L`;

function computeEMI(principal: number, annualRate: number, years: number): number {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;
  if (monthlyRate === 0) return principal / months;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);
  return Math.round(emi);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) return {};

  const title = `${car.name} EMI Calculator (2026) - On-Road Price & Loan EMI`;
  const description = `Calculate the EMI for a ${car.name} in India. Approximate on-road price ${formatLakh(car.onRoadPopularVariant)}, with down payment, interest rate and tenure options.`;
  const canonical = `https://fincado.com/emi-calculator/car/${car.slug}/`;

  return {
    title,
    description,
    keywords: [
      `${car.name} emi calculator`,
      `${car.name} loan emi`,
      `${car.name} on road price`,
      `${car.name} down payment`,
      `${car.brand} car loan emi`,
    ],
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
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
}

export default async function CarModelEMIPage({ params }: Props) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const downPayment = Math.round((car.onRoadPopularVariant * TYPICAL_DOWN_PAYMENT_PERCENT) / 100);
  const loanAmount = car.onRoadPopularVariant - downPayment;
  const estimatedEMI = computeEMI(loanAmount, TYPICAL_INTEREST_RATE, TYPICAL_TENURE_YEARS);

  const otherCars = carModels.filter((c) => c.slug !== car.slug).slice(0, 6);

  const faqItems = [
    {
      question: `What is the on-road price of a ${car.name} in India?`,
      answer: `The ${car.name} (${car.bodyType}) has an approximate ex-showroom price range of ${formatLakh(car.exShowroomMin)} to ${formatLakh(car.exShowroomMax)}. The on-road price for a popular mid variant in a metro city is approximately ${formatLakh(car.onRoadPopularVariant)}, including RTO and insurance. ${CAR_PRICE_DISCLAIMER}`,
    },
    {
      question: `What will my monthly EMI be for a ${car.name}?`,
      answer: `With a typical ${TYPICAL_DOWN_PAYMENT_PERCENT}% down payment (${formatINR(downPayment)}) and a loan of ${formatINR(loanAmount)} at ${TYPICAL_INTEREST_RATE}% p.a. over ${TYPICAL_TENURE_YEARS} years, the estimated EMI is approximately ${formatINR(estimatedEMI)} per month. Use the calculator above to adjust for your actual price, down payment, rate and tenure.`,
    },
    {
      question: `How much down payment do I need for a ${car.name} loan?`,
      answer: `Most banks finance 80-90% of the on-road price for new cars, meaning a down payment of 10-20% is typical. A higher down payment lowers your EMI and total interest paid.`,
    },
    {
      question: `What fuel types does the ${car.name} come in?`,
      answer: `The ${car.name} is available in ${car.fuelTypes.join(', ')} variants in India. Fuel type can affect on-road price due to different RTO tax slabs in some states.`,
    },
    {
      question: `What loan tenure should I choose for a ${car.name}?`,
      answer: `New car loans in India typically go up to 7 years. Most buyers choose 3-5 years for a balance between manageable EMI and lower total interest paid.`,
    },
  ];

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://fincado.com/' },
          { name: 'Car Loan EMI Calculator', url: 'https://fincado.com/loans/car-loan/' },
          { name: `${car.name} EMI Calculator`, url: `https://fincado.com/emi-calculator/car/${car.slug}/` },
        ]}
      />

      <CalculatorSchema
        name={`${car.name} EMI Calculator`}
        description={`Calculate car loan EMI for the ${car.name} based on on-road price, down payment, interest rate and tenure.`}
        url={`https://fincado.com/emi-calculator/car/${car.slug}/`}
      />

      <FAQSchema faqs={faqItems} />

      <main className="container" style={{ padding: '40px 20px' }}>
        <header style={{ marginBottom: 32 }} className="no-print">
          <div className="no-print mb-6 flex items-center justify-between gap-4">
            <ShareTools title={`${car.name} EMI Calculator`} />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-brand-50 to-green-100 text-brand-700">
              <Car className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-slate-900">
                {car.name} EMI Calculator
              </h1>
              <p className="text-base sm:text-lg font-medium text-brand-700">
                {car.brand} • {car.bodyType} • On-Road Price & Loan EMI
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse items-start gap-6 sm:flex-row sm:items-center">
            <div className="max-w-3xl text-slate-600 text-base leading-relaxed">
              <WikiText
                content={`
                  <p>
                    Calculate the monthly EMI for a <strong>${car.name}</strong> based on its approximate on-road
                    price of <strong>${formatLakh(car.onRoadPopularVariant)}</strong>. Adjust the down payment,
                    interest rate, and tenure below to match your actual loan offer.
                  </p>
                `}
              />
            </div>
            <CarVisual car={car} className="shrink-0" />
          </div>

          <div className="no-print my-6">
            <AdSlot id={`car-emi-${car.slug}-top`} type="leaderboard" />
          </div>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            <section className="no-print mb-8">
              <div className="grid gap-4 md:grid-cols-3">
                <Card className="border-brand-200 bg-linear-to-br from-brand-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">ON-ROAD PRICE</div>
                    <div className="text-sm text-slate-600 mb-2">Popular mid variant, metro city</div>
                    <div className="text-3xl font-semibold text-slate-900">{formatLakh(car.onRoadPopularVariant)}</div>
                  </CardContent>
                </Card>

                <Card className="border-brand-200 bg-linear-to-br from-brand-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">TYPICAL DOWN PAYMENT</div>
                    <div className="text-sm text-slate-600 mb-2">{TYPICAL_DOWN_PAYMENT_PERCENT}% of on-road price</div>
                    <div className="text-3xl font-semibold text-slate-900">{formatINR(downPayment)}</div>
                  </CardContent>
                </Card>

                <Card className="border-brand-200 bg-linear-to-br from-brand-50 to-white">
                  <CardContent className="p-4">
                    <div className="text-xs font-semibold text-brand-700 mb-1">ESTIMATED EMI</div>
                    <div className="text-sm text-slate-600 mb-2">{TYPICAL_INTEREST_RATE}% p.a. for {TYPICAL_TENURE_YEARS} years</div>
                    <div className="text-3xl font-semibold text-slate-900">
                      {formatINR(estimatedEMI)}
                      <span className="text-base font-normal text-slate-600">/mo</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <EMIClient
              defaultPrincipal={loanAmount}
              defaultRate={TYPICAL_INTEREST_RATE}
              defaultTenure={TYPICAL_TENURE_YEARS}
            />

            <div className="no-print my-8">
              <AdSlot id={`car-emi-${car.slug}-after-calc`} type="square" lazyLoad />
            </div>

            <Alert className="mt-6 bg-brand-50/50 border-brand-200 text-slate-600">
              <Info className="h-4 w-4 text-brand-500 mt-0.5" />
              <AlertDescription className="ml-2 text-sm leading-relaxed">
                <strong className="text-slate-900 font-semibold block mb-0.5">Price Note</strong>
                {CAR_PRICE_DISCLAIMER} Facts last checked: {CAR_PRICE_LAST_VERIFIED}.
              </AlertDescription>
            </Alert>

            <section className="no-print mt-8">
              <Card className="border-slate-200 bg-white">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-slate-900">
                    {car.name} Price & Loan Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="p-3 font-medium">Body Type</td>
                          <td className="p-3">{car.bodyType}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Fuel Types</td>
                          <td className="p-3">{car.fuelTypes.join(', ')}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Ex-Showroom Price Range</td>
                          <td className="p-3">{formatLakh(car.exShowroomMin)} - {formatLakh(car.exShowroomMax)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">On-Road Price (Mid Variant)</td>
                          <td className="p-3 text-brand-600 font-semibold">{formatLakh(car.onRoadPopularVariant)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Typical Down Payment ({TYPICAL_DOWN_PAYMENT_PERCENT}%)</td>
                          <td className="p-3">{formatINR(downPayment)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Typical Loan Amount</td>
                          <td className="p-3">{formatINR(loanAmount)}</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium">Estimated EMI ({TYPICAL_TENURE_YEARS} yrs @ {TYPICAL_INTEREST_RATE}%)</td>
                          <td className="p-3 text-brand-600 font-semibold">{formatINR(estimatedEMI)}/month</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            <div className="no-print my-8 flex justify-center">
              <AdSlot id={`car-emi-${car.slug}-mid`} type="square" lazyLoad />
            </div>

            <section className="no-print mt-12">
              <Card className="border-slate-200 bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible defaultValue="item-0" className="space-y-2">
                    {faqItems.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left text-slate-900">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-slate-600 leading-relaxed">{faq.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </section>

            <section className="no-print mt-10">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Compare EMI for Other Popular Models</h2>
              <div className="flex flex-wrap gap-2">
                {otherCars.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/emi-calculator/car/${c.slug}/`}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
                  >
                    {c.name} EMI
                  </Link>
                ))}
              </div>
              <p className="mt-4 text-sm">
                <Link href="/loans/car-loan/" className="text-brand-600 hover:underline">
                  Or use the general Car Loan EMI Calculator for any car and bank rate →
                </Link>
              </p>
            </section>

            <div className="no-print my-8 flex justify-center">
              <AdSlot id={`car-emi-${car.slug}-bottom`} type="square" lazyLoad />
            </div>

            <AuthorBio />
          </div>

          <aside className="sidebar no-print">
            <div className="sticky top-24 space-y-6">
              <AdSlot id={`car-emi-${car.slug}-sidebar-top`} type="skyscraper" />
              <SidebarCompareWidget />
              <AdSlot id={`car-emi-${car.slug}-sidebar-bottom`} type="box" lazyLoad />
              <FinancialNavWidget />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export async function generateStaticParams() {
  return carModels.map((car) => ({ slug: car.slug }));
}

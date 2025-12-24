// src/app/hi/epf-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import EPFClient from '@/app/epf-calculator/EPFClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'EPF कैलकुलेटर – भविष्य निधि और ब्याज की गणना करें (EPF Calculator)',
  description:
    'Fincado EPF कैलकुलेटर (Hindi): जानें रिटायरमेंट पर आपको कितना PF मिलेगा। ब्याज दर, नियोक्ता योगदान और टैक्स नियमों की सटीक जानकारी।',
  keywords: [
    'EPF Calculator Hindi',
    'PF Calculator India Hindi',
    'EPF Interest Calculator Hindi',
    'Pension Calculator Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/epf-calculator/',
    languages: {
      'en-IN': 'https://www.fincado.com/epf-calculator/',
    },
  },
  openGraph: {
    title: 'EPF कैलकुलेटर – आपकी रिटायरमेंट पूंजी का हिसाब',
    description:
      'जानें कि आपकी सैलरी से कटने वाला PF रिटायरमेंट तक कितना बड़ा फंड बन जाएगा।',
    url: 'https://www.fincado.com/hi/epf-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiEPFPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    basicSalary: 'मासिक बेसिक सैलरी + DA (₹)',
    yourContribution: 'आपका योगदान (%)',
    employerContribution: 'नियोक्ता योगदान (%)',
    employmentPeriod: 'नौकरी की अवधि (वर्ष)',
    annualIncrease: 'सालाना ब्याज दर (% p.a)',
    currentInterestRate: 'वर्तमान ब्याज दर',
    resetDefaults: 'रीसेट करें',
    estimatedCorpus: 'अनुमानित EPF राशि',
    yourShare: 'आपका हिस्सा',
    employerShare: 'नियोक्ता का हिस्सा',
    totalInterest: 'कुल ब्याज कमाया',
    yearlyGrowth: 'सालाना EPF वृद्धि',
    balanceAccumulation: 'कुल जमा राशि',
    exportCSV: 'डाउनलोड (CSV)',
    year: 'वर्ष',
    youContrib: 'आपका जमा',
    employerContrib: 'कंपनी जमा',
    interest: 'ब्याज',
    balance: 'शेष राशि',
  };

  return (
    <>
      <CalculatorSchema
        name="EPF Calculator Hindi"
        description="Calculate EPF corpus and interest in Hindi."
        url="https://www.fincado.com/hi/epf-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'EPF कैलकुलेटर',
            url: 'https://www.fincado.com/hi/epf-calculator/',
          },
        ]}
      />

      {/* FAQ Schema (Hindi) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'EPF ब्याज की गणना कैसे होती है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'EPF ब्याज दर सरकार द्वारा हर साल तय की जाती है (वर्तमान में लगभग 8.25%)। ब्याज की गणना मासिक शेष राशि पर होती है लेकिन जमा सालाना होता है।',
                },
              },
              {
                '@type': 'Question',
                name: 'नियोक्ता (Employer) का कितना योगदान होता है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'नियोक्ता बेसिक सैलरी + DA का 12% योगदान देता है। इसमें से 3.67% EPF में और बाकी 8.33% कर्मचारी पेंशन योजना (EPS) में जाता है।',
                },
              },
            ],
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        {/* Header */}
        <header style={{ marginBottom: 40 }} className="no-print">
          <div style={{ marginBottom: 16 }}>
            <Link
              href="/epf-calculator/"
              style={{
                fontSize: '14px',
                color: '#64748b',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: '#f1f5f9',
                padding: '6px 12px',
                borderRadius: '99px',
              }}
            >
              <span>🇬🇧</span> Switch to English
            </Link>
          </div>

          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 36px)',
              color: '#0f172a',
              marginBottom: 16,
              lineHeight: 1.2,
            }}
          >
            EPF कैलकुलेटर (PF Calculator)
          </h1>
          <ShareTools title="EPF कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            आपका भविष्य निधि (PF) रिटायरमेंट के लिए सबसे बड़ी संपत्ति है। जानें
            कि आपकी सैलरी से कटने वाला पैसा और ब्याज मिलकर भविष्य में कितना बड़ा
            फंड बनेगा।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <EPFClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-epf-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>कर्मचारी भविष्य निधि (EPF) क्या है?</h2>
              <p>
                EPF (Employees&apos; Provident Fund) वेतनभोगी कर्मचारियों के लिए
                एक अनिवार्य रिटायरमेंट बचत योजना है। इसमें कर्मचारी और नियोक्ता
                दोनों हर महीने योगदान करते हैं, जो एक बड़ा फंड तैयार करता है।
              </p>
              <p>
                यह भारत सरकार द्वारा समर्थित है, इसलिए यह सबसे सुरक्षित निवेश
                विकल्पों में से एक है। इसमें मिलने वाला रिटर्न और परिपक्वता राशि
                (Maturity Amount) पूरी तरह टैक्स-फ्री होती है (EEE Status)।
              </p>

              <h3>योगदान का बंटवारा (Contribution Split)</h3>
              <p>
                आप और आपकी कंपनी दोनों (Basic Salary + DA) का{' '}
                <strong>12%</strong> योगदान करते हैं। लेकिन इसका बंटवारा अलग
                होता है:
              </p>
              <ul>
                <li>
                  <strong>कर्मचारी का हिस्सा:</strong> आपका पूरा 12% EPF खाते
                  में जाता है।
                </li>
                <li>
                  <strong>नियोक्ता का हिस्सा:</strong> उनके 12% में से केवल{' '}
                  <strong>3.67%</strong> EPF में जाता है। बाकी{' '}
                  <strong>8.33%</strong> कर्मचारी पेंशन योजना (EPS) में जमा होता
                  है।
                </li>
              </ul>

              <h3>EPF पर टैक्स नियम (Tax Rules)</h3>
              <p>
                बजट 2021 के नए नियम के अनुसार, यदि एक वित्तीय वर्ष में आपका कुल
                योगदान (Employee Share + VPF) <strong>₹2.5 लाख</strong> से अधिक
                है, तो अतिरिक्त राशि पर मिलने वाला ब्याज{' '}
                <strong>कर योग्य (Taxable)</strong> होगा। ₹2.5 लाख तक की सीमा
                पूरी तरह टैक्स-फ्री रहती है।
              </p>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/ppf-calculator/">PPF कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/retirement-calculator/">
                    रिटायरमेंट कैलकुलेटर
                  </Link>
                </li>
                <li>
                  <Link href="/hi/sip-calculator/">SIP कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>क्या मैं अपना PF कभी भी निकाल सकता हूँ?</summary>
                <p>
                  आप पूरी राशि केवल रिटायरमेंट (58 वर्ष) पर निकाल सकते हैं या
                  यदि आप 2 महीने तक बेरोजगार रहते हैं। शादी, शिक्षा या घर खरीदने
                  के लिए &apos;आंशिक निकासी&apos; (Partial Withdrawal) की अनुमति
                  है।
                </p>
              </details>
              <details>
                <summary>अपना PF बैलेंस कैसे चेक करें?</summary>
                <p>
                  आप EPFO पोर्टल, UMANG ऐप या अपने रजिस्टर्ड मोबाइल नंबर से
                  <strong>9966044425</strong> पर मिस्ड कॉल देकर अपना बैलेंस चेक
                  कर सकते हैं।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-epf-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

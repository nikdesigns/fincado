// src/app/hi/apy-calculator/page.tsx
import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import APYClient from '@/app/apy-calculator/APYClient';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import CalculatorSchema from '@/components/CalculatorSchema';
import ShareTools from '@/components/ShareTools';

/* ---------------- SEO METADATA ---------------- */

export const metadata: Metadata = {
  title: 'अटल पेंशन योजना (APY) कैलकुलेटर – चार्ट और लाभ जानें',
  description:
    'Fincado APY कैलकुलेटर (Hindi): अपनी उम्र के अनुसार मासिक निवेश जानें और ₹5000 की गारंटीड पेंशन पाएं। चार्ट, पात्रता और नॉमिनी लाभ देखें।',
  keywords: [
    'APY Calculator Hindi',
    'Atal Pension Yojana Chart Hindi',
    'APY Contribution Hindi',
    'Pension Scheme Hindi',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/apy-calculator/',
    languages: {
      'en-IN': 'https://www.fincado.com/apy-calculator/',
    },
  },
  openGraph: {
    title: 'अटल पेंशन योजना (APY) कैलकुलेटर – बुढ़ापे का सहारा',
    description:
      'जानें कि आपको ₹1000 से ₹5000 की पेंशन के लिए हर महीने कितना जमा करना होगा।',
    url: 'https://www.fincado.com/hi/apy-calculator/',
    type: 'website',
    locale: 'hi_IN',
  },
};

/* ---------------- PAGE ---------------- */

export default function HindiAPYPage() {
  // ✅ Hindi Labels for the Calculator
  const hindiLabels = {
    joiningAge: 'शामिल होने की आयु (Joining Age)',
    desiredPension: 'वांछित मासिक पेंशन (₹)',
    contributionFreq: 'भुगतान आवृत्ति (Frequency)',
    contributionYears: 'योगदान के वर्ष:',
    pensionStartsAt: 'पेंशन शुरू होगी:',
    resetDefaults: 'रीसेट करें',
    youNeedToPay: 'आपको जमा करना होगा',
    totalInvestment: 'कुल निवेश',
    corpusToNominee: 'नॉमिनी को मिलेगा (Corpus)',
    guaranteedPension: 'गारंटीड मासिक पेंशन',
    forSpouse: '(आपके और आपके जीवनसाथी के लिए)',
    per: '/',
    monthly: 'महीना',
    quarterly: 'तिमाही',
    halfYearly: 'छमाही',
    years: 'वर्ष',
  };

  return (
    <>
      <CalculatorSchema
        name="Atal Pension Yojana Calculator Hindi"
        description="Calculate Atal Pension Yojana contribution in Hindi."
        url="https://www.fincado.com/hi/apy-calculator/"
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी (Hindi)', url: 'https://www.fincado.com/hi/' },
          {
            name: 'APY कैलकुलेटर',
            url: 'https://www.fincado.com/hi/apy-calculator/',
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
                name: 'APY में कौन शामिल हो सकता है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: '18 से 40 वर्ष की आयु का कोई भी भारतीय नागरिक। 1 अक्टूबर 2022 से, करदाता (Taxpayers) इस योजना के पात्र नहीं हैं।',
                },
              },
              {
                '@type': 'Question',
                name: 'मृत्यु के बाद पैसे का क्या होता है?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'सब्सक्राइबर की मृत्यु के बाद, पेंशन जीवनसाथी को मिलती रहती है। दोनों की मृत्यु के बाद, जमा कॉर्पस (₹8.5 लाख तक) नॉमिनी को लौटा दिया जाता है।',
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
              href="/apy-calculator/"
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
            अटल पेंशन योजना (APY) कैलकुलेटर
          </h1>
          <ShareTools title="अटल पेंशन योजना (APY) कैलकुलेटर (Hindi)" />

          <p
            style={{
              maxWidth: '700px',
              color: '#475569',
              fontSize: '18px',
              marginTop: 16,
              lineHeight: 1.6,
            }}
          >
            अपने बुढ़ापे को सुरक्षित करें। भारत सरकार की गारंटीड पेंशन योजना के
            लिए अपनी मासिक किस्त (Contribution) की गणना करें।
          </p>
        </header>

        <div className="layout-grid">
          <div className="main-content">
            {/* The Calculator with Hindi Props */}
            <APYClient labels={hindiLabels} />

            <div className="no-print" style={{ margin: '40px 0' }}>
              <AdSlot id="hindi-apy-mid" type="leaderboard" />
            </div>

            {/* -------- SEO CONTENT (HINDI) -------- */}
            <article className="article content-for-seo no-print">
              <h2>अटल पेंशन योजना (APY) क्या है?</h2>
              <p>
                अटल पेंशन योजना भारत सरकार द्वारा शुरू की गई एक सामाजिक सुरक्षा
                योजना है। इसका उद्देश्य असंगठित क्षेत्र के श्रमिकों को 60 वर्ष
                की आयु के बाद एक निश्चित आय प्रदान करना है।
              </p>
              <p>
                इसमें आपको ₹1,000 से लेकर ₹5,000 तक की{' '}
                <strong>गारंटीड मासिक पेंशन</strong> मिलती है। पेंशन की राशि
                आपके द्वारा किए गए योगदान और शामिल होने की उम्र पर निर्भर करती
                है।
              </p>

              <h3>पात्रता (Eligibility)</h3>
              <ul>
                <li>
                  <strong>आयु:</strong> 18 से 40 वर्ष के बीच होनी चाहिए।
                </li>
                <li>
                  <strong>नागरिकता:</strong> भारतीय नागरिक होना अनिवार्य है।
                </li>
                <li>
                  <strong>बैंक खाता:</strong> एक वैध बचत बैंक खाता होना चाहिए।
                </li>
                <li>
                  <strong>टैक्स:</strong> 1 अक्टूबर 2022 से, कोई भी इनकम टैक्स
                  देने वाला व्यक्ति इस योजना में शामिल नहीं हो सकता।
                </li>
              </ul>

              <h3>APY बनाम NPS: कौन बेहतर है?</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>सुविधा</th>
                      <th>अटल पेंशन योजना (APY)</th>
                      <th>NPS (National Pension System)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>पेंशन राशि</strong>
                      </td>
                      <td>फिक्स्ड (अधिकतम ₹5,000)</td>
                      <td>मार्केट लिंक्ड (कोई सीमा नहीं)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>रिटर्न</strong>
                      </td>
                      <td>गारंटीड (~8%)</td>
                      <td>मार्केट पर निर्भर (9% - 12%)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>कौन जुड़ सकता है</strong>
                      </td>
                      <td>गैर-करदाता (Non-Tax Payers)</td>
                      <td>कोई भी नागरिक</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>पेंशन स्लैब और नॉमिनी लाभ</h3>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>मासिक पेंशन</th>
                      <th>नॉमिनी को मिलने वाली राशि</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>₹1,000</td>
                      <td>₹1.7 लाख</td>
                    </tr>
                    <tr>
                      <td>₹2,000</td>
                      <td>₹3.4 लाख</td>
                    </tr>
                    <tr>
                      <td>₹3,000</td>
                      <td>₹5.1 लाख</td>
                    </tr>
                    <tr>
                      <td>₹4,000</td>
                      <td>₹6.8 लाख</td>
                    </tr>
                    <tr>
                      <td>₹5,000</td>
                      <td>₹8.5 लाख</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>संबंधित कैलकुलेटर</h3>
              <ul>
                <li>
                  <Link href="/hi/retirement-calculator/">
                    रिटायरमेंट कैलकुलेटर
                  </Link>
                </li>
                <li>
                  <Link href="/hi/epf-calculator/">EPF कैलकुलेटर</Link>
                </li>
                <li>
                  <Link href="/hi/ppf-calculator/">PPF कैलकुलेटर</Link>
                </li>
              </ul>
            </article>

            {/* FAQ Section */}
            <section className="article no-print" style={{ marginTop: 40 }}>
              <h2>अक्सर पूछे जाने वाले प्रश्न (FAQs)</h2>
              <details open>
                <summary>अगर मैं भुगतान करना बंद कर दूं तो क्या होगा?</summary>
                <p>
                  खाता अंततः बंद कर दिया जाएगा, और जमा राशि (योगदान + ब्याज)
                  आपको वापस कर दी जाएगी। हालाँकि, कुछ रखरखाव शुल्क और जुर्माना
                  काटा जा सकता है।
                </p>
              </details>
              <details>
                <summary>
                  क्या मैं बाद में अपनी पेंशन राशि बढ़ा सकता हूँ?
                </summary>
                <p>
                  हाँ, आप वित्तीय वर्ष में एक बार अपनी पेंशन राशि को अपग्रेड
                  (जैसे ₹1,000 से ₹5,000) कर सकते हैं। इसके लिए आपको अंतर राशि
                  का भुगतान करना होगा।
                </p>
              </details>
            </section>
          </div>

          <aside className="sidebar no-print">
            <HindiSidebar />
            <div style={{ marginTop: 24, position: 'sticky', top: '20px' }}>
              <AdSlot id="hindi-apy-sidebar" type="box" />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

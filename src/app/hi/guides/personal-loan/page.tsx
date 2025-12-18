import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import HindiSidebar from '@/components/HindiSidebar';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

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
    canonical: 'https://www.fincado.com/hi/guides/personal-loan',
  },
  openGraph: {
    title: 'पर्सनल लोन हिंदी गाइड: लेने से पहले सब कुछ जान लें',
    description:
      'गलत जानकारी के साथ लिया गया पर्सनल लोन बोझ बन सकता है। यहाँ पढ़ें पूरी जानकारी।',
    url: 'https://www.fincado.com/hi/guides/personal-loan',
    type: 'article',
    images: [
      {
        url: 'https://www.fincado.com/images/og/personal-loan-guide.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiPersonalLoanGuide() {
  return (
    <div className="guide-body">
      {/* --- ARTICLE SCHEMA --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'hi',
            headline: 'पर्सनल लोन हिंदी गाइड: लेने से पहले सब कुछ जान लें',
            description:
              'पर्सनल लोन की ब्याज दरें, EMI और जरूरी नियम हिंदी में।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/hi/guides/personal-loan',
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
                url: 'https://www.fincado.com/logo.png',
              },
            },
            datePublished: '2025-12-19',
            dateModified: '2025-12-19',
          }),
        }}
      />

      <main className="container" style={{ padding: '40px 20px' }}>
        <BreadcrumbJsonLd
          items={[
            { name: 'होम', url: 'https://www.fincado.com' },
            { name: 'हिंदी गाइड्स', url: 'https://www.fincado.com/hi' },
            {
              name: 'Personal Loan',
              url: 'https://www.fincado.com/hi/guides/personal-loan',
            },
          ]}
        />

        <div className="layout-grid">
          {/* --- MAIN CONTENT --- */}
          <div className="main-content">
            <header
              style={{
                marginBottom: 32,
                borderBottom: '1px solid #e2e8f0',
                paddingBottom: 24,
              }}
            >
              <span
                className="badge-flagship"
                style={{ background: '#dbeafe', color: '#1e40af' }}
              >
                Finance Basics
              </span>
              <h1
                style={{
                  fontSize: 'clamp(28px, 4vw, 40px)',
                  marginTop: 16,
                  lineHeight: 1.3,
                  color: 'var(--color-text-main)',
                }}
              >
                पर्सनल लोन हिंदी गाइड: लेने से पहले सब कुछ जान लें
              </h1>

              <div
                style={{
                  fontSize: 14,
                  color: 'var(--color-text-muted)',
                  marginTop: 12,
                  display: 'flex',
                  gap: 12,
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                <span>
                  Last Updated: <strong>Dec 2025</strong>
                </span>
                <span>•</span>
                <span>8 Min Read</span>
                <span>•</span>
                <span style={{ color: 'var(--color-brand-green)' }}>
                  Verified by Experts
                </span>
              </div>

              <ShareTools title="Personal Loan Guide (Hindi)" />
            </header>

            <article className="article content-for-seo">
              <WikiText
                content={`
                <p>
                  आज के समय में <strong>पर्सनल लोन (Personal Loan)</strong> सबसे आसान और तेज़ तरीकों में से एक माना जाता है जब अचानक पैसों की ज़रूरत पड़ जाए। लेकिन गलत जानकारी के साथ लिया गया लोन आपके लिए मदद से ज़्यादा बोझ बन सकता है। इस गाइड में पर्सनल लोन को आसान हिंदी में, स्टेप‑बाय‑स्टेप समझाया गया है।
                </p>
              `}
              />

              {/* [AD SLOT 1] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-1" type="leaderboard" label="Sponsored" />
              </div>

              <hr
                style={{
                  margin: '32px 0',
                  border: 0,
                  borderTop: '1px solid #eee',
                }}
              />

              {/* --- SECTION 1 --- */}
              <h2 id="what-is-personal-loan">1. Personal Loan क्या होता है?</h2>
              <p>
                पर्सनल लोन एक <strong>बिना collateral</strong> (बिना गारंटी /
                security) वाला लोन होता है। इसका मतलब:
              </p>
              <ul>
                <li>
                  आपको घर, ज़मीन, गोल्ड या कोई और संपत्ति गिरवी नहीं रखनी पड़ती।
                </li>
                <li>
                  बैंक या NBFC आपकी{' '}
                  <strong>Repayment क्षमता और Credit Profile</strong> देखकर लोन
                  approve करते हैं।
                </li>
              </ul>

              <h3>मुख्य खासियतें</h3>
              <ul>
                <li>
                  <strong>किसी भी personal जरूरत के लिए:</strong> शादी, मेडिकल,
                  ट्रैवल, घर का सामान, या पुराने कर्ज चुकाने के लिए।
                </li>
                <li>
                  <strong>Bank + NBFC दोनों देते हैं:</strong> सरकारी बैंक,
                  प्राइवेट बैंक और Bajaj/Tata Capital जैसी कंपनियां।
                </li>
              </ul>
              <div className="callout-box info-box">
                ध्यान रहे: आसान approval का मतलब यह नहीं कि हर offer आपके लिए
                सही भी हो – शर्तें (Terms & Conditions) ज़रूर पढ़ें।
              </div>

              {/* [AD SLOT 2] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-2" type="leaderboard" />
              </div>

              {/* --- SECTION 2 --- */}
              <h2 id="use-cases">
                2. Personal Loan किन कामों के लिए लिया जाता है?
              </h2>
              <ul className="checklist">
                <li>
                  <strong>Medical Emergency:</strong> अचानक अस्पताल का खर्च जब
                  इंश्योरेंस कम पड़ जाए।
                </li>
                <li>
                  <strong>शादी (Marriage):</strong> भारतीय शादियों का बजट अक्सर
                  बढ़ जाता है।
                </li>
                <li>
                  <strong>Travel / Vacation:</strong> विदेश यात्रा या हनीमून के
                  लिए।
                </li>
                <li>
                  <strong>Credit Card Repayment:</strong> क्रेडिट कार्ड का 40%
                  ब्याज चुकाने के लिए कम ब्याज वाला लोन।
                </li>
              </ul>

              <hr
                style={{
                  margin: '32px 0',
                  border: 0,
                  borderTop: '1px solid #eee',
                }}
              />

              {/* --- SECTION 3 & 4: Pros & Cons --- */}
              <div
                style={{
                  display: 'grid',
                  gap: 24,
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                }}
              >
                <div
                  className="advantage-card"
                  style={{ borderColor: '#bbf7d0', background: '#f0fdf4' }}
                >
                  <h3 style={{ marginTop: 0, color: '#166534' }}>
                    ✅ फायदे (Pros)
                  </h3>
                  <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                    <li>जल्दी Approval (24-48 घंटे)</li>
                    <li>कोई Security/Collateral नहीं चाहिए</li>
                    <li>Fixed EMI से बजट बनाना आसान</li>
                    <li>पैसे का इस्तेमाल कहीं भी कर सकते हैं</li>
                  </ul>
                </div>
                <div
                  className="advantage-card"
                  style={{ borderColor: '#fecaca', background: '#fef2f2' }}
                >
                  <h3 style={{ marginTop: 0, color: '#991b1b' }}>
                    ❌ नुकसान (Cons)
                  </h3>
                  <ul style={{ marginBottom: 0, paddingLeft: 20 }}>
                    <li>ब्याज दर (Interest Rate) काफी ज़्यादा (11-24%)</li>
                    <li>लेट फीस और पेनल्टी बहुत भारी होती है</li>
                    <li>गलत Tenure चुनने पर ब्याज का बोझ</li>
                    <li>Prepayment पर पेनल्टी लग सकती है</li>
                  </ul>
                </div>
              </div>

              {/* [AD SLOT 3] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-3" type="leaderboard" />
              </div>

              {/* --- SECTION 5: INTEREST RATE --- */}
              <h2 id="interest-factors">5. Interest Rate कैसे तय होता है?</h2>
              <p>
                बैंक ये 5 चीजें देखकर तय करता है कि आपको लोन सस्ता मिलेगा या
                महंगा:
              </p>

              {/* ✅ ADDED IMAGE HERE - Ensure file exists at this path */}
              <div className="guide-image-wrap">
                <Image
                  src="/images/guides/personal-loan/personal-loan-interest-factors.webp"
                  alt="Factors affecting Personal Loan Interest Rates"
                  width={1200}
                  height={600}
                  className="guide-image"
                />
                <p className="image-caption">
                  Infographic: पर्सनल लोन की ब्याज दर तय करने वाले कारक
                </p>
              </div>

              <ol>
                <li>
                  <strong>Credit Score (CIBIL):</strong> 750+ स्कोर है तो ब्याज
                  कम मिलेगा। 650 से कम है तो लोन रिजेक्ट हो सकता है।
                </li>
                <li>
                  <strong>Income (आय):</strong> जितनी ज्यादा सैलरी, उतना कम
                  रिस्क, उतना बेहतर रेट।
                </li>
                <li>
                  <strong>Job Type:</strong> सरकारी या MNC नौकरी वालों को बैंक
                  पसंद करते हैं।
                </li>
                <li>
                  <strong>Relationship:</strong> जिस बैंक में आपका सैलरी अकाउंट
                  है, वहां प्री-अप्रूव्ड ऑफर मिल सकता है।
                </li>
                <li>
                  <strong>Existing Debt:</strong> अगर पहले से बहुत लोन चल रहे
                  हैं, तो नया लोन महंगा मिलेगा।
                </li>
              </ol>

              {/* --- SECTION 6: EMI CALCULATION --- */}
              <h2 id="emi-calculation">6. EMI कैसे calculate होती है?</h2>
              <p>
                EMI तीन चीजों पर निर्भर करती है:{' '}
                <strong>Loan Amount, Interest Rate, Tenure</strong>.
              </p>

              <div className="callout-box update-box">
                <strong>Basic Logic:</strong>
                <br />
                <ul>
                  <li>
                    छोटा Tenure → EMI ज़्यादा → Total Interest कम (सस्ता लोन)
                  </li>
                  <li>
                    लंबा Tenure → EMI कम → Total Interest ज़्यादा (महंगा लोन)
                  </li>
                </ul>
              </div>

              <div className="example-box">
                <strong>उदाहरण (₹3 लाख का लोन @ 14%):</strong>
                <br />
                2 साल के लिए EMI भारी होगी, लेकिन ब्याज कम लगेगा।
                <br />5 साल के लिए EMI हल्की होगी, लेकिन ब्याज बहुत ज्यादा
                चुकाना पड़ेगा।
              </div>

              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <Link
                  href="/hi/emi-calculator"
                  className="btn-primary"
                  style={{
                    display: 'inline-block',
                    padding: '12px 24px',
                    background: 'var(--color-brand-green)',
                    color: '#fff',
                    borderRadius: 8,
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  👉 अपनी EMI यहाँ कैलकुलेट करें
                </Link>
              </div>

              {/* [AD SLOT 4] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-4" type="leaderboard" />
              </div>

              {/* --- SECTION 7: CHECKLIST --- */}
              <h2 id="checklist">7. लोन लेने से पहले ये 7 बातें ज़रूर देखें</h2>
              <ul className="checklist">
                <li>
                  <strong>Processing Fee:</strong> क्या बैंक 1-3% फीस काट रहा
                  है?
                </li>
                <li>
                  <strong>Prepayment Charges:</strong> लोन जल्दी बंद करने पर
                  पेनाल्टी कितनी है?
                </li>
                <li>
                  <strong>Part Prepayment:</strong> क्या बीच में थोड़े पैसे जमा
                  कर सकते हैं?
                </li>
                <li>
                  <strong>Hidden Charges:</strong> लेट फीस, इंश्योरेंस चार्ज,
                  आदि।
                </li>
                <li>
                  <strong>Fixed vs Floating:</strong> पर्सनल लोन फिक्स्ड रेट पर
                  ही लें।
                </li>
                <li>
                  <strong>EMI Affordability:</strong> आपकी इनकम का 40% से ज्यादा
                  EMI में नहीं जाना चाहिए।
                </li>
                <li>
                  <strong>Compare Offers:</strong> कम से कम 3 बैंकों से तुलना
                  करें।
                </li>
              </ul>

              {/* --- SECTION 8: PL vs CC --- */}
              <h2 id="comparison">8. Personal Loan vs Credit Card (Table)</h2>
              <div className="table-responsive">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>पॉइंट</th>
                      <th>Personal Loan</th>
                      <th>Credit Card Loan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>ब्याज दर</strong>
                      </td>
                      <td style={{ color: 'var(--color-brand-green)' }}>
                        11–24% सालाना
                      </td>
                      <td style={{ color: '#dc2626' }}>30–45% सालाना</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>EMI Type</strong>
                      </td>
                      <td>Fixed EMI, Fixed Tenure</td>
                      <td>Revolving (Minimum Due Trap)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Best For</strong>
                      </td>
                      <td>बड़ी ज़रूरत (शादी, मेडिकल)</td>
                      <td>छोटी खरीदारी (Short Term)</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Discipline</strong>
                      </td>
                      <td>High (मजबूरी में भरना पड़ता है)</td>
                      <td>Low (खर्च बढ़ता जाता है)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* [AD SLOT 5] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-5" type="leaderboard" />
              </div>

              {/* --- SECTION 9: SUITABILITY --- */}
              <h2 id="who-should-take">9. Personal Loan किसे लेना चाहिए?</h2>
              <div className="conclusion-box">
                <p>
                  <strong>✅ सही है अगर:</strong> आपको मेडिकल इमरजेंसी है, शादी
                  का खर्च है, या क्रेडिट कार्ड का भारी कर्ज चुकाना है और आपकी
                  नौकरी पक्की है。
                </p>
                <p style={{ marginTop: 16 }}>
                  <strong>❌ गलत है अगर:</strong> आप नया फोन, पार्टी, या दिखावे
                  के लिए लोन ले रहे हैं, या आपकी नौकरी स्थिर नहीं है।
                </p>
              </div>

              {/* --- SECTION 10: MISTAKES --- */}
              <h2 id="mistakes">10. आम गलतियाँ (Common Mistakes)</h2>
              <ul className="checklist" style={{ listStyle: 'none' }}>
                <li>
                  ❌ <strong>सिर्फ EMI देखना:</strong> लोग कम EMI के चक्कर में
                  बहुत लंबा लोन ले लेते हैं और दोगुना ब्याज भरते हैं।
                </li>
                <li>
                  ❌ <strong>Multiple Loans:</strong> एक साथ कई छोटे-छोटे लोन
                  लेने से CIBIL स्कोर खराब होता है।
                </li>
                <li>
                  ❌ <strong>Terms न पढ़ना:</strong> बिना प्री-पेमेंट चार्ज देखे
                  साइन कर देना।
                </li>
                <li>
                  ❌ <strong>Auto-Debit फेल होना:</strong> खाते में बैलेंस न
                  होने से बाउंस चार्ज और पेनाल्टी लगती है।
                </li>
              </ul>

              {/* [AD SLOT 6] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-6" type="leaderboard" />
              </div>

              {/* --- SECTION 11: FAQS --- */}
              <h2 id="faqs">11. Personal Loan FAQs (Hindi)</h2>
              <div className="faqs-accordion">
                <details>
                  <summary>
                    Q1. पर्सनल लोन के लिए सिबिल स्कोर कितना चाहिए?
                  </summary>
                  <p>
                    750 से ऊपर का स्कोर सबसे अच्छा माना जाता है। 700-750 पर भी
                    लोन मिल जाता है लेकिन ब्याज थोड़ा ज्यादा हो सकता है。
                  </p>
                </details>
                <details>
                  <summary>Q2. मैं कितना लोन ले सकता हूँ?</summary>
                  <p>
                    यह आपकी इनकम पर निर्भर करता है। आमतौर पर बैंक आपकी नेट मंथली
                    सैलरी का 10 से 15 गुना तक लोन दे सकते हैं।
                  </p>
                </details>
                <details>
                  <summary>
                    Q3. लोन जल्दी बंद करने (Foreclosure) पर चार्ज लगता है?
                  </summary>
                  <p>
                    हाँ, ज्यादातर बैंक लोन की बची हुई राशि पर 2% से 5% तक
                    Foreclosure Charge लेते हैं। कुछ बैंक इसे फ्री भी करते हैं।
                  </p>
                </details>
                <details>
                  <summary>Q4. लोन रिजेक्ट क्यों होता है?</summary>
                  <p>
                    खराब सिबिल स्कोर, बहुत सारे पुराने लोन, या बार-बार नौकरी
                    बदलने के कारण लोन रिजेक्ट हो सकता है।
                  </p>
                </details>
              </div>

              <hr
                style={{
                  margin: '32px 0',
                  border: 0,
                  borderTop: '1px solid #eee',
                }}
              />

              {/* --- SECTION 12: TOOLS --- */}
              <h2>12. Tools & Internal Links</h2>
              <div className="advantage-grid">
                <Link
                  href="/hi/emi-calculator"
                  className="advantage-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h4>🏠 EMI Calculator</h4>
                  <p>लोन लेने से पहले अपनी किस्त (EMI) यहाँ चेक करें।</p>
                </Link>
                <Link
                  href="/hi/sip-calculator"
                  className="advantage-card"
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <h4>📈 SIP Calculator</h4>
                  <p>लोन चुकाने के बाद बचत शुरू करने का प्लान बनाएं।</p>
                </Link>
              </div>

              {/* [AD SLOT 7] */}
              <div className="ad-spacer no-print">
                <AdSlot id="hi-pl-7" type="leaderboard" />
              </div>

              {/* --- CONCLUSION --- */}
              <h2>निष्कर्ष: Personal Loan सोच‑समझ कर ही लें</h2>
              <p>
                पर्सनल लोन बुरा नहीं है, बस इसका इस्तेमाल सही होना चाहिए। जरूरत
                हो तभी लें, EMI पहले कैलकुलेट करें, और हमेशा समय पर चुकाएं। सही
                फैसला आपकी फाइनेंशियल लाइफ को आसान बना सकता है, और गलत फैसला
                आपको कर्ज के जाल में फंसा सकता है।
              </p>

              <AuthorBio />
            </article>
          </div>

          {/* --- SIDEBAR --- */}
          <HindiSidebar />
        </div>
      </main>
    </div>
  );
}

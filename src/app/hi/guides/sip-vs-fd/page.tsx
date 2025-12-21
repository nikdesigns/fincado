import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'SIP vs FD (हिंदी गाइड): आम आदमी के लिए सबसे आसान तुलना | Fincado',
  description:
    'SIP या FD: जानें 2025 में निवेश का सही विकल्प कौन सा है। रिटर्न, रिस्क और टैक्स (Tax) का पूरा विश्लेषण हिंदी में।',
  keywords: [
    'SIP vs FD Hindi',
    'SIP benefits in Hindi',
    'Mutual Fund vs Fixed Deposit Hindi',
    'SIP returns calculation',
  ],
  alternates: {
    canonical: 'https://www.fincado.com/hi/guides/sip-vs-fd',
    languages: {
      'en-IN': 'https://www.fincado.com/guides/sip-vs-fd',
    },
  },
  openGraph: {
    title: 'SIP vs FD: बेहतर कौन है? (2025 हिंदी गाइड)',
    description:
      'FD में पैसा सुरक्षित है या महंगाई इसे खा रही है? SIP और FD का सच जानें।',
    url: 'https://www.fincado.com/hi/guides/sip-vs-fd',
    type: 'article',
    images: [
      {
        url: 'https://www.fincado.com/images/og/sip-vs-fd.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiSipVsFdGuide() {
  // --- FAQ SCHEMA ---
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'SIP सुरक्षित है या नहीं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SIP FD जितना सुरक्षित नहीं है क्योंकि यह मार्केट लिंक्ड है। लेकिन लंबी अवधि (7-10 साल) में इसमें रिस्क कम हो जाता है और FD से बेहतर रिटर्न की संभावना होती है।',
        },
      },
      {
        '@type': 'Question',
        name: 'FD का ब्याज हर साल taxable क्यों होता है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'FD से मिलने वाला ब्याज आपकी इनकम माना जाता है और आपके टैक्स स्लैब के अनुसार उस पर टैक्स लगता है।',
        },
      },
      {
        '@type': 'Question',
        name: 'SIP में पैसा कब निकाल सकते हैं?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'सामान्य ओपन-एंडेड SIP में कोई लॉक-इन नहीं होता, आप कभी भी पैसा निकाल सकते हैं। ELSS में 3 साल का लॉक-इन होता है।',
        },
      },
    ],
  };

  return (
    <>
      {/* --- SCHEMAS --- */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            inLanguage: 'hi',
            headline: 'SIP vs FD (हिंदी गाइड): आम आदमी के लिए सबसे आसान तुलना',
            description:
              'SIP और FD को बहुत ही आसान हिंदी में समझाया गया है ताकि आप अपने लिए सही विकल्प चुन सकें।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/hi/guides/sip-vs-fd',
            },
            image: {
              '@type': 'ImageObject',
              url: 'https://www.fincado.com/images/og/sip-vs-fd.webp',
              width: 1200,
              height: 630,
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
            datePublished: '2025-12-18',
            dateModified: '2025-12-18',
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com' },
          { name: 'हिंदी गाइड्स', url: 'https://www.fincado.com/hi' },
          {
            name: 'SIP vs FD',
            url: 'https://www.fincado.com/hi/guides/sip-vs-fd',
          },
        ]}
      />

      {/* --- ARTICLE HEADER --- */}
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
          Must Read
        </span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            marginTop: 16,
            lineHeight: 1.3,
            color: 'var(--color-text-main)',
          }}
        >
          SIP vs FD (हिंदी गाइड): आम आदमी के लिए सबसे आसान तुलना
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
          <span>10 Min Read</span>
          <span>•</span>
          <span style={{ color: 'var(--color-brand-green)' }}>
            Verified Information
          </span>
        </div>

        <ShareTools title="SIP vs FD (Hindi Guide)" />
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <article className="article content-for-seo">
        <WikiText
          content={`
          <p>
            आज के समय में हर कोई यह सोच रहा है कि पैसा कहाँ लगाया जाए – <strong>SIP में या FD में?</strong> ये दोनों तरीके दिखने में सरल हैं, लेकिन इनके रिटर्न, रिस्क और टैक्स में ज़मीन–आसमान का फर्क है। इस गाइड में SIP और FD को बहुत ही आसान हिंदी में समझाया गया है ताकि आप अपने लिए सही विकल्प चुन सकें।
          </p>
        `}
        />

        {/* [AD SLOT 1] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-1" type="leaderboard" label="Sponsored" />
        </div>

        <hr
          style={{
            margin: '32px 0',
            border: 0,
            borderTop: '1px solid #eee',
          }}
        />

        {/* --- SECTION 1 --- */}
        <h2 id="what-is-sip">
          1. SIP क्या है? (Simple हिंदी, Real Life Example)
        </h2>
        <p>
          SIP यानी <strong>Systematic Investment Plan</strong>। इसे ऐसे समझिए
          जैसे आप हर महीने अपनी जेब खर्च से थोड़ा‑थोड़ा पैसा अलग रखकर किसी अच्छे
          काम के लिए बचाते हैं – बस यहाँ वो पैसा <strong>म्यूचुअल फंड</strong>{' '}
          में जाता है।
        </p>

        <h3>SIP कैसे काम करता है?</h3>
        <ul>
          <li>
            आप हर महीने तय राशि (जैसे ₹1,000, ₹2,000 या ₹5,000) एक{' '}
            <strong>म्यूचुअल फंड स्कीम</strong> में निवेश करते हैं।
          </li>
          <li>
            शेयर बाजार ऊपर‑नीचे होता रहता है, इसलिए कभी NAV महंगा मिलता है, कभी
            सस्ता।
          </li>
          <li>
            जब मार्केट गिरता है तो उतने ही पैसे में आपको ज़्यादा यूनिट्स मिलती
            हैं, और जब मार्केट चढ़ता है तो कम यूनिट्स – इसे ही{' '}
            <strong>rupee cost averaging</strong> कहते हैं।
          </li>
          <li>
            लंबे समय में यह averaging आपकी <strong>औसत खरीद कीमत को कम</strong>{' '}
            कर देती है और कंपाउंडिंग की वजह से पैसा तेज़ी से बढ़ सकता है।
          </li>
        </ul>

        <div className="callout-box info-box">
          <strong>Real life example:</strong>
          <br />
          अगर आप हर महीने मोबाइल EMI भर सकते हैं, तो उतनी ही आसानी से SIP भी कर
          सकते हैं – फर्क बस इतना है कि EMI आपकी जेब से पैसा निकालती है, SIP
          आपके लिए भविष्य में पैसा बनाती है।
        </div>

        {/* [AD SLOT 2] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-2" type="leaderboard" />
        </div>

        <hr
          style={{
            margin: '32px 0',
            border: 0,
            borderTop: '1px solid #eee',
          }}
        />

        {/* --- SECTION 2: FD --- */}
        <h2 id="what-is-fd">2. FD क्या है? (Trust और Safety Angle)</h2>
        <p>
          FD यानी <strong>Fixed Deposit</strong>। यह भारत में सबसे ज्यादा
          भरोसेमंद निवेशों में से एक माना जाता है क्योंकि:
        </p>
        <ul>
          <li>
            आप <strong>एकमुश्त रकम</strong> बैंक या पोस्ट ऑफिस में जमा करते हैं
            (जैसे ₹50,000, ₹1 लाख, ₹5 लाख)।
          </li>
          <li>ब्याज दर पहले से तय होती है, जैसे 6.5%, 7% आदि।</li>
          <li>
            लगभग कोई रिस्क नहीं माना जाता, खासकर सरकारी बैंक और पोस्ट ऑफिस में।
          </li>
        </ul>

        <div className="example-box">
          <h3>Senior citizens के लिए extra interest</h3>
          <ul>
            <li>
              ज़्यादातर बैंक <strong>senior citizens</strong> को normal FD से
              0.25%–0.75% तक ज़्यादा ब्याज देते हैं।
            </li>
            <li>
              उदाहरण: अगर normal FD पर 7% है, तो senior citizen FD पर 7.5% मिल
              सकता है।
            </li>
          </ul>
        </div>

        <hr
          style={{
            margin: '32px 0',
            border: 0,
            borderTop: '1px solid #eee',
          }}
        />

        {/* --- SECTION 3: COMPARISON TABLE --- */}
        <h2 id="comparison">3. SIP vs FD — सीधा फर्क (टेबल में तुलना)</h2>
        <p>
          नीचे की table में SIP और FD के बीच मुख्य अंतर बहुत सरल भाषा में दिए गए
          हैं:
        </p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>पॉइंट</th>
                <th>SIP (म्यूचुअल फंड)</th>
                <th>FD (Fixed Deposit)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>रिटर्न</strong>
                </td>
                <td style={{ color: 'var(--color-brand-green)' }}>
                  मार्केट लिंक्ड, 10–15% तक की संभावना
                </td>
                <td>फिक्स्ड, आमतौर पर 6–8% के बीच</td>
              </tr>
              <tr>
                <td>
                  <strong>रिस्क</strong>
                </td>
                <td style={{ color: '#ca8a04' }}>
                  मार्केट रिस्क, short term में उतार–चढ़ाव
                </td>
                <td style={{ color: 'var(--color-brand-green)' }}>
                  बहुत कम रिस्क, capital safe
                </td>
              </tr>
              <tr>
                <td>
                  <strong>टैक्स</strong>
                </td>
                <td style={{ color: 'var(--color-brand-green)' }}>
                  LTCG (10%) / STCG (15%)
                </td>
                <td style={{ color: '#dc2626' }}>
                  ब्याज पूरी तरह taxable (Slab rate)
                </td>
              </tr>
              <tr>
                <td>
                  <strong>निवेश अवधि</strong>
                </td>
                <td>आदर्श 5–15 साल या इससे ज्यादा</td>
                <td>कुछ महीने से 5–10 साल तक</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* [AD SLOT 3] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-3" type="leaderboard" />
        </div>

        {/* --- SECTION 4: RETURNS EXAMPLE --- */}
        <h2 id="returns-example">4. रिटर्न का फर्क (₹ उदाहरण के साथ)</h2>
        <p>
          अब वही चीज़ numbers से समझते हैं, क्योंकि भारतीय निवेशक{' '}
          <strong>अंक देखकर</strong> सबसे ज़्यादा convince होते हैं।
        </p>

        {/* ✅ IMAGE PLACEHOLDER: GROWTH GRAPH */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/sip-vs-fd/sip-vs-fd-growth-graph.webp"
            alt="Graph showing SIP vs FD returns over 20 years"
            width={1200}
            height={600}
            className="guide-image"
          />
          <p className="image-caption">
            Graph: 20 साल में SIP और FD के रिटर्न का अंतर (SIP creates double
            wealth)
          </p>
        </div>

        <h3>Example 1: ₹5,000 प्रति माह SIP, 10 साल</h3>
        <div className="callout-box update-box">
          <strong>Approx Result (अंदाज़न @ 12%):</strong>
          <br />
          <ul>
            <li>
              कुल निवेश: <strong>₹6,00,000</strong>
            </li>
            <li>
              संभावित राशि: लगभग <strong>₹11–12 लाख</strong>
            </li>
          </ul>
        </div>

        <h3>Example 2: FD में ₹6 लाख एकमुश्त, 10 साल</h3>
        <p>अब वही ₹6 लाख आप FD में एक बार में निवेश करते हैं (7% ब्याज पर):</p>
        <ul>
          <li>
            maturity ≈ <strong>₹11.8–11.9 लाख</strong>
          </li>
        </ul>
        <p>
          <strong>फर्क:</strong> SIP में पैसा धीरे-धीरे जाता है, FD में एक साथ।
          लेकिन लंबे समय (15-20 साल) में SIP का कंपाउंडिंग इफेक्ट FD से कहीं
          ज्यादा होता है।
        </p>

        {/* [AD SLOT 4] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-4" type="leaderboard" />
        </div>

        {/* --- SECTION 5: TAXATION --- */}
        <h2 id="tax">5. टैक्स तुलना: SIP vs FD</h2>
        <p>टैक्स का फर्क अक्सर total return पर बहुत बड़ा impact डालता है।</p>

        {/* ✅ IMAGE PLACEHOLDER: TAXATION */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/sip-vs-fd/sip-fd-taxation-comparison.webp"
            alt="SIP vs FD Taxation Rules 2025"
            width={1200}
            height={600}
            className="guide-image"
          />
          <p className="image-caption">
            Chart: 2025 के नए टैक्स नियम (Tax Rules Comparison)
          </p>
        </div>

        <div
          className="rejection-card"
          style={{ borderLeft: '4px solid #dc2626' }}
        >
          <div className="rejection-title" style={{ color: '#dc2626' }}>
            Reality Check (FD Tax)
          </div>
          <p>
            अगर FD rate 7% है और आप 30% टैक्स स्लैब में हैं, तो आपका Effective
            Return केवल <strong>4.9%</strong> रह जाता है। अगर महंगाई 6% है, तो
            असल में आपका पैसा घट रहा है।
          </p>
        </div>

        {/* [AD SLOT 5] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-5" type="leaderboard" />
        </div>

        {/* --- SECTION 6: SUITABILITY --- */}
        <h2 id="verdict">6. SIP vs FD — कौन बेहतर है? (फैसला)</h2>
        <div className="conclusion-box">
          <p>
            <strong>Short term (1–3 साल):</strong> <br />
            यहाँ capital सुरक्षित रखना ज़्यादा ज़रूरी है, इसलिए{' '}
            <strong>FD बेहतर</strong> है।
          </p>
          <p style={{ marginTop: 16 }}>
            <strong>Long term (5–15 साल+):</strong> <br />
            यहाँ compounding और growth मायने रखती है, इसलिए{' '}
            <strong>SIP बेहतर</strong> है।
          </p>
          <p style={{ marginTop: 16 }}>
            <strong>Mixed strategy:</strong> <br />
            Emergency fund और short term goals के लिए <strong>FD</strong>। Long
            term goals (Retirement, Kids Edu) के लिए <strong>SIP</strong>।
          </p>
        </div>

        {/* [AD SLOT 6] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-6" type="leaderboard" />
        </div>

        {/* --- SECTION 7: FAQS --- */}
        <h2 id="faqs">7. SIP vs FD FAQs (Hindi)</h2>
        <div className="faqs-accordion">
          <details>
            <summary>Q1. SIP सुरक्षित है या नहीं?</summary>
            <p>
              SIP मार्केट लिंक्ड है, इसलिए शॉर्ट टर्म में रिस्क होता है। लेकिन
              लंबी अवधि (7-10 साल) में रिस्क काफी कम हो जाता है।
            </p>
          </details>
          <details>
            <summary>Q2. FD का ब्याज हर साल taxable क्यों होता है?</summary>
            <p>
              FD का ब्याज &quot;Income from Other Sources&quot; माना जाता है और
              आपके टैक्स स्लैब के अनुसार उस पर टैक्स लगता है।
            </p>
          </details>
          <details>
            <summary>Q3. SIP में पैसा कब निकाल सकते हैं?</summary>
            <p>
              सामान्य SIP में कोई लॉक-इन नहीं होता। आप कभी भी पैसा निकाल सकते
              हैं (एग्जिट लोड लग सकता है अगर 1 साल से पहले निकालें)।
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

        {/* --- SECTION 8: TOOLS --- */}
        <h2>8. Tools & Internal Links</h2>
        <div className="advantage-grid">
          <Link
            href="/hi/sip-calculator"
            className="advantage-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h4>📈 SIP Calculator</h4>
            <p>₹5,000–₹10,000 SIP से 10–20 साल में कितना बनेगा, यहाँ देखें।</p>
          </Link>
          <Link
            href="/hi/fd-calculator"
            className="advantage-card"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h4>📜 FD Calculator</h4>
            <p>
              अपनी FD की maturity और ब्याज जानने के लिए यह calculator इस्तेमाल
              करें।
            </p>
          </Link>
        </div>

        {/* [AD SLOT 7] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-guide-7" type="leaderboard" />
        </div>

        {/* --- CONCLUSION --- */}
        <h2>निष्कर्ष: SIP vs FD कैसे चुनें?</h2>
        <p>
          फैसला कभी भी जल्दबाज़ी में न लें। पहले अपने goals लिखें, फिर{' '}
          <strong>Calculators</strong> का उपयोग करें। सही जानकारी और planning से
          SIP और FD दोनों आपके लिए wealth बना सकते हैं – फर्क बस इतना है कि आप
          इन्हें समझकर इस्तेमाल करते हैं या बिना सोचे।
        </p>

        <AuthorBio />
        <div className="legal-disclaimer">
          <p>
            <strong>अस्वीकरण:</strong> म्यूचुअल फंड निवेश बाजार जोखिमों के अधीन
            हैं। योजना से संबंधित सभी दस्तावेजों को ध्यान से पढ़ें। यह लेख केवल
            जानकारी के लिए है, वित्तीय सलाह नहीं।
          </p>
        </div>
      </article>
    </>
  );
}

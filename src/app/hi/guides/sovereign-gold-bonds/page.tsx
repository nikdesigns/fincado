import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

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
    canonical: 'https://www.fincado.com/hi/guides/sovereign-gold-bonds',
  },
  openGraph: {
    title: 'Sovereign Gold Bond (SGB): सोना खरीदने का सबसे स्मार्ट तरीका',
    description:
      'गोल्ड बॉन्ड में निवेश करें और पाएं 2.5% एक्स्ट्रा ब्याज + टैक्स फ्री रिटर्न। पूरी जानकारी हिंदी में।',
    url: 'https://www.fincado.com/hi/guides/sovereign-gold-bonds',
    type: 'article',
    images: [
      {
        url: 'https://www.fincado.com/images/guides/sgb/sgb-guide-hindi.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiSGBGuide() {
  // --- FAQ SCHEMA ---
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'SGB पर कितना ब्याज मिलता है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'SGB पर सालाना 2.5% का फिक्स्ड ब्याज मिलता है, जो साल में दो बार आपके बैंक खाते में जमा किया जाता है।',
        },
      },
      {
        '@type': 'Question',
        name: 'क्या SGB टैक्स फ्री है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'हाँ, अगर आप SGB को मैच्योरिटी (8 साल) तक होल्ड करते हैं, तो कैपिटल गेन्स टैक्स पूरी तरह माफ होता है। लेकिन सालाना ब्याज पर टैक्स लगता है।',
        },
      },
      {
        '@type': 'Question',
        name: 'क्या मैं SGB को 8 साल से पहले बेच सकता हूँ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'हाँ, आप 5 साल बाद RBI के जरिए रिडीम कर सकते हैं या स्टॉक एक्सचेंज पर कभी भी बेच सकते हैं (अगर डीमैट में है)।',
        },
      },
      {
        '@type': 'Question',
        name: 'SGB कैसे खरीदें?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'आप अपने बैंक (नेट बैंकिंग), पोस्ट ऑफिस, स्टॉक ब्रोकर (Zerodha, Upstox) या एजेंट के जरिए SGB खरीद सकते हैं।',
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
            headline:
              'Sovereign Gold Bond (SGB) Guide: ब्याज, टैक्स और रिडेम्पशन',
            description:
              'Sovereign Gold Bond क्या है? जानें 2.5% ब्याज, टैक्स फ्री रिटर्न और मैच्योरिटी के नियम। Physical Gold vs SGB की पूरी तुलना।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.fincado.com/hi/guides/sovereign-gold-bonds',
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
            datePublished: '2025-12-21',
            dateModified: '2025-12-21',
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
            name: 'Sovereign Gold Bonds',
            url: 'https://www.fincado.com/hi/guides/sovereign-gold-bonds',
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
          Gold Investment
        </span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            marginTop: 16,
            lineHeight: 1.3,
            color: 'var(--color-text-main)',
          }}
        >
          Sovereign Gold Bonds (SGB) Guide: ब्याज, टैक्स और रिडेम्पशन
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
            RBI Regulated
          </span>
        </div>

        <ShareTools title="SGB Guide (Hindi)" />
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <article className="article content-for-seo">
        <WikiText
          content={`
          <p>
            <strong>Sovereign Gold Bonds (SGB)</strong> भारत सरकार और RBI द्वारा जारी किया गया एक अनोखा डिजिटल गोल्ड निवेश विकल्प है। यह आपको सोने की कीमतों का फायदा तो देता ही है, साथ ही <strong>2.5% तक अतिरिक्त ब्याज, टैक्स बेनिफिट और पूरी तरह सरकारी सुरक्षा</strong> भी प्रदान करता है।
          </p>
        `}
        />

        {/* ✅ IMAGE PLACEHOLDER: HERO */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/sgb/sgb-guide-hero.webp"
            alt="Sovereign Gold Bond Concept: Gold + Interest"
            width={1200}
            height={600}
            className="guide-image"
          />
          <p className="image-caption">
            SGB = सोने का भाव + 2.5% सालाना ब्याज (Dual Benefit)
          </p>
        </div>

        {/* [AD SLOT 1] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-1" type="leaderboard" label="Sponsored" />
        </div>

        <hr
          style={{
            margin: '32px 0',
            border: 0,
            borderTop: '1px solid #eee',
          }}
        />

        {/* --- SECTION 1: WHAT IS SGB --- */}
        <h2 id="what-is-sgb">1. Sovereign Gold Bonds क्या हैं?</h2>
        <p>
          SGB एक सरकारी सिक्योरिटी (Government Security) है जिसकी वैल्यू सोने
          (Gold) के भाव से जुड़ी होती है। इसे <strong>RBI</strong> भारत सरकार की
          ओर से जारी करता है।
        </p>
        <ul>
          <li>1 यूनिट SGB = 1 ग्राम (999 शुद्धता वाला) सोना।</li>
          <li>
            आप इसमें डीमैट फॉर्म या फिजिकल सर्टिफिकेट के रूप में निवेश कर सकते
            हैं।
          </li>
        </ul>

        <h3>मुख्य हाइलाइट्स (Key Features)</h3>
        <ul className="checklist">
          <li>
            <strong>समर्थन:</strong> भारत सरकार (Sovereign Guarantee)।
          </li>
          <li>
            <strong>ब्याज:</strong> 2.5% सालाना (फिक्स्ड)।
          </li>
          <li>
            <strong>अवधि:</strong> 8 साल (5 साल बाद निकलने का विकल्प)।
          </li>
          <li>
            <strong>रिडेम्पशन:</strong> मैच्योरिटी पर पैसा सीधे बैंक खाते में
            आता है।
          </li>
        </ul>

        {/* [AD SLOT 2] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-2" type="leaderboard" />
        </div>

        {/* --- SECTION 2: SGB BENEFITS --- */}
        <h2 id="benefits">2. SGB क्यों बेहतर है Physical Gold से?</h2>
        <p>
          फिजिकल गोल्ड (जेवर, सिक्के) खरीदने में मेकिंग चार्ज और सुरक्षा की
          चिंता होती है। SGB इन सभी समस्याओं का समाधान है।
        </p>

        <h3>1. 2.5% अतिरिक्त ब्याज (Extra Interest)</h3>
        <p>
          फिजिकल गोल्ड सिर्फ भाव बढ़ने पर फायदा देता है। लेकिन SGB में आपको सोने
          के भाव के अलावा <strong>हर साल 2.5% ब्याज</strong> भी मिलता है।
        </p>
        <div className="example-box">
          <strong>उदाहरण:</strong>
          <br />
          निवेश: ₹1,00,000 (SGB में)
          <br />
          ब्याज: ₹2,500 हर साल (सीधे बैंक खाते में)
          <br />8 साल में कुल ब्याज: ₹20,000 (सोने के भाव से अलग एक्स्ट्रा
          कमाई)।
        </div>

        <h3>2. कोई मेकिंग चार्ज नहीं, कोई चोरी का डर नहीं</h3>
        <ul>
          <li>
            जेवर खरीदने पर 10-20% मेकिंग चार्ज लगता है, जो निवेश के लिहाज से
            घाटा है। SGB में <strong>0% मेकिंग चार्ज</strong> है।
          </li>
          <li>
            SGB डिजिटल फॉर्मेट में होता है (RBI की किताबों में या डीमैट में),
            इसलिए चोरी या शुद्धता की कोई चिंता नहीं।
          </li>
        </ul>

        {/* [AD SLOT 3] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-3" type="leaderboard" />
        </div>

        {/* --- SECTION 3: TAX BENEFITS --- */}
        <h2 id="tax-benefits">3. टैक्स बेनिफिट्स (Tax on SGB)</h2>
        <p>
          SGB का सबसे बड़ा फायदा इसका टैक्स स्ट्रक्चर है, खासकर मैच्योरिटी पर।
        </p>

        <h3>मैच्योरिटी पर कैपिटल गेन्स टैक्स फ्री</h3>
        <p>
          अगर आप SGB को पूरे <strong>8 साल (मैच्योरिटी)</strong> तक होल्ड करते
          हैं, तो सोने का भाव बढ़ने से हुआ पूरा मुनाफा (Capital Gain){' '}
          <strong>100% टैक्स फ्री</strong> होता है।
        </p>
        <div className="callout-box info-box">
          <strong>ध्यान दें:</strong> यह छूट केवल इंडिविजुअल इन्वेस्टर्स के लिए
          है। फिजिकल गोल्ड या गोल्ड ETF बेचने पर आपको टैक्स देना पड़ता है, लेकिन
          SGB मैच्योरिटी पर नहीं।
        </div>

        <h3>ब्याज पर टैक्स</h3>
        <p>
          जो 2.5% सालाना ब्याज मिलता है, वह आपकी इनकम में जुड़ता है और आपके
          टैक्स स्लैब के अनुसार टैक्सेबल होता है।
        </p>

        {/* ✅ IMAGE PLACEHOLDER: TAX CHART */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/sgb/sgb-tax-benefits-hindi.webp"
            alt="SGB Tax Benefits Explained Chart"
            width={1200}
            height={600}
            className="guide-image"
          />
          <p className="image-caption">
            चार्ट: SGB पर टैक्स के नियम (ब्याज vs मैच्योरिटी)
          </p>
        </div>

        {/* [AD SLOT 4] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-4" type="leaderboard" />
        </div>

        {/* --- SECTION 4: HOW TO BUY --- */}
        <h2 id="how-to-buy">4. SGB कैसे खरीदें? (Online & Offline)</h2>
        <p>
          SGB की नई सीरीज़ RBI द्वारा समय-समय पर (Tranches में) जारी की जाती है।
        </p>

        <h3>कहाँ से खरीदें?</h3>
        <ul>
          <li>
            <strong>बैंक (Online Net Banking):</strong> SBI, HDFC, ICICI, Axis
            आदि।
          </li>
          <li>
            <strong>स्टॉक ब्रोकर (Demat):</strong> Zerodha, Upstox, Groww आदि के
            गोल्ड बॉन्ड सेक्शन से।
          </li>
          <li>
            <strong>पोस्ट ऑफिस:</strong> फॉर्म भरकर ऑफलाइन आवेदन कर सकते हैं।
          </li>
        </ul>

        <h3>ऑनलाइन खरीदने पर डिस्काउंट</h3>
        <p>
          आमतौर पर, अगर आप ऑनलाइन अप्लाई करते हैं और डिजिटल पेमेंट करते हैं, तो
          सरकार प्रति ग्राम <strong>₹50 की छूट</strong> देती है।
        </p>

        <h3>सेकेंडरी मार्केट (Stock Exchange)</h3>
        <p>
          अगर कोई नई सीरीज़ नहीं खुली है, तो आप शेयर बाजार (NSE/BSE) से पुराने
          लिस्टेड SGB यूनिट्स भी खरीद सकते हैं। इसके लिए डीमैट अकाउंट जरूरी है।
        </p>

        {/* [AD SLOT 5] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-5" type="leaderboard" />
        </div>

        {/* --- SECTION 5: EXIT OPTIONS --- */}
        <h2 id="exit-options">5. पैसे कब निकाल सकते हैं? (Premature Exit)</h2>
        <p>SGB का कार्यकाल 8 साल का है, लेकिन निकलने के विकल्प मौजूद हैं:</p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>विकल्प</th>
                <th>कब संभव है?</th>
                <th>शर्तें</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>मैच्योरिटी (Maturity)</strong>
                </td>
                <td>8 साल बाद</td>
                <td>ऑटोमैटिक रिडेम्पशन, टैक्स फ्री।</td>
              </tr>
              <tr>
                <td>
                  <strong>RBI विंडो (Early Exit)</strong>
                </td>
                <td>5 साल बाद</td>
                <td>ब्याज भुगतान की तारीखों पर रिडीम कर सकते हैं।</td>
              </tr>
              <tr>
                <td>
                  <strong>स्टॉक एक्सचेंज (Sell)</strong>
                </td>
                <td>कभी भी</td>
                <td>डीमैट खाता जरूरी, लिक्विडिटी कम हो सकती है।</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* [AD SLOT 6] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-6" type="leaderboard" />
        </div>

        {/* --- SECTION 6: COMPARISON --- */}
        <h2 id="comparison">6. SGB vs Physical Gold vs ETF – किसे चुनें?</h2>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>फीचर</th>
                <th>Sovereign Gold Bond</th>
                <th>Physical Gold</th>
                <th>Gold ETF</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>ब्याज</strong>
                </td>
                <td
                  style={{
                    color: 'var(--color-brand-green)',
                    fontWeight: 'bold',
                  }}
                >
                  2.5% सालाना
                </td>
                <td>कुछ नहीं</td>
                <td>कुछ नहीं</td>
              </tr>
              <tr>
                <td>
                  <strong>सुरक्षा</strong>
                </td>
                <td>सरकारी गारंटी</td>
                <td>खुद रखनी पड़ती है</td>
                <td>डिजिटल (डीमैट)</td>
              </tr>
              <tr>
                <td>
                  <strong>मेकिंग चार्ज</strong>
                </td>
                <td>0%</td>
                <td>8–25%</td>
                <td>0% (ब्रोकरेज चार्ज)</td>
              </tr>
              <tr>
                <td>
                  <strong>टैक्स (मैच्योरिटी)</strong>
                </td>
                <td
                  style={{
                    color: 'var(--color-brand-green)',
                    fontWeight: 'bold',
                  }}
                >
                  Tax Free
                </td>
                <td>Taxable</td>
                <td>Taxable</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* --- SECTION 7: FAQS --- */}
        <h2 id="faqs">7. सामान्य प्रश्न (FAQs)</h2>
        <div className="faqs-accordion">
          <details>
            <summary>SGB में निवेश की लिमिट क्या है?</summary>
            <p>
              एक व्यक्ति (Individual) एक वित्तीय वर्ष में न्यूनतम 1 ग्राम और
              अधिकतम 4 किलोग्राम तक SGB खरीद सकता है।
            </p>
          </details>
          <details>
            <summary>क्या SGB पर लोन मिल सकता है?</summary>
            <p>
              हाँ, SGB को कोलैटरल (गिरवी) रखकर आप बैंकों से लोन ले सकते हैं।
              इसका LTV रेश्यो फिजिकल गोल्ड लोन जैसा ही होता है।
            </p>
          </details>
          <details>
            <summary>अगर 8 साल बाद सोने का भाव गिर गया तो?</summary>
            <p>
              SGB में कैपिटल प्रोटेक्शन की गारंटी नहीं है। आपको रिडेम्पशन के समय
              के बाजार भाव (Market Price) के अनुसार ही पैसा मिलेगा। अगर सोना
              सस्ता हुआ, तो नुकसान हो सकता है।
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

        {/* --- SECTION 8: CONCLUSION --- */}
        <div className="conclusion-box">
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            निष्कर्ष: SGB – गोल्ड + ब्याज का स्मार्ट कॉम्बो
          </h2>
          <p>
            अगर आप सोने को सिर्फ पहनने के लिए नहीं, बल्कि <strong>निवेश</strong>{' '}
            के लिए खरीद रहे हैं, तो Sovereign Gold Bond सबसे बेहतरीन विकल्प है।
          </p>
          <ul style={{ paddingLeft: 20, marginTop: 16 }}>
            <li>✅ फिजिकल गोल्ड की तरह भाव बढ़ने का फायदा।</li>
            <li>✅ ऊपर से 2.5% का फिक्स्ड ब्याज।</li>
            <li>✅ 8 साल बाद टैक्स फ्री रिटर्न।</li>
            <li>✅ चोरी या मेकिंग चार्ज की कोई चिंता नहीं।</li>
          </ul>
          <p style={{ marginTop: 16 }}>
            स्मार्ट निवेशक अपने पोर्टफोलियो का 5-10% हिस्सा गोल्ड में रखते हैं,
            और उसके लिए SGB पहली पसंद होनी चाहिए।
          </p>
        </div>

        {/* [AD SLOT 7] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-sgb-7" type="leaderboard" />
        </div>

        {/* --- FOOTER ELEMENTS --- */}
        <AuthorBio />
        <div className="legal-disclaimer">
          <p>
            <strong>अस्वीकरण:</strong> Sovereign Gold Bond भारत सरकार की योजना
            है और इसके नियम समय-समय पर बदल सकते हैं। निवेश करने से पहले कृपया
            RBI की आधिकारिक अधिसूचना या अपने बैंक से नवीनतम जानकारी की पुष्टि
            करें। यह लेख केवल जानकारी के लिए है, वित्तीय सलाह नहीं।
          </p>
        </div>
      </article>
    </>
  );
}

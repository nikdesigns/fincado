import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';
import WikiText from '@/components/WikiText';
import ShareTools from '@/components/ShareTools';
import AuthorBio from '@/components/AuthorBio';

export const metadata: Metadata = {
  title: 'Health Insurance (मेडिक्लेम) कैसे चुनें? 5 जरूरी बातें | Fincado',
  description:
    'Health Insurance Hindi Guide: मेडिक्लेम लेते समय रूम रेंट कैपिंग, को-पेमेंट और वेटिंग पीरियड चेक करें। जानें सही हेल्थ इंश्योरेंस कैसे चुनें।',
  keywords: [
    'Health Insurance kaise chune',
    'Best Health Insurance Hindi',
    'Room Rent Capping Hindi',
    'Cashless Mediclaim Process',
    'Health Insurance Buying Guide Hindi',
  ],
  alternates: {
    canonical:
      'https://www.fincado.com/hi/guides/health-insurance-buying-guide',
  },
  openGraph: {
    title: 'Health Insurance (मेडिक्लेम) कैसे चुनें? 5 जरूरी बातें',
    description:
      'सिर्फ सस्ता प्रीमियम नहीं, ये 5 फीचर्स चेक करें वरना क्लेम के वक्त पछताना पड़ेगा। पूरी जानकारी हिंदी में।',
    url: 'https://www.fincado.com/hi/guides/health-insurance-buying-guide',
    type: 'article',
    images: [
      {
        url: 'https://www.fincado.com/images/guides/health-insurance/health-insurance-guide-hindi.webp',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HindiHealthInsuranceGuide() {
  // --- FAQ SCHEMA ---
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Health Insurance के लिए कितना कवर (Sum Insured) लेना चाहिए?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'मेट्रो शहरों (जैसे दिल्ली, मुंबई) के लिए कम से कम ₹10-15 लाख और छोटे शहरों के लिए ₹5-10 लाख का कवर जरूरी है।',
        },
      },
      {
        '@type': 'Question',
        name: 'रूम रेंट कैपिंग (Room Rent Capping) क्या है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'यह रूम के किराए की लिमिट है (जैसे 1% Sum Insured)। अगर आप इससे महंगा रूम लेते हैं, तो पूरे बिल में से कटौती हो सकती है। इसे अवॉइड करें।',
        },
      },
      {
        '@type': 'Question',
        name: 'क्या पुरानी बीमारी (Pre-existing disease) कवर होती है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'हाँ, लेकिन पॉलिसी लेने के 2 से 4 साल बाद (Waiting Period के बाद)। इसे पॉलिसी लेते समय बताना बहुत जरूरी है।',
        },
      },
      {
        '@type': 'Question',
        name: 'क्या employer का health insurance काफी है?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'नहीं, क्योंकि नौकरी बदलने या छूटने पर वह कवर खत्म हो जाता है। अपनी पर्सनल पॉलिसी होना हमेशा सुरक्षित रहता है।',
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
            headline: 'Health Insurance (मेडिक्लेम) कैसे चुनें? 5 जरूरी बातें',
            description:
              'Health Insurance खरीदने की पूरी गाइड हिंदी में। रूम रेंट लिमिट, वेटिंग पीरियड और कैशलेस नेटवर्क को समझें।',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id':
                'https://www.fincado.com/hi/guides/health-insurance-buying-guide',
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
            name: 'Health Insurance Guide',
            url: 'https://www.fincado.com/hi/guides/health-insurance-buying-guide',
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
          Insurance Basics
        </span>
        <h1
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            marginTop: 16,
            lineHeight: 1.3,
            color: 'var(--color-text-main)',
          }}
        >
          Health Insurance (मेडिक्लेम) कैसे चुनें? 5 जरूरी बातें
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
            Expert Verified
          </span>
        </div>

        <ShareTools title="Health Insurance Guide (Hindi)" />
      </header>

      {/* --- ARTICLE CONTENT --- */}
      <article className="article content-for-seo">
        <WikiText
          content={`
          <p>
            भारत में बढ़ते हॉस्पिटल खर्चों के बीच सही <strong>Health Insurance (मेडिक्लेम)</strong> चुनना बहुत जरूरी हो गया है। सही पॉलिसी के लिए सिर्फ सस्ता प्रीमियम काफी नहीं है, बल्कि <strong>रूम रेंट कैपिंग, को-पेमेंट, और वेटिंग पीरियड</strong> जैसी शर्तों को समझना बेहद ज़रूरी है।
          </p>
        `}
        />

        {/* ✅ IMAGE PLACEHOLDER: HERO */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/health-insurance/health-insurance-guide-hero.webp"
            alt="Family Health Insurance Protection Concept"
            width={1200}
            height={600}
            className="guide-image"
          />
          <p className="image-caption">
            मेडिकल इमरजेंसी से अपने परिवार को सुरक्षित करें (Health Insurance
            Shield)
          </p>
        </div>

        {/* [AD SLOT 1] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-1" type="leaderboard" label="Sponsored" />
        </div>

        <hr
          style={{
            margin: '32px 0',
            border: 0,
            borderTop: '1px solid #eee',
          }}
        />

        {/* --- SECTION 1: WHAT IS HEALTH INSURANCE --- */}
        <h2 id="what-is-health-insurance">
          1. Health Insurance (मेडिक्लेम) क्या है?
        </h2>
        <p>
          यह एक कॉन्ट्रैक्ट है जिसमें आप बीमा कंपनी को प्रीमियम देते हैं, और
          बदले में कंपनी आपके अस्पताल के खर्च (Hospitalization Expenses) उठाती
          है।
        </p>
        <ul>
          <li>
            <strong>प्रीमियम:</strong> जो पैसा आप हर साल भरते हैं।
          </li>
          <li>
            <strong>सम इंश्योर्ड (Sum Insured):</strong> अधिकतम राशि जो कंपनी एक
            साल में देगी (जैसे ₹5 लाख, ₹10 लाख)।
          </li>
        </ul>

        <h3>यह कैसे काम करता है?</h3>
        <p>
          जब आप हॉस्पिटल में भर्ती होते हैं, तो दो तरीके से क्लेम मिल सकता है:
        </p>
        <ol>
          <li>
            <strong>कैशलेस (Cashless):</strong> नेटवर्क हॉस्पिटल में भर्ती होने
            पर बीमा कंपनी सीधे हॉस्पिटल को बिल चुकाती है।
          </li>
          <li>
            <strong>रीइम्बर्समेंट (Reimbursement):</strong> आप पहले बिल भरते हैं
            और बाद में कंपनी से पैसा वापस मांगते हैं।
          </li>
        </ol>

        {/* [AD SLOT 2] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-2" type="leaderboard" />
        </div>

        {/* --- SECTION 2: KEY FEATURES --- */}
        <h2 id="key-features">2. पॉलिसी लेते समय ये 5 बातें जरूर चेक करें</h2>
        <p>
          सबसे सस्ती पॉलिसी के चक्कर में न पड़ें। इन फीचर्स को ध्यान से देखें:
        </p>

        <h3>1. रूम रेंट कैपिंग (Room Rent Capping)</h3>
        <p>
          कई पॉलिसियों में रूम के किराए की लिमिट होती है (जैसे 1% of Sum
          Insured)।
        </p>
        <div className="callout-box info-box">
          <strong>चेतावनी:</strong> अगर आप लिमिट से महंगा रूम लेते हैं, तो
          हॉस्पिटल के बाकी खर्चे (डॉक्टर फीस, नर्सिंग) भी उसी अनुपात में बढ़
          जाते हैं और आपको अपनी जेब से भारी रकम देनी पड़ सकती है।
          <br />
          <strong>सलाह:</strong> हमेशा{' '}
          <strong>&quot;No Room Rent Capping&quot;</strong> वाली पॉलिसी लें।
        </div>

        {/* ✅ IMAGE PLACEHOLDER: ROOM RENT IMPACT */}
        <div className="guide-image-wrap">
          <Image
            src="/images/guides/health-insurance/room-rent-capping-explained.webp"
            alt="Room Rent Capping Impact Explained in Hindi"
            width={1200}
            height={600}
            className="guide-image"
          />
          <p className="image-caption">
            चार्ट: रूम रेंट कैपिंग से आपके बिल पर क्या असर पड़ता है?
          </p>
        </div>

        <h3>2. को-पेमेंट (Co-payment)</h3>
        <p>
          इसका मतलब है कि हर क्लेम का कुछ हिस्सा (जैसे 10% या 20%) आपको भरना
          होगा।
        </p>
        <ul className="checklist">
          <li>
            कोशिश करें कि पॉलिसी में <strong>Zero Co-payment</strong> हो।
          </li>
          <li>
            सीनियर सिटिजन प्लान्स में को-पेमेंट आम है, उसे ध्यान से देखें।
          </li>
        </ul>

        <h3>3. वेटिंग पीरियड (Waiting Period)</h3>
        <p>
          पुरानी बीमारियों (जैसे डायबिटीज, बीपी) के लिए अक्सर 2 से 4 साल का
          वेटिंग पीरियड होता है। कम वेटिंग पीरियड वाली पॉलिसी बेहतर होती है।
        </p>

        {/* [AD SLOT 3] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-3" type="leaderboard" />
        </div>

        <h3>4. कैशलेस नेटवर्क (Network Hospitals)</h3>
        <p>
          चेक करें कि आपके शहर के अच्छे और बड़े अस्पताल बीमा कंपनी की{' '}
          <strong>नेटवर्क लिस्ट</strong> में हैं या नहीं। कैशलेस सुविधा इमरजेंसी
          में वरदान साबित होती है।
        </p>

        <h3>5. नो क्लेम बोनस (NCB)</h3>
        <p>
          अगर आप साल भर कोई क्लेम नहीं करते, तो अच्छी कंपनियां आपका कवर (Sum
          Insured) बढ़ा देती हैं। चेक करें कि NCB कितना मिलता है (50% तक या 100%
          तक)।
        </p>

        {/* [AD SLOT 4] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-4" type="leaderboard" />
        </div>

        {/* --- SECTION 3: TAX BENEFITS --- */}
        <h2 id="tax-benefits">3. टैक्स बेनिफिट्स (Section 80D)</h2>
        <p>
          हेल्थ इंश्योरेंस का प्रीमियम भरने पर आपको इनकम टैक्स में छूट मिलती है।
        </p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>कवरेज</th>
                <th>अधिकतम छूट (सालाना)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>खुद और परिवार (60 वर्ष से कम)</td>
                <td>₹25,000</td>
              </tr>
              <tr>
                <td>माता-पिता (60 वर्ष से कम)</td>
                <td>₹25,000 (अतिरिक्त)</td>
              </tr>
              <tr>
                <td>माता-पिता (सीनियर सिटिजन 60+)</td>
                <td>₹50,000 (अतिरिक्त)</td>
              </tr>
              <tr>
                <td>
                  <strong>कुल अधिकतम छूट</strong>
                </td>
                <td>
                  <strong>₹75,000 - ₹1,00,000</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* [AD SLOT 5] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-5" type="leaderboard" />
        </div>

        {/* --- SECTION 4: COMPARISON --- */}
        <h2 id="comparison">4. Health Insurance vs अन्य विकल्प</h2>
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>विकल्प</th>
                <th>फायदे</th>
                <th>नुकसान</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Personal Health Policy</strong>
                </td>
                <td style={{ color: 'var(--color-brand-green)' }}>
                  बड़ा कवर, लाइफटाइम रिन्यूअल
                </td>
                <td>प्रीमियम भरना पड़ता है</td>
              </tr>
              <tr>
                <td>
                  <strong>Employer (Company) Cover</strong>
                </td>
                <td>सस्ता या फ्री</td>
                <td style={{ color: '#dc2626' }}>नौकरी छोड़ने पर खत्म</td>
              </tr>
              <tr>
                <td>
                  <strong>Emergency Fund</strong>
                </td>
                <td>कैश कंट्रोल</td>
                <td>बड़ी बीमारी में पैसा कम पड़ सकता है</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* [AD SLOT 6] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-6" type="leaderboard" />
        </div>

        {/* --- SECTION 5: FAQS --- */}
        <h2 id="faqs">5. सामान्य प्रश्न (FAQs)</h2>
        <div className="faqs-accordion">
          <details>
            <summary>Health Insurance के लिए कितना कवर सही है?</summary>
            <p>
              मेट्रो शहरों के लिए कम से कम ₹10 लाख का कवर सुरक्षित माना जाता है।
              छोटे शहरों में ₹5-7 लाख से शुरुआत की जा सकती है।
            </p>
          </details>
          <details>
            <summary>क्या ओपीडी (OPD) खर्च कवर होते हैं?</summary>
            <p>
              साधारण पॉलिसी में सिर्फ भर्ती (Hospitalization) होने का खर्च मिलता
              है। ओपीडी कवर के लिए अलग से राइडर या महंगी पॉलिसी लेनी पड़ती है।
            </p>
          </details>
          <details>
            <summary>अगर मुझे पहले से बीमारी है तो क्या पॉलिसी मिलेगी?</summary>
            <p>
              हाँ, लेकिन वह बीमारी 2 से 4 साल के वेटिंग पीरियड के बाद कवर होगी।
              पॉलिसी लेते समय इसे छुपाएँ नहीं, वरना क्लेम रिजेक्ट हो सकता है।
            </p>
          </details>
          <details>
            <summary>क्या मैं बाद में अपना कवर बढ़ा सकता हूँ?</summary>
            <p>
              हाँ, रिन्यूअल के समय आप सम इंश्योर्ड बढ़ाने की रिक्वेस्ट दे सकते
              हैं। या फिर आप एक सस्ती <strong>Super Top-up Policy</strong> लेकर
              अपना कवर बढ़ा सकते हैं।
            </p>
          </details>
        </div>

        {/* --- CONCLUSION --- */}
        <div className="conclusion-box" style={{ marginTop: 40 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            निष्कर्ष: सही पॉलिसी कैसे चुनें?
          </h2>
          <p>
            हेल्थ इंश्योरेंस कोई निवेश नहीं, बल्कि सुरक्षा कवच है।
            <br />- <strong>रूम रेंट कैपिंग</strong> से बचें।
            <br />- <strong>को-पेमेंट</strong> की शर्तें ध्यान से पढ़ें।
            <br />- <strong>कैशलेस नेटवर्क</strong> चेक करें।
          </p>
          <p style={{ marginTop: 16 }}>
            आज ही अपने और अपने परिवार के लिए एक सही हेल्थ इंश्योरेंस चुनें ताकि
            भविष्य में कोई भी मेडिकल इमरजेंसी आपकी जमा पूंजी को खत्म न कर सके।
          </p>
        </div>

        {/* [AD SLOT 7] */}
        <div className="ad-spacer no-print">
          <AdSlot id="hi-health-7" type="leaderboard" />
        </div>

        {/* --- FOOTER ELEMENTS --- */}
        <AuthorBio />
        <div className="legal-disclaimer">
          <p>
            <strong>अस्वीकरण:</strong> बीमा आग्रह की विषयवस्तु है। यह लेख केवल
            जानकारी के उद्देश्य से है। पॉलिसी खरीदने से पहले कृपया पॉलिसी शब्द
            (Policy Wording) और नियम व शर्तें ध्यान से पढ़ें। Fincado कोई बीमा
            ब्रोकर नहीं है।
          </p>
        </div>
      </article>
    </>
  );
}

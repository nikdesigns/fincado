import type { Metadata } from 'next';
import Image from 'next/image';
import AdSlot from '@/components/AdSlot';
import WikiText from '@/components/WikiText';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const metadata: Metadata = {
  title:
    'New vs Old Tax Regime: आपके लिए कौन सा टैक्स स्लैब बेहतर है? (हिंदी गाइड)',
  description:
    'जानें कि 2025 में नई और पुरानी टैक्स व्यवस्था में से आपके लिए कौन सी बेहतर है। 80C, HRA छूट, और 7 लाख तक टैक्स-फ्री आय के नियमों को समझें और अपना टैक्स बचाएं।',
  alternates: {
    canonical: 'https://www.fincado.com/hi/guides/new-vs-old-tax-regime',
  },
};

export default function HindiTaxRegimeGuide() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'होम', url: 'https://www.fincado.com/hi' },
          { name: 'गाइड्स', url: 'https://www.fincado.com/hi/guides' },
          {
            name: 'New vs Old Tax Regime',
            url: 'https://www.fincado.com/hi/guides/new-vs-old-tax-regime',
          },
        ]}
      />

      <article className="article">
        <header
          style={{
            marginBottom: 32,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--color-brand-green)',
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            टैक्स प्लानिंग (Tax Planning)
          </div>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 42px)',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            New vs Old Tax Regime: आपके लिए कौन सा टैक्स स्लैब बेहतर है?
          </h1>
          <p
            style={{
              fontSize: 18,
              color: 'var(--color-text-muted)',
              lineHeight: 1.6,
            }}
          >
            नई और पुरानी टैक्स व्यवस्था को समझे बिना सिर्फ “कम टैक्स” के चक्कर
            में चल देना खतरनाक हो सकता है, खासकर अगर आप 80C, HRA जैसी कटौतियाँ
            क्लेम करते हैं। नीचे पूरा आर्टिकल हिंदी ऑडियंस और salaried Indians
            को ध्यान में रखकर लिखा गया है।
          </p>
        </header>

        {/* 🖼️ IMAGE 1: HERO IMAGE (Save as: public/images/guides/hi/tax-regime-hero.webp) */}
        <figure style={{ marginBottom: 32 }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f1f5f9',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/guides/tax/hero-tax-regime.webp"
              alt="New vs Old Tax Regime India Hindi"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </figure>

        {/* AD SLOT 1 */}
        <div className="no-print" style={{ marginBottom: 32 }}>
          <AdSlot id="hi-tax-guide-top" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>New vs Old Tax Regime क्या है?</h2>
          <p>भारत में अभी individual taxpayer के लिए दो तरह की टैक्स व्यवस्था उपलब्ध हैं – <strong>पुरानी टैक्स व्यवस्था (Old Tax Regime)</strong> और <strong>नई टैक्स व्यवस्था (New Tax Regime)</strong>।</p>
          <ul>
            <li><strong>पुरानी व्यवस्था (Old Regime):</strong> इसमें टैक्स स्लैब की दरें थोड़ी ज़्यादा हैं, लेकिन आपको 80C, 80D, HRA, LTA, Home Loan Interest जैसी कई deductions और exemptions मिलती हैं।</li>
            <li><strong>नई व्यवस्था (New Regime):</strong> इसमें टैक्स स्लैब की दरें आमतौर पर कम और सरल हैं, लेकिन ज़्यादातर deductions और exemptions हटा दी गई हैं, केवल कुछ limited benefit जैसे standard deduction आदि की अनुमति होती है।</li>
          </ul>
          <p>नई व्यवस्था आमतौर पर उन लोगों के लिए बेहतर होती है जो ज्यादा savings/investments नहीं करते या जिनके पास HRA, Home Loan आदि जैसे बड़े टैक्स फायदों के विकल्प नहीं हैं, जबकि पुरानी व्यवस्था उन लोगों के लिए फायदेमंद हो सकती है जो 80C, HRA, 80D, home loan interest आदि के ज़रिए अच्छी‑खासी टैक्स बचत निकालते हैं।</p>
        `}
        />

        <hr
          style={{
            margin: '40px 0',
            border: 0,
            borderTop: '1px solid #e2e8f0',
          }}
        />

        <WikiText
          content={`
          <h2>नया और पुराना टैक्स स्लैब: Basic Difference</h2>
          <p>नीचे एक सरल तुलना दी गई है (income tax slab की exact दरें हर साल budget के साथ बदल सकती हैं, इसलिए फाइन प्रिंट के लिए हमेशा income tax department की latest notification देखें):</p>

          <div class="table-container">
            <table class="rate-table">
              <thead>
                <tr>
                  <th>पॉइंट (Point)</th>
                  <th>New Tax Regime</th>
                  <th>Old Tax Regime</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>टैक्स स्लैब</td>
                  <td>ज्यादा granular, कम rate वाली slabs</td>
                  <td>पारंपरिक 5%, 20%, 30% वाली slabs</td>
                </tr>
                <tr>
                  <td>Deductions/Exemptions</td>
                  <td>बहुत सीमित, ज़्यादातर हटाई गई</td>
                  <td>80C, 80D, HRA, LTA, Home Loan interest आदि उपलब्ध</td>
                </tr>
                <tr>
                  <td>Default Status</td>
                  <td>New regime अब default मानी जाती है</td>
                  <td>इसे चुनने के लिए आपको अलग से opt‑in करना पड़ता है</td>
                </tr>
                <tr>
                  <td>किसके लिए बेहतर</td>
                  <td>जिनके पास ज़्यादा deductions नहीं हैं या simple tax चाहिये</td>
                  <td>जिनके पास home loan, HRA, बड़ी 80C/80D investments हैं</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>सरल भाषा में:</strong></p>
          <ul>
            <li>अगर आप ज्यादा निवेश/insurance नहीं करते, किराया नहीं देते या home loan नहीं चल रहा, तो new tax regime ज़्यादातर cases में फायदेमंद साबित होती है।</li>
            <li>अगर आपकी 80C + 80D + HRA + home loan interest जैसी deductions अच्छी मात्रा में हैं, तो पुरानी व्यवस्था से टैक्स बचत ज्यादा हो सकती है।</li>
          </ul>
        `}
        />

        {/* AD SLOT 2 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="hi-tax-guide-slabs-bottom" type="box" />
        </div>

        <WikiText
          content={`
          <h2>80C और HRA की कटौती किसमें मिलेगी?</h2>
          <p>यही सबसे बड़ा practical फर्क है – “new tax regime में 80C मिलेगा?”, “HRA exemption किसमें?” जैसे सवाल यहीं से आते हैं।</p>

          <h3>80C Deduction (PF, PPF, ELSS, LIC आदि)</h3>
          <p>Section 80C के तहत आप सालाना अधिकतम ₹1,50,000 तक की deduction claim कर सकते हैं। सामान्य investments/खर्च जो 80C में आते हैं:</p>
          <ul>
            <li>EPF (Employee Provident Fund)</li>
            <li>PPF (Public Provident Fund)</li>
            <li>ELSS (Tax Saving Mutual Funds)</li>
            <li>Life Insurance Premium (LIC आदि)</li>
            <li>Home Loan का principal repayment</li>
            <li>बच्चों की ट्यूशन फीस</li>
          </ul>

          <p><strong>पुरानी टैक्स व्यवस्था (Old Regime):</strong> 80C पूरी तरह available है, इससे आपकी taxable income कम हो जाती है।</p>
          <p><strong>नई टैक्स व्यवस्था (New Regime):</strong> 80C जैसी deductions आमतौर पर allow नहीं होतीं, इसलिए PF, PPF, ELSS, LIC लेने से भी टैक्स में अलग से benefit नहीं मिलता, बस wealth creation के लिए ही अच्छा रहता है।</p>
        `}
        />

        {/* 🖼️ IMAGE 2: DEDUCTIONS (Save as: public/images/guides/hi/tax-deductions-80c-hra.webp) */}
        <figure style={{ margin: '32px 0' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'auto',
              aspectRatio: '16/9',
              background: '#f1f5f9',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <Image
              src="/images/guides/home-loan/tax-benefits-80c-24b.webp"
              alt="80C and HRA Deductions in Old Tax Regime"
              fill
              style={{ objectFit: 'contain', padding: '16px' }}
            />
          </div>
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: '#64748b',
              marginTop: '8px',
            }}
          >
            पुरानी व्यवस्था में 80C और HRA जैसी कटौतियों से टैक्स काफी कम हो
            सकता है।
          </figcaption>
        </figure>

        <WikiText
          content={`
          <h3>HRA Exemption (House Rent Allowance)</h3>
          <p>House Rent Allowance salaried employees के लिए बहुत बड़ा टैक्स benefit होता है, खासकर metros में रहने वालों के लिए।</p>

          <p><strong>Old Tax Regime:</strong> HRA exemption fully available, इससे taxable income काफी कम हो सकती है।</p>
          <p><strong>New Tax Regime:</strong> HRA exemption normally <strong>नहीं</strong> मिलती। इसका अर्थ: भले ही salary में HRA दिख रहा हो, tax computation में उसे अलग से exempt नहीं माना जाएगा।</p>
        `}
        />

        {/* AD SLOT 3 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="hi-tax-guide-mid-banner" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>7 लाख तक की आय पर टैक्स छूट (Rebate u/s 87A)</h2>
          <p>Rebate under Section 87A छोटे और मध्यम आय वाले taxpayers के लिए बहुत महत्वपूर्ण प्रावधान है।</p>

          <h3>Old Tax Regime में 87A Rebate</h3>
          <p>पुरानी व्यवस्था में rebate आमतौर पर उन individual residents को मिलती है जिनकी <strong>taxable income (सारी deductions के बाद)</strong> निर्धारित सीमा (जैसे ₹5 लाख) से कम है। यदि आपकी आय सीमा से कम है, तो टैक्स liability शून्य हो जाती है।</p>

          <h3>New Tax Regime में 87A Rebate</h3>
          <p>नई टैक्स व्यवस्था में सरकार ने rebate u/s 87A की सीमा को और ज़्यादा attractive बनाया है। यदि आपकी <strong>taxable income</strong> नया regime चुनने पर एक निर्धारित limit (लगभग ₹7 लाख के आसपास) से कम रहती है, तो slab rates से जो tax बनता भी है, वह rebate से null हो सकता है, यानि income tax ज़ीरो हो जाता है।</p>

          <div class="callout-box">
            <strong>Practically क्या समझें?</strong>
            <ul>
              <li>Salary ~₹6–7 लाख, deductions कम → new regime + 87A rebate = ज़्यादातर cases में <strong>zero tax</strong>।</li>
              <li>Salary ~₹6–7 लाख, deductions बहुत ज़्यादा → पुरानी regime में भी 87A rebate के ज़रिए zero tax achieve किया जा सकता है।</li>
            </ul>
          </div>
        `}
        />

        {/* AD SLOT 4 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="hi-tax-guide-rebate-box" type="box" />
        </div>

        <WikiText
          content={`
          <h2>आपके लिए कौन सा Regime बेहतर हो सकता है?</h2>

          <h3>किसे New Tax Regime पर ज्यादा ध्यान देना चाहिए?</h3>
          <ul>
            <li>नई नौकरी, salary अभी मध्यम (लगभग 5–10 लाख) है।</li>
            <li>Parents के साथ रहते हैं, rent नहीं देते (HRA benefit practically नहीं है)।</li>
            <li>अभी PPF, ELSS, Insurance जैसी tax‑saving investments बहुत कम या नहीं करते।</li>
            <li>Documentation, investment proof संभालना नहीं चाहते।</li>
          </ul>
          <p>ऐसे cases में new tax regime अक्सर simple भी है और total tax भी कम हो सकता है।</p>

          <h3>किसे Old Tax Regime ज़्यादातर लाभ दे सकती है?</h3>
          <ul>
            <li>Home loan चल रहा है, और आप Section 24(b) के तहत heavy interest deduction ले रहे हैं।</li>
            <li>Metro में rent पर रहते हैं, and HRA exemption significant amount बनती है।</li>
            <li>हर साल 80C limit (₹1.5 lakh) comfortably भर लेते हैं।</li>
            <li>Health insurance premiums पर 80D में अच्छा deduction claim करते हैं।</li>
          </ul>
          <p>ऐसे profiles में पुरानी व्यवस्था आपकी <strong>effective tax rate</strong> को new regime से भी नीचे ला सकती है।</p>
        `}
        />

        {/* AD SLOT 5 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="hi-tax-guide-mid-content" type="leaderboard" />
        </div>

        <WikiText
          content={`
          <h2>Final Practical Checklist</h2>
          <p>टैक्स भरने से पहले अपने लिए ये 5 सवाल ज़रूर पूछें:</p>
          <ol>
            <li>मेरी सालाना taxable आय कितनी है (सिर्फ CTC नहीं)?</li>
            <li>मैं realistically कितनी 80C/80D/अन्य deductions claim कर सकता हूँ?</li>
            <li>क्या मेरे पास HRA, Home Loan Interest जैसे बड़े टैक्स फायदों वाले components हैं?</li>
            <li>New regime (बिना deductions) vs Old regime (सभी deductions के साथ) – दोनों में actual tax कितना बन रहा है?</li>
            <li>Long‑term wealth creation और investment discipline के लिए कौन‑सा option मेरे behaviour के साथ better fit होता है?</li>
          </ol>
        `}
        />

        {/* AD SLOT 6 */}
        <div className="no-print" style={{ margin: '32px 0' }}>
          <AdSlot id="hi-tax-guide-bottom" type="leaderboard" />
        </div>

        <section
          style={{
            background: '#f0fdf4',
            padding: 24,
            borderRadius: 12,
            border: '1px solid #bbf7d0',
            marginTop: 40,
          }}
        >
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            निष्कर्ष: समझदारी से चुनें
          </h2>
          <p style={{ marginBottom: 16 }}>
            यदि आपकी deductions कम हैं और income mid‑range में है, तो अक्सर{' '}
            <strong>
              नई टैक्स व्यवस्था आपके लिए ज्यादा simple और tax‑efficient
            </strong>{' '}
            हो सकती है।
          </p>
          <p style={{ marginBottom: 16 }}>
            यदि आपकी deductions heavy हैं (80C + HRA + home loan + 80D), तो{' '}
            <strong>
              पुरानी टैक्स व्यवस्था अभी भी ज़्यादा powerful tax‑saving tool
            </strong>{' '}
            साबित हो सकती है।
          </p>
          <p>
            इस तरह आप सिर्फ headline या दूसरों के example देखकर नहीं, बल्कि अपने
            numbers और goals के आधार पर सही टैक्स regime चुन पाएँगे।
          </p>
        </section>
      </article>
    </>
  );
}

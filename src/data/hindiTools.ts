// src/data/hindiTools.ts

export interface HindiTool {
  title: string;
  desc: string;
  href: string;
  icon: string; // Emoji string
}

export interface HindiCategory {
  id: string;
  name: string;
  tools: HindiTool[];
}

export const HINDI_CALCULATOR_CATEGORIES: HindiCategory[] = [
  {
    id: 'loans',
    name: 'लोन और ईएमआई (Loans)',
    tools: [
      {
        title: 'होम लोन EMI',
        desc: 'घर के लोन की किस्त और ब्याज जानें।',
        href: '/hi/loans/home-loan/',
        icon: '🏠',
      },
      {
        title: 'कार लोन EMI',
        desc: 'नई या पुरानी कार लोन की गणना।',
        href: '/hi/loans/car-loan/',
        icon: '🚗',
      },
      {
        title: 'पर्सनल लोन EMI',
        desc: 'शादी या मेडिकल खर्च के लिए लोन।',
        href: '/hi/loans/personal-loan/',
        icon: '💳',
      },
      {
        title: 'एजुकेशन लोन',
        desc: 'पढ़ाई के लोन और मोरेटोरियम की गणना।',
        href: '/hi/loans/education-loan/',
        icon: '🎓',
      },
      {
        title: 'EMI कैलकुलेटर',
        desc: 'किसी भी लोन की साधारण EMI गणना।',
        href: '/hi/emi-calculator/',
        icon: '🔢',
      },
      {
        title: 'EMI प्रीपेमेंट',
        desc: 'आंशिक प्रीपेमेंट से ब्याज और अवधि में बचत देखें।',
        href: '/hi/emi-prepayment-calculator/',
        icon: '📉',
      }
    ],
  },
  {
    id: 'investment',
    name: 'निवेश और बचत (Investment)',
    tools: [
      {
        title: 'SIP कैलकुलेटर',
        desc: 'मासिक निवेश से करोड़पति बनें।',
        href: '/hi/sip-calculator/',
        icon: '📈',
      },
      {
        title: 'ELSS कैलकुलेटर',
        desc: 'टैक्स बचाने वाला म्यूचुअल फंड (80C)।',
        href: '/hi/elss-calculator/',
        icon: '📉',
      },
      {
        title: 'लम्पसम (एकमुश्त)',
        desc: 'एक बार निवेश करने पर रिटर्न।',
        href: '/hi/lumpsum-calculator/',
        icon: '💰',
      },
      {
        title: 'म्यूचुअल फंड',
        desc: 'इक्विटी, डेट और गोल्ड पोर्टफोलियो।',
        href: '/hi/mutual-funds/',
        icon: '📊',
      },
      {
        title: 'PPF कैलकुलेटर',
        desc: 'पब्लिक प्रोविडेंट फंड (टैक्स फ्री)।',
        href: '/hi/ppf-calculator/',
        icon: '🏦',
      },
      {
        title: 'सुकन्या समृद्धि (SSY)',
        desc: 'बेटी के भविष्य के लिए सरकारी योजना।',
        href: '/hi/sukanya-samriddhi/',
        icon: '👧',
      },
      {
        title: 'FD कैलकुलेटर',
        desc: 'फिक्स्ड डिपॉजिट ब्याज की गणना।',
        href: '/hi/fd-calculator/',
        icon: '📜',
      },
      {
        title: 'RD कैलकुलेटर',
        desc: 'रेकरिंग डिपॉजिट (मासिक बचत)।',
        href: '/hi/rd-calculator/',
        icon: '🔄',
      },
      {
        title: 'SWP (पेंशन)',
        desc: 'निवेश से मासिक आय (पेंशन) पाएं।',
        href: '/hi/swp-calculator/',
        icon: '💧',
      },
      {
        title: 'POMIS कैलकुलेटर',
        desc: 'पोस्ट ऑफिस MIS से मासिक आय और मैच्योरिटी जानें।',
        href: '/hi/pomis-calculator/',
        icon: '📮',
      },
      {
        title: 'KVP कैलकुलेटर',
        desc: 'किसान विकास पत्र में पैसा दोगुना होने की समयसीमा ट्रैक करें।',
        href: '/hi/kvp-calculator/',
        icon: '⏱️',
      },
      {
        title: 'NSC कैलकुलेटर',
        desc: 'नेशनल सेविंग्स सर्टिफिकेट रिटर्न और टैक्स बेनिफिट।',
        href: '/hi/nsc-calculator/',
        icon: '📄',
      },
      {
        title: 'CAGR कैलकुलेटर',
        desc: 'निवेश की वार्षिक वृद्धि दर (Compound Annual Growth Rate)।',
        href: '/hi/cagr-calculator/',
        icon: '🎯',
      }
    ],
  },
  {
    id: 'retirement',
    name: 'रिटायरमेंट और पेंशन (Retirement)',
    tools: [
      {
        title: 'NPS कैलकुलेटर', // ✅ ADDED
        desc: 'पेंशन और टैक्स छूट की गणना (80CCD)।',
        href: '/hi/nps-calculator/',
        icon: '🛡️',
      },
      {
        title: 'रिटायरमेंट प्लानर',
        desc: 'जानें रिटायरमेंट के लिए कितना पैसा चाहिए।',
        href: '/hi/retirement-calculator/',
        icon: '👴',
      },
      {
        title: 'EPF कैलकुलेटर',
        desc: 'सैलरी से कटने वाले PF का हिसाब।',
        href: '/hi/epf-calculator/',
        icon: '🏢',
      },
      {
        title: 'अटल पेंशन (APY)',
        desc: 'सरकारी गारंटीड पेंशन योजना।',
        href: '/hi/apy-calculator/',
        icon: '☂️',
      },
      {
        title: 'SCSS कैलकुलेटर',
        desc: 'सीनियर सिटिजन सेविंग्स स्कीम का तिमाही ब्याज और मैच्योरिटी देखें।',
        href: '/hi/scss-calculator/',
        icon: '👴',
      },
      {
        title: 'ग्रेच्युटी (Gratuity)',
        desc: 'नौकरी छोड़ने पर मिलने वाली रकम।',
        href: '/hi/gratuity-calculator/',
        icon: '🎁',
      },
      {
        title: 'FIRE कैलकुलेटर',
        desc: 'जल्दी रिटायर होने का प्लान बनाएं।',
        href: '/hi/fire-calculator/',
        icon: '🔥',
      },
      {
        title: 'गोल प्लानिंग',
        desc: 'अपने सभी वित्तीय लक्ष्यों की योजना बनाएं।',
        href: '/hi/goal-planning-calculator/',
        icon: '🎯',
      }
    ],
  },
  {
    id: 'tax-tools',
    name: 'टैक्स और अन्य टूल्स (Tax & Others)',
    tools: [
      {
        title: 'इनकम टैक्स (New!)',
        desc: 'नई vs पुरानी व्यवस्था की तुलना करें।',
        href: '/hi/income-tax-calculator/',
        icon: '📋',
      },
      {
        title: 'HRA कैलकुलेटर', // ✅ ADDED
        desc: 'किराये पर टैक्स छूट की गणना (HRA)।',
        href: '/hi/hra-calculator/',
        icon: '🏠',
      },
      {
        title: 'सैलरी कैलकुलेटर',
        desc: 'CTC से इन-हैंड सैलरी का अनुमान लगाएं।',
        href: '/hi/salary-calculator/',
        icon: '💼',
      },
      {
        title: 'कैपिटल गेन्स कैलकुलेटर',
        desc: 'शेयर, म्यूचुअल फंड और प्रॉपर्टी पर STCG/LTCG टैक्स निकालें।',
        href: '/hi/capital-gains-calculator/',
        icon: '📊',
      },
      {
        title: 'ब्रोकरेज कैलकुलेटर',
        desc: 'ट्रेडिंग में ब्रोकरेज, GST, STT और नेट P&L देखें।',
        href: '/hi/brokerage-calculator/',
        icon: '📉',
      },
      {
        title: 'रेंट रसीद जनरेटर',
        desc: 'HRA क्लेम के लिए तुरंत वैध रेंट रसीद बनाएं।',
        href: '/hi/rent-receipt-generator/',
        icon: '🧾',
      },
      {
        title: 'महंगाई (Inflation)',
        desc: 'जानें भविष्य में पैसे की कीमत क्या होगी।',
        href: '/hi/inflation-calculator/',
        icon: '📉',
      },
      {
        title: 'क्रेडिट स्कोर',
        desc: 'अपना CIBIL स्कोर चेक और सुधारें।',
        href: '/hi/credit-score/',
        icon: '⭐',
      },
      {
        title: 'GST कैलकुलेटर',
        desc: 'कीमत में टैक्स जोड़ें या हटाएं।',
        href: '/hi/gst-calculator/',
        icon: '🧾',
      },
      {
        title: 'कंपाउंड इंटरेस्ट',
        desc: 'चक्रवृद्धि ब्याज (ब्याज पर ब्याज)।',
        href: '/hi/compound-interest-calculator/',
        icon: '🔄',
      },
      {
        title: 'साधारण ब्याज',
        desc: 'साधारण ब्याज की गणना (Simple Interest)।',
        href: '/hi/simple-interest-calculator/',
        icon: '➗',
      }
    ],
  }
];

export const HINDI_CALCULATOR_COUNT = HINDI_CALCULATOR_CATEGORIES.reduce(
  (total, category) => total + category.tools.length,
  0,
);

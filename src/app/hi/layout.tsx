import type { Metadata } from 'next';
import SkipToContent from '@/components/SkipToContent';

export const metadata: Metadata = {
  title: {
    default: 'Fincado हिंदी - फाइनेंशियल कैलकुलेटर और गाइड्स',
    template: '%s | Fincado हिंदी',
  },
  description:
    'भारत के सर्वश्रेष्ठ फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, होम लोन, PPF, सुकन्या समृद्धि और रिटायरमेंट प्लानिंग टूल्स।',
  other: {
    'content-language': 'hi-IN',
  },
};

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="hi-IN">
      <SkipToContent />
      {children}
    </div>
  );
}

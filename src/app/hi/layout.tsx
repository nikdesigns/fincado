import type { Metadata } from 'next';
import SkipToContent from '@/components/SkipToContent';

export const metadata: Metadata = {
  title: 'Fincado हिंदी – SIP और Loan कैलकुलेटर',
  description:
    'भारत के सर्वश्रेष्ठ फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, और पर्सनल लोन की गणना करें।',
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

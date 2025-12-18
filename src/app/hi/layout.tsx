import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fincado हिंदी – SIP और Loan कैलकुलेटर',
  description:
    'भारत के सर्वश्रेष्ठ फाइनेंशियल कैलकुलेटर हिंदी में। SIP, EMI, और पर्सनल लोन की गणना करें।',
};

export default function HindiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="hi">
      {/* You can add a Hindi-specific notification bar here if needed */}
      {children}
    </div>
  );
}

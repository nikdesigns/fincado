import type { Metadata } from 'next';
import SIPWidgetClient from './SIPWidgetClient';

export const metadata: Metadata = {
  title: 'SIP Calculator Widget',
  description: 'Embeddable SIP calculator widget by Fincado.',
  alternates: {
    canonical: 'https://fincado.com/widgets/sip/',
  },
  openGraph: {
    title: 'SIP Calculator Widget',
    description: 'Embeddable SIP calculator widget by Fincado.',
    url: 'https://fincado.com/widgets/sip/',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function SIPWidgetPage() {
  return <SIPWidgetClient />;
}

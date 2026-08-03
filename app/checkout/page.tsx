import type { Metadata } from 'next';
import { CheckoutView } from './CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Review your MOORTV order and send it to us on WhatsApp. Subscriptions activate in minutes.',
  robots: { index: false, follow: true },
};

export default function CheckoutPage() {
  return <CheckoutView />;
}

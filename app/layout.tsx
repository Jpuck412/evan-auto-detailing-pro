import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Evan's Auto Detailing | Premium Automotive Care",
  description:
    'Premium interior and exterior automotive detailing, paint enhancement, ceramic protection, and maintenance services.',
  keywords: [
    'auto detailing',
    'car detailing',
    'ceramic coating',
    'paint correction',
    'interior detailing',
    'vehicle detailing',
  ],
  openGraph: {
    title: "Evan's Auto Detailing",
    description: 'Precision detailing. Deep gloss. Showroom-level finish.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

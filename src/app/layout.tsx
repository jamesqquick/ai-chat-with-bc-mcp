import { Inter, DM_Serif_Text, Roboto_Mono } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import './globals.css';

const body = Inter({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-family-body',
});

const heading = DM_Serif_Text({
  display: 'swap',
  subsets: ['latin'],
  weight: '400',
  variable: '--font-family-heading',
});

const mono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-family-mono',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${heading.variable} ${mono.variable}`}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </body>
    </html>
  );
}

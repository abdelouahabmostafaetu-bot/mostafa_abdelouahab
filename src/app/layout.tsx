import type { Metadata } from 'next';
import '@/styles/globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Your Name — Mathematics Researcher',
    template: '%s | Your Name',
  },
  description:
    "Personal academic website of Your Name, Master's student in Fundamental Mathematics at the University of Mila, Algeria. Research in dynamical systems, analysis, and topology.",
  keywords: [
    'mathematics',
    'dynamical systems',
    'topology',
    'analysis',
    'University of Mila',
    'Algeria',
    'research',
  ],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Your Name — Mathematics Researcher',
    description:
      "Personal academic website of Your Name, Master's student in Fundamental Mathematics.",
    url: 'https://your-site.vercel.app',
    siteName: 'Your Name',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%231e3a5f'/><text x='50' y='68' font-family='Georgia,serif' font-size='50' font-weight='bold' fill='%23c9a84c' text-anchor='middle'>YN</text></svg>"
          type="image/svg+xml"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

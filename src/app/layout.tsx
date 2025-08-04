import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import WhatsAppButton from '@/components/core/WhatsAppButton';
import { AuthProvider } from '@/context/AuthContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Christif Properties | Premium Homes in Enugu State',
  description:
    'Find verified properties for rent in Enugu, Nigeria. Browse apartments, houses, and commercial spaces with Christif Properties. Your trusted real estate partner.',
  keywords: 'real estate enugu, property for rent enugu, houses in enugu, christif properties, nigerian real estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-body text-charcoal-black antialiased',
          poppins.variable,
          inter.variable
        )}
      >
        <AuthProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

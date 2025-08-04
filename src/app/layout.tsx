
"use client";

import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import WhatsAppButton from '@/components/core/WhatsAppButton';
import { AuthProvider } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Since we are using a client component, we cannot export metadata directly.
// This can be placed in a separate file or handled in page components.
// export const metadata: Metadata = {
//   title: 'Christif Properties | Premium Homes in Enugu State',
//   description:
//     'Find verified properties for rent in Enugu, Nigeria. Browse apartments, houses, and commercial spaces with Christif Properties. Your trusted real estate partner.',
//   keywords: 'real estate enugu, property for rent enugu, houses in enugu, christif properties, nigerian real estate',
// };

function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin') || pathname === '/login';

  return (
    <div className="relative flex min-h-dvh flex-col bg-background">
      {!isAdminPage && <Header />}
      <main className="flex-1">{children}</main>
      {!isAdminPage && <Footer />}
      {!isAdminPage && <WhatsAppButton />}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
          <title>Christif Properties | Premium Homes in Enugu State</title>
          <meta name="description" content="Find verified properties for rent in Enugu, Nigeria. Browse apartments, houses, and commercial spaces with Christif Properties. Your trusted real estate partner." />
          <meta name="keywords" content="real estate enugu, property for rent enugu, houses in enugu, christif properties, nigerian real estate" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body text-charcoal-black antialiased',
          poppins.variable,
          inter.variable
        )}
      >
        <AuthProvider>
          <AppLayout>{children}</AppLayout>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

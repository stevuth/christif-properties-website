
"use client";

import Link from 'next/link';
import { Home, Menu, Building2, Phone, User as UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/#listings', label: 'Properties' },
  { href: '/about', label: 'About Us' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Building2 className="h-8 w-8 text-navy-blue" />
          <span className="font-headline text-2xl font-bold text-navy-blue">
            Christif Properties
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-lg font-medium text-warm-gray transition-colors hover:text-navy-blue",
                pathname === link.href && "text-navy-blue font-semibold"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && (
             <Link
              href="/admin"
              className={cn(
                "text-lg font-medium text-warm-gray transition-colors hover:text-navy-blue",
                pathname === '/admin' && "text-navy-blue font-semibold"
              )}
            >
              Admin
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-2">
           <a href="tel:+2348022262178" className="hidden sm:inline-flex">
            <Button variant="outline" className="border-golden-sand text-golden-sand hover:bg-golden-sand/10 hover:text-golden-sand">
                <Phone className="mr-2 h-4 w-4" />
                Call Us
            </Button>
          </a>
          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="mt-8 flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "text-xl font-medium text-warm-gray transition-colors hover:text-navy-blue",
                         pathname === link.href && "text-navy-blue font-semibold"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                   {user && (
                      <Link
                        href="/admin"
                        onClick={() => setSheetOpen(false)}
                        className={cn(
                            "text-xl font-medium text-warm-gray transition-colors hover:text-navy-blue",
                            pathname === '/admin' && "text-navy-blue font-semibold"
                        )}
                        >
                        Admin
                        </Link>
                    )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

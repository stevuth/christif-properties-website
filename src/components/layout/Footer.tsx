import Link from "next/link";
import { MessageSquare } from "lucide-react";

const footerLinks = [
    { href: '/', label: 'Properties' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-navy-blue text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-10 text-center md:grid-cols-4 md:gap-8 md:text-left">
          
          {/* About Section */}
          <div className="md:col-span-1">
            <h2 className="font-headline text-2xl font-bold">Christif Properties</h2>
            <p className="mt-4 text-gray-300">
              Your trusted partner for premium homes in Enugu.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-gray-300 transition-colors hover:text-golden-sand">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-gray-300">
              <li>No 2 Ukwuru Close, Trans Ekulu Enugu</li>
              <li>+234 802 226 2178</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-headline text-lg font-semibold">Connect With Us</h3>
            <div className="mt-4 flex justify-center gap-4 md:justify-start">
              <Link href="https://wa.me/2348022262178" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex items-center gap-2 text-gray-300 transition-colors hover:text-golden-sand">
                <MessageSquare className="h-6 w-6" />
                <span>WhatsApp</span>
              </Link>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Christif Properties. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

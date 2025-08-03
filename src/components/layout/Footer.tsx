import Link from "next/link";
import { MessageSquare } from "lucide-react";

const footerLinks = [
    { href: '/', label: 'Properties' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/terms', label: 'Terms of Service' },
];

export default function Footer() {
  return (
    <footer className="w-full bg-navy-blue text-white">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-1">
                 <h2 className="font-headline text-2xl font-bold">Christif Properties</h2>
                 <p className="mt-2 text-gray-300">Your trusted partner for premium homes in Enugu.</p>
                 <div className="mt-4">
                    <p className="font-semibold">Business Hours:</p>
                    <p className="text-sm text-gray-400">Mon-Fri: 9am - 6pm</p>
                 </div>
            </div>
            <div className="md:col-span-3">
                 <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
                    <div>
                        <h3 className="font-headline font-semibold">Quick Links</h3>
                        <ul className="mt-4 space-y-2">
                            {footerLinks.map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-gray-300 hover:text-golden-sand transition-colors">
                                      {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-headline font-semibold">Contact Us</h3>
                        <ul className="mt-4 space-y-2 text-gray-300">
                           <li>contact@christifproperties.com</li>
                           <li>+234 802 226 2178</li>
                        </ul>
                     </div>
                      <div>
                        <h3 className="font-headline font-semibold">Connect</h3>
                        <a href="https://wa.me/2348022262178" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-gray-300 hover:text-golden-sand transition-colors">
                            <MessageSquare className="h-5 w-5"/>
                            WhatsApp
                        </a>
                      </div>
                 </div>
            </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Christif Properties. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

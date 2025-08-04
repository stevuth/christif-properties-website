
import { Phone, MessageSquare, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div className="bg-background text-charcoal-black">
      <section className="relative h-[40vh] w-full">
        <Image
          src="https://picsum.photos/seed/contact-hero/1920/800"
          alt="Contact us background"
          data-ai-hint="office building nigeria"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-blue/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            Get In Touch
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            We&apos;re here to help you with all your property needs in Enugu.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-navy-blue">
              Contact Information
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-warm-gray">
              Reach out to us through any of the channels below. We are available
              to assist you during our business hours.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            
            <div className="space-y-8">
              <h3 className="font-headline text-3xl font-semibold text-navy-blue">Our Office</h3>
               <div className="flex items-start gap-4 text-lg">
                <div className="flex-shrink-0 pt-1">
                  <MapPin className="h-6 w-6 text-golden-sand" />
                </div>
                <span>
                  No 2 Ukwuru Close, Trans Ekulu Enugu, Enugu State, Nigeria
                </span>
              </div>
               <a
                href="tel:+2348022262178"
                className="flex items-center gap-4 text-lg transition-colors hover:text-golden-sand"
              >
                <Phone className="h-6 w-6 text-golden-sand" />
                <span>+234 802 226 2178</span>
              </a>
              <a
                href="https://wa.me/2348022262178"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-lg transition-colors hover:text-golden-sand"
              >
                <MessageSquare className="h-6 w-6 text-golden-sand" />
                <span>Chat with us on WhatsApp</span>
              </a>
            </div>

            <div className="rounded-lg bg-off-white p-8">
              <h3 className="font-headline text-3xl font-semibold text-navy-blue">
                 <Clock className="inline-block h-7 w-7 mr-2" />
                 Business Hours
              </h3>
              <ul className="mt-6 space-y-4 text-lg text-warm-gray">
                <li className="flex justify-between flex-nowrap">
                  <span className="whitespace-nowrap">Monday - Friday</span>
                  <span className="font-medium text-charcoal-black text-right pl-4 whitespace-nowrap">8:00 AM - 6:00 PM</span>
                </li>
                 <li className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-charcoal-black">10:00 AM - 4:00 PM</span>
                </li>
                 <li className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-charcoal-black">Closed</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

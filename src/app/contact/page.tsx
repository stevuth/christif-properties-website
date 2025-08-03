import { Phone, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import ContactForm from '@/components/core/ContactForm';

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
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-8">
              <h2 className="font-headline text-4xl font-bold text-navy-blue">
                Contact Information
              </h2>
              <p className="text-lg text-warm-gray">
                Reach out to us via phone, WhatsApp, or email. We are available
                to assist you during our business hours.
              </p>
              <div className="space-y-6">
                <a
                  href="tel:+2348022262178"
                  className="flex items-center gap-4 text-lg transition-colors hover:text-golden-sand"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-golden-sand/10 text-golden-sand">
                    <Phone className="h-6 w-6" />
                  </div>
                  <span>+234 802 226 2178</span>
                </a>
                <a
                  href="https://wa.me/2348022262178"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-lg transition-colors hover:text-golden-sand"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-golden-sand/10 text-golden-sand">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href="mailto:contact@christifproperties.com"
                  className="flex items-center gap-4 text-lg transition-colors hover:text-golden-sand"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-golden-sand/10 text-golden-sand">
                    <Mail className="h-6 w-6" />
                  </div>
                  <span>contact@christifproperties.com</span>
                </a>
              </div>
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-xl font-semibold text-navy-blue">
                  Business Hours
                </h3>
                <p className="mt-2 text-warm-gray">
                  Monday - Friday: 9:00 AM - 6:00 PM
                </p>
                <p className="text-warm-gray">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="text-warm-gray">Sunday: Closed</p>
              </div>
            </div>
            <div className="rounded-lg bg-off-white p-8">
              <h2 className="font-headline text-3xl font-bold text-navy-blue">
                Send Us a Message
              </h2>
              <p className="mt-2 mb-6 text-warm-gray">
                Have a question? Fill out the form and we&apos;ll get back to
                you.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

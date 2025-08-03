import { Building2, Goal, Handshake } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-background text-charcoal-black">
      <section className="relative h-[40vh] w-full">
        <Image
          src="https://placehold.co/1920x800.png"
          alt="Modern building in Enugu"
          data-ai-hint="modern architecture nigeria"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-navy-blue/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            About Christif Properties
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Helping you find verified homes in Enugu and beyond.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-6 text-lg text-warm-gray">
              <h2 className="font-headline text-4xl font-bold text-navy-blue">
                Our Vision
              </h2>
              <p>
                Christif Properties was founded with a clear vision: to simplify
                the process of finding and renting verified, quality homes for
                Nigerians, with a special focus on the vibrant communities of
                Enugu State. We believe that everyone deserves a safe and
                comfortable place to call home, and we are passionate about
                making that a reality.
              </p>
              <p>
                Our platform is more than just a listing service; it&apos;s a
                commitment to trust, integrity, and deep local market knowledge.
                We strive to build lasting relationships with both property
                owners and tenants, ensuring a seamless and positive experience
                for all parties involved.
              </p>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="Enugu cityscape"
                data-ai-hint="enugu cityscape"
                width={600}
                height={400}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-off-white py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-navy-blue">
              Why Choose Us?
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-warm-gray">
              We are dedicated to providing an unparalleled real estate
              experience in Enugu. Here’s what sets us apart.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-golden-sand text-white">
                <Handshake className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-2xl font-semibold text-navy-blue">
                Trust & Integrity
              </h3>
              <p className="text-warm-gray">
                Every property on our platform is carefully verified to ensure
                it meets our high standards of quality and safety.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-golden-sand text-white">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-2xl font-semibold text-navy-blue">
                Local Expertise
              </h3>
              <p className="text-warm-gray">
                Our deep-rooted knowledge of the Enugu real estate market means
                we can offer you the best properties in the most desirable
                locations.
              </p>
            </div>
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-golden-sand text-white">
                <Goal className="h-8 w-8" />
              </div>
              <h3 className="font-headline text-2xl font-semibold text-navy-blue">
                Client-Focused
              </h3>
              <p className="text-warm-gray">
                Your needs are our priority. We are here to guide you through
                every step of your property journey, from search to signing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-headline text-4xl font-bold text-navy-blue">
            Ready to Find Your Home?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-warm-gray">
            Let us help you find the perfect property in Enugu. Browse our
            listings or get in touch with our team today.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="rounded-md bg-navy-blue px-8 py-3 font-semibold text-white transition-colors hover:bg-navy-blue/90"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="rounded-md bg-golden-sand px-8 py-3 font-semibold text-navy-blue transition-colors hover:bg-golden-sand/90"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


"use client"
import PropertyListings from '@/components/properties/PropertyListings';
import { getProperties } from '@/lib/properties';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProps = async () => {
      setLoading(true);
      const props = await getProperties();
      setProperties(props);
      setLoading(false);
    };
    fetchProps();
  }, []);


  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] w-full md:h-[80vh]">
        <Image
          src="https://picsum.photos/seed/hero/1920/1080"
          alt="Luxury home in Enugu"
          data-ai-hint="luxury nigerian home"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy-blue/60" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">
            Christif Properties
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Premium Homes Across Enugu State
          </p>
          <p className="mt-2 max-w-2xl text-lg md:text-xl">
            Your trusted partner in finding the perfect verified rental property.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#listings"
              className="rounded-md bg-golden-sand px-8 py-3 font-headline text-lg font-semibold text-navy-blue transition-transform hover:scale-105"
            >
              Explore Properties
            </Link>
            <Link
              href="https://wa.me/2348022262178"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-white bg-transparent px-8 py-3 font-headline text-lg font-semibold text-white transition-colors hover:bg-white hover:text-navy-blue"
            >
              List Your Property
            </Link>
          </div>
        </div>
      </section>

       {loading ? (
        <section className="w-full bg-off-white py-16 md:py-24">
            <div className="container mx-auto max-w-7xl px-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <Skeleton className="h-[450px] w-full" />
                    <Skeleton className="h-[450px] w-full" />
                    <Skeleton className="h-[450px] w-full" />
                </div>
            </div>
        </section>
        ) : (
          <PropertyListings properties={properties} />
        )}
    </div>
  );
}

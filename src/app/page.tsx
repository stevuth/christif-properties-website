
import PropertyListings from '@/components/properties/PropertyListings';
import { getProperties } from '@/lib/properties';
import Image from 'next/image';
import Link from 'next/link';
import PropertyCard from '@/components/properties/PropertyCard';

export default function Home() {
  const properties = getProperties();
  const curatedProperties = properties.slice(0, 3);

  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] w-full md:h-[80vh]">
        <Image
          src="https://placehold.co/1920x1080"
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
          <Link
            href="#listings"
            className="mt-8 rounded-md bg-golden-sand px-8 py-3 font-headline text-lg font-semibold text-navy-blue transition-transform hover:scale-105"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      <section
        id="curated-collection"
        className="w-full bg-background py-16 md:py-24"
      >
        <div className="container mx-auto max-w-7xl px-4">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold text-navy-blue">
              Curated Collection
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-warm-gray">
              Handpicked properties available for rent in prime locations across
              Enugu.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {curatedProperties.map((property) => (
               <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      <section id="browse-by-category" className="w-full py-16 md:py-24">
         <div className="container mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-1">
                 <Link href="/?type=For+Rent" className="group relative block h-64 overflow-hidden rounded-lg">
                     <Image src="https://placehold.co/1200x400" alt="Properties for rent" fill className="object-cover transition-transform duration-500 group-hover:scale-110" data-ai-hint="apartment building exterior" />
                     <div className="absolute inset-0 bg-black/50"></div>
                     <div className="relative flex h-full items-center justify-center">
                         <h3 className="font-headline text-4xl font-bold text-white">For Rent</h3>
                     </div>
                 </Link>
            </div>
         </div>
      </section>

      <PropertyListings properties={properties} />
    </div>
  );
}

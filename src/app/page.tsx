import PropertyListings from '@/components/properties/PropertyListings';
import { getProperties } from '@/lib/properties';
import Image from 'next/image';

export default function Home() {
  const properties = getProperties();

  return (
    <div className="flex flex-col">
      <section className="relative h-[50vh] w-full">
        <Image
          src="https://placehold.co/1920x1080"
          alt="Luxury home with a pool"
          data-ai-hint="modern house exterior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="font-headline text-5xl font-bold md:text-7xl">Terra Abode</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">Your foundation for the future. Discover your dream home with us.</p>
        </div>
      </section>
      
      <PropertyListings properties={properties} />
    </div>
  );
}

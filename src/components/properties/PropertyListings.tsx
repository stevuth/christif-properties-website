"use client";

import type { Property } from '@/lib/types';
import { useMemo } from 'react';
import PropertyCard from './PropertyCard';

type PropertyListingsProps = {
  properties: Property[];
};

export default function PropertyListings({ properties }: PropertyListingsProps) {
  const filteredProperties = useMemo(() => {
    return properties.filter((p) => p.listingStatus === 'For Rent');
  }, [properties]);

  return (
    <section id="listings" className="w-full bg-off-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
            <h2 className="font-headline text-4xl font-bold text-navy-blue">Available Properties</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-warm-gray">
              Explore our comprehensive list of available properties for rent.
            </p>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="col-span-full mt-12 text-center">
            <h3 className="text-2xl font-semibold text-navy-blue">No Properties Found</h3>
            <p className="text-warm-gray">Please check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}

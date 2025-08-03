"use client";

import type { Property } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, Bath, Armchair } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="group block">
      <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-300 hover:shadow-xl flex flex-col h-full">
        <Link href={`/property/${property.id}`}>
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              data-ai-hint="house exterior"
            />
          </div>
        </Link>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="truncate font-headline text-xl font-bold text-navy-blue">
             <Link href={`/property/${property.id}`}>{property.title}</Link>
          </h3>
          <p className="truncate text-warm-gray">{property.location.area}, {property.location.city}</p>
          <p className="mt-2 font-headline text-2xl font-bold text-golden-sand">
            ₦{property.price.toLocaleString()}<span className="text-base font-normal text-warm-gray">/year</span>
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-100 pt-3 text-warm-gray">
            <div className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-navy-blue/70" />
              <span>{property.features.bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-navy-blue/70" />
              <span>{property.features.bathrooms} Baths</span>
            </div>
             <div className="flex items-center gap-2">
              <Armchair className="h-5 w-5 text-navy-blue/70" />
              <span>{property.features.toilets} Toilets</span>
            </div>
          </div>
          <div className="mt-auto pt-4">
            <Link href={`/property/${property.id}`} className="w-full">
                <Button className="w-full bg-navy-blue text-white hover:bg-navy-blue/90">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

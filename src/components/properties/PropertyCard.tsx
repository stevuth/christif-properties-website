"use client";

import type { Property } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BedDouble, Bath, SquareGanttChart } from 'lucide-react';
import FavoritesButton from './FavoritesButton';

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`} className="group block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-primary/50">
        <CardHeader className="relative p-0">
          <div className="aspect-video overflow-hidden">
            <Image
              src={property.images[0]}
              alt={property.title}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="house exterior"
            />
          </div>
          <FavoritesButton propertyId={property.id} />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="mb-2 font-headline text-2xl">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 0,
            }).format(property.price)}
          </CardTitle>
          <h3 className="text-lg font-semibold text-foreground truncate">{property.title}</h3>
          <p className="text-muted-foreground truncate">{property.address}, {property.city}, {property.state}</p>
          <div className="mt-4 flex items-center justify-start gap-4 border-t pt-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <BedDouble className="h-5 w-5 text-secondary" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5 text-secondary" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center gap-2">
              <SquareGanttChart className="h-5 w-5 text-secondary" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

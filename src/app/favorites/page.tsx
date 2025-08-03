"use client";

import { useFavorites } from '@/hooks/useFavorites';
import { getProperties } from '@/lib/properties';
import PropertyCard from '@/components/properties/PropertyCard';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const [isClient, setIsClient] = useState(false);
  const allProperties = getProperties();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const favoriteProperties: Property[] = isClient
    ? allProperties.filter((p) => favorites.includes(p.id))
    : [];

  return (
    <div className="container mx-auto max-w-7xl py-12">
      <h1 className="mb-8 font-headline text-4xl font-bold">Your Favorite Properties</h1>
      {isClient && favoriteProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favoriteProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <Heart className="h-24 w-24 text-muted-foreground/50" />
          <h2 className="mt-6 text-2xl font-semibold">No Favorites Yet</h2>
          <p className="mt-2 text-muted-foreground">
            Click the heart icon on any property to save it here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Browse Listings</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

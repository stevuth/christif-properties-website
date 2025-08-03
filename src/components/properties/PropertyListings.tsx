"use client";

import type { Property } from '@/lib/types';
import { useState, useMemo, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSearchParams } from 'next/navigation';

type PropertyListingsProps = {
  properties: Property[];
};

export default function PropertyListings({ properties }: PropertyListingsProps) {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState(searchParams.get('type') || 'all');
  const [sortBy, setSortBy] = useState('price-asc');
  
  useEffect(() => {
    const type = searchParams.get('type');
    if (type) {
      setPropertyType(type);
    }
  }, [searchParams]);

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        const searchLower = searchQuery.toLowerCase();
        const locationMatch = `${p.location.area} ${p.location.city} ${p.location.state}`.toLowerCase().includes(searchLower);
        const titleMatch = p.title.toLowerCase().includes(searchLower);
        const typeMatch = propertyType === 'all' || p.type === propertyType;
        const statusMatch = p.listingStatus === 'For Rent';

        return (locationMatch || titleMatch) && typeMatch && statusMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'size-desc': return b.features.sizeSqm - a.features.sizeSqm;
          default: return 0;
        }
      });
  }, [properties, searchQuery, propertyType, sortBy]);

  const propertyTypes = ['all', ...Array.from(new Set(properties.map(p => p.type)))];

  return (
    <section id="listings" className="w-full bg-off-white py-16 md:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="mb-8 text-center">
            <h2 className="font-headline text-4xl font-bold text-navy-blue">Available Properties</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-warm-gray">
              Explore our comprehensive list of available properties for rent. Use the filters to find your perfect home.
            </p>
        </div>

        <div className="mb-8 rounded-lg bg-white p-4 shadow">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-3 lg:col-span-2">
              <Input
                type="text"
                placeholder="Search by location or property title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 text-base"
              />
            </div>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="h-12 text-base"><SelectValue placeholder="Property Type" /></SelectTrigger>
              <SelectContent>
                {propertyTypes.map(type => (
                  <SelectItem key={type} value={type}>{type === 'all' ? 'All Types' : type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sort-by" className="h-12 text-base">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="size-desc">Size: Largest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="col-span-full mt-12 text-center">
            <h3 className="text-2xl font-semibold text-navy-blue">No Properties Found</h3>
            <p className="text-warm-gray">Try adjusting your search filters or check back later.</p>
          </div>
        )}
      </div>
    </section>
  );
}

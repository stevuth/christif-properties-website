"use client";

import type { Property } from '@/lib/types';
import { useState, useMemo, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import AiSuggestionTool from '../ai/AiSuggestionTool';

type PropertyListingsProps = {
  properties: Property[];
};

export default function PropertyListings({ properties }: PropertyListingsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  
  // For AI suggestions
  const [browsingHistory, setBrowsingHistory] = useState<string[]>([]);

  useEffect(() => {
    // Simulate browsing history by picking some property titles
    const randomHistory = [...properties].sort(() => 0.5 - Math.random()).slice(0, 3).map(p => p.title);
    setBrowsingHistory(randomHistory);
  }, [properties]);

  const filteredProperties = useMemo(() => {
    return properties
      .filter((p) => {
        const searchLower = searchQuery.toLowerCase();
        const titleMatch = p.title.toLowerCase().includes(searchLower);
        const addressMatch = p.address.toLowerCase().includes(searchLower);
        const cityMatch = p.city.toLowerCase().includes(searchLower);
        const typeMatch = propertyType === 'all' || p.type === propertyType;
        const minPriceMatch = minPrice === '' || p.price >= Number(minPrice);
        const maxPriceMatch = maxPrice === '' || p.price <= Number(maxPrice);
        return (titleMatch || addressMatch || cityMatch) && typeMatch && minPriceMatch && maxPriceMatch;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'sqft-desc': return b.sqft - a.sqft;
          default: return 0;
        }
      });
  }, [properties, searchQuery, propertyType, minPrice, maxPrice, sortBy]);

  const propertyTypes = ['all', ...Array.from(new Set(properties.map(p => p.type)))];

  const currentSearchCriteria = `Location: ${searchQuery || 'any'}, Type: ${propertyType}, Price: ${minPrice}-${maxPrice}`;

  return (
    <section id="listings" className="w-full bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8 rounded-lg border bg-card p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            <div className="lg:col-span-2 xl:col-span-2">
              <Input
                type="text"
                placeholder="Search by city, address, or title..."
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
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" placeholder="Min Price" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="h-12 text-base" />
              <Input type="number" placeholder="Max Price" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="h-12 text-base" />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:col-span-2 lg:col-span-4 xl:col-span-1">
              <AiSuggestionTool
                  currentSearchCriteria={currentSearchCriteria}
                  browsingHistory={browsingHistory.join(', ')}
              />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-end">
             <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-medium text-muted-foreground">Sort by:</label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort-by" className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="sqft-desc">Size: Largest First</SelectItem>
                  </SelectContent>
                </Select>
             </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="col-span-full mt-12 text-center">
            <h3 className="text-2xl font-semibold">No Properties Found</h3>
            <p className="text-muted-foreground">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </section>
  );
}

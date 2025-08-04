
"use client";

import { getPropertyById } from '@/lib/properties';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { BedDouble, Bath, Car, SquareGanttChart, Building, CheckCircle, User, Mail, Phone, Calendar, Armchair, MessageSquare } from 'lucide-react';
import PropertyGallery from '@/components/properties/PropertyGallery';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Property } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


type PropertyPageProps = {};

export default function PropertyPage({}: PropertyPageProps) {
  const params = useParams();
  const propertyId = params.id as string;
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchProperty = async () => {
          setLoading(true);
          const prop = await getPropertyById(propertyId);
          if (prop) {
              setProperty(prop);
          } else {
              notFound();
          }
          setLoading(false);
      };
      if (propertyId) {
          fetchProperty();
      }
  }, [propertyId]);

  if (loading) {
    return (
        <div className="bg-background py-12 md:py-16">
            <div className="container mx-auto max-w-7xl px-4">
                <Skeleton className="h-12 w-3/4 mb-4" />
                <Skeleton className="h-8 w-1/2 mb-8" />
                <Skeleton className="aspect-video w-full mb-12" />
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-8">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                    <div className="lg:col-span-1">
                        <Skeleton className="h-64 w-full" />
                    </div>
                </div>
            </div>
        </div>
    )
  }

  if (!property) {
    return notFound();
  }

  const features = [
    { icon: BedDouble, label: 'Bedrooms', value: property.features.bedrooms },
    { icon: Bath, label: 'Bathrooms', value: property.features.bathrooms },
    { icon: Armchair, label: 'Toilets', value: property.features.toilets },
    { icon: Car, label: 'Parking', value: property.features.parking },
    { icon: SquareGanttChart, label: 'Size', value: `${property.features.sizeSqm} sqm` },
    { icon: Building, label: 'Type', value: property.type },
  ];
  
  const whatsappNumber = property.agent.phone.replace(/\+/g, '');

  return (
    <div className="bg-background py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4">
        
        <div className="mb-8">
            <h1 className="font-headline text-3xl font-bold text-navy-blue md:text-5xl">{property.title}</h1>
            <p className="mt-2 text-base text-warm-gray md:text-lg">{property.location.area}, {property.location.city}, {property.location.state}</p>
        </div>

        <PropertyGallery images={property.images} title={property.title} />

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="space-y-8">
              <div>
                <h2 className="font-headline text-2xl font-semibold text-navy-blue md:text-3xl">Property Description</h2>
                <p className="mt-4 text-base leading-relaxed text-warm-gray md:text-lg">{property.description}</p>
              </div>
              
              <div className="mt-8">
                 <h2 className="font-headline text-2xl font-semibold text-navy-blue md:text-3xl">Property Features</h2>
                 <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3">
                   {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                         <feature.icon className="h-6 w-6 text-golden-sand md:h-7 md:w-7" />
                         <div>
                            <p className="font-semibold text-charcoal-black text-sm md:text-base">{feature.label}</p>
                            <p className="text-warm-gray text-sm md:text-base">{feature.value}</p>
                         </div>
                      </div>
                   ))}
                 </div>
              </div>

              <div className="mt-8">
                <h2 className="font-headline text-2xl font-semibold text-navy-blue md:text-3xl">Amenities</h2>
                <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-3 text-base text-warm-gray md:text-lg">
                      <CheckCircle className="h-5 w-5 text-golden-sand md:h-6 md:w-6" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg bg-off-white p-6">
                <p className="font-headline text-3xl font-bold text-navy-blue md:text-4xl">₦{property.price.toLocaleString()}<span className="text-base font-normal text-warm-gray md:text-lg">/year</span></p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button asChild className="w-full bg-navy-blue text-white hover:bg-navy-blue/90 h-12 text-base font-semibold">
                       <Link href="/contact">Schedule Inspection</Link>
                    </Button>
                     <Button asChild className="w-full bg-green-600 text-white hover:bg-green-700 h-12 text-base font-semibold">
                       <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                          <MessageSquare className="mr-2" />
                          Contact Agent
                       </a>
                    </Button>
                </div>
                <div id="contact-agent" className="mt-8">
                   <div className="flex items-center gap-4">
                        <Image src={property.agent.avatar} alt={property.agent.name} width={60} height={60} className="rounded-full" data-ai-hint="person portrait" />
                        <div>
                            <p className="text-sm text-warm-gray">{property.agent.agency}</p>
                        </div>
                    </div>
                    <div className="mt-4 space-y-2 border-t pt-4">
                      <a href={`tel:${property.agent.phone}`} className="flex items-center gap-3 text-warm-gray hover:text-navy-blue">
                        <Phone className="h-5 w-5" />
                        <span>{property.agent.phone}</span>
                      </a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

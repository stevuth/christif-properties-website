import { getPropertyById } from '@/lib/properties';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { BedDouble, Bath, SquareGanttChart, Building, CheckCircle, User, Mail, Phone } from 'lucide-react';
import PropertyGallery from '@/components/properties/PropertyGallery';
import AgentContactForm from '@/components/properties/AgentContactForm';
import { Card, CardContent } from '@/components/ui/card';
import FavoritesButton from '@/components/properties/FavoritesButton';

type PropertyPageProps = {
  params: {
    id: string;
  };
};

export default function PropertyPage({ params }: PropertyPageProps) {
  const propertyId = Number(params.id);
  if (isNaN(propertyId)) {
    notFound();
  }
  
  const property = getPropertyById(propertyId);

  if (!property) {
    notFound();
  }

  return (
    <div className="bg-background">
      <div className="container mx-auto max-w-7xl py-12">
        <div className="relative mb-8">
            <h1 className="font-headline text-4xl font-bold">{property.title}</h1>
            <p className="text-lg text-muted-foreground">{property.address}, {property.city}, {property.state}</p>
            <div className="absolute top-0 right-0">
                <FavoritesButton propertyId={property.id} />
            </div>
        </div>

        <PropertyGallery images={property.images} title={property.title} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="font-headline text-3xl font-semibold border-b pb-4">Property Details</h2>
                <div className="my-6 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-primary text-3xl">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                      }).format(property.price)}
                    </span>
                  </div>
                </div>
                <div className="my-6 flex flex-wrap items-center gap-x-8 gap-y-4 text-muted-foreground">
                    <div className="flex items-center gap-2" title="Property Type"><Building className="h-5 w-5 text-secondary" /><span>{property.type}</span></div>
                    <div className="flex items-center gap-2" title="Bedrooms"><BedDouble className="h-5 w-5 text-secondary" /><span>{property.beds} Beds</span></div>
                    <div className="flex items-center gap-2" title="Bathrooms"><Bath className="h-5 w-5 text-secondary" /><span>{property.baths} Baths</span></div>
                    <div className="flex items-center gap-2" title="Area"><SquareGanttChart className="h-5 w-5 text-secondary" /><span>{property.sqft} sqft</span></div>
                </div>
                <p className="text-lg leading-relaxed">{property.description}</p>
              </CardContent>
            </Card>

            <Card className="mt-8">
              <CardContent className="p-6">
                <h2 className="font-headline text-3xl font-semibold border-b pb-4 mb-6">Amenities</h2>
                <ul className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {property.amenities.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-secondary" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
                <CardContent className="p-6">
                    <h2 className="font-headline text-3xl font-semibold mb-4">Contact Agent</h2>
                    <div className="flex items-center gap-4 mb-6 border-b pb-6">
                        <Image src={property.agent.avatar} alt={property.agent.name} width={80} height={80} className="rounded-full" data-ai-hint="person portrait" />
                        <div>
                            <h3 className="font-bold text-xl">{property.agent.name}</h3>
                            <div className="text-muted-foreground flex items-center gap-2 mt-1"><Mail className="h-4 w-4" /><span>{property.agent.email}</span></div>
                            <div className="text-muted-foreground flex items-center gap-2 mt-1"><Phone className="h-4 w-4" /><span>{property.agent.phone}</span></div>
                        </div>
                    </div>
                    <AgentContactForm agentEmail={property.agent.email} propertyTitle={property.title}/>
                </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

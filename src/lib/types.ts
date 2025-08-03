export type Property = {
  id: string;
  title: string;
  price: number;
  location: {
    address: string;
    area: string;
    city: string;
    state: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    toilets: number;
    parking: number;
    sizeSqm: number;
    yearBuilt?: number;
  };
  type: 'Duplex' | 'Bungalow' | 'Apartment' | 'Detached House' | 'Commercial';
  listingStatus: 'For Rent';
  description: string;
  images: string[];
  amenities: string[];
  agent: {
    name: string;
    agency: string;
    phone: string;
    email: string;
    avatar: string;
  };
};

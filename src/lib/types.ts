export type Property = {
  id: number;
  title: string;
  price: number;
  address: string;
  city: string;
  state: string;
  zip: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  type: 'House' | 'Apartment' | 'Condo' | 'Townhouse';
  images: string[];
  amenities: string[];
  agent: {
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
};


"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import type { Property } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  location: z.object({
    address: z.string().min(5, 'Address is required.'),
    area: z.string().min(2, 'Area is required.'),
    city: z.string().min(2, 'City is required.'),
    state: z.string().min(2, 'State is required.'),
  }),
  features: z.object({
    bedrooms: z.coerce.number().int().min(0),
    bathrooms: z.coerce.number().int().min(0),
    toilets: z.coerce.number().int().min(0),
    parking: z.coerce.number().int().min(0),
    sizeSqm: z.coerce.number().min(0),
    yearBuilt: z.coerce.number().int().optional(),
  }),
  type: z.enum(['Duplex', 'Bungalow', 'Apartment', 'Detached House', 'Commercial']),
  description: z.string().min(20, 'Description must be at least 20 characters.'),
  amenities: z.string().transform(val => val.split(',').map(s => s.trim()).filter(Boolean)),
  images: z.array(z.string().url().or(z.literal(''))).max(5, "You can add up to 5 images."),
});

export type PropertyFormValues = Omit<Property, 'id' | 'agent' | 'listingStatus'>;

type PropertyFormProps = {
  onSubmit: (values: PropertyFormValues) => void;
  property: Property | null;
};

export default function PropertyForm({ onSubmit, property }: PropertyFormProps) {
  
  const defaultValues: PropertyFormValues = {
    title: property?.title || '',
    price: property?.price || 0,
    location: property?.location || { address: '', area: '', city: 'Enugu', state: 'Enugu State' },
    features: property?.features || { bedrooms: 0, bathrooms: 0, toilets: 0, parking: 0, sizeSqm: 0, yearBuilt: new Date().getFullYear() },
    type: property?.type || 'Apartment',
    description: property?.description || '',
    amenities: property?.amenities || [],
    images: property?.images || [],
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
      amenities: Array.isArray(defaultValues.amenities) ? defaultValues.amenities.join(', ') : '',
      images: Array.isArray(defaultValues.images) ? [...defaultValues.images, ...Array(5 - defaultValues.images.length).fill('')] : Array(5).fill(''),
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      ...values,
      amenities: Array.isArray(values.amenities) ? values.amenities : values.amenities.split(',').map(s => s.trim()).filter(Boolean),
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <ScrollArea className="h-[60vh] md:h-[70vh] pr-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price (per year)</FormLabel>
                  <FormControl><Input type="number" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Apartment">Apartment</SelectItem>
                      <SelectItem value="Bungalow">Bungalow</SelectItem>
                      <SelectItem value="Duplex">Duplex</SelectItem>
                      <SelectItem value="Detached House">Detached House</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4 rounded-md border p-4">
             <h3 className="font-semibold text-lg text-navy-blue">Images</h3>
             <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <FormField
                    key={index}
                    control={form.control}
                    name={`images.${index}` as const}
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Image {index + 1} URL</FormLabel>
                        <FormControl><Input placeholder="https://example.com/image.png" {...field} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                ))}
             </div>
          </div>
          

          <div className="space-y-4 rounded-md border p-4">
             <h3 className="font-semibold text-lg text-navy-blue">Location</h3>
              <FormField
                control={form.control}
                name="location.address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl><Input {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField
                    control={form.control}
                    name="location.area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="location.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="location.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
          </div>
          
           <div className="space-y-4 rounded-md border p-4">
             <h3 className="font-semibold text-lg text-navy-blue">Features</h3>
             <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <FormField control={form.control} name="features.bedrooms" render={({ field }) => ( <FormItem><FormLabel>Bedrooms</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="features.bathrooms" render={({ field }) => ( <FormItem><FormLabel>Bathrooms</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="features.toilets" render={({ field }) => ( <FormItem><FormLabel>Toilets</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="features.parking" render={({ field }) => ( <FormItem><FormLabel>Parking</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="features.sizeSqm" render={({ field }) => ( <FormItem><FormLabel>Size (sqm)</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                <FormField control={form.control} name="features.yearBuilt" render={({ field }) => ( <FormItem><FormLabel>Year Built</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
             </div>
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea rows={5} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amenities</FormLabel>
                <FormControl><Input placeholder="e.g. POP Ceiling, Air Conditioning, Borehole Water" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          </div>
        </ScrollArea>
        <div className="flex justify-end gap-4 pt-8">
            <Button type="submit" className="bg-navy-blue text-white hover:bg-navy-blue/90">
                {property ? 'Update Property' : 'Add Property'}
            </Button>
        </div>
      </form>
    </Form>
  );
}

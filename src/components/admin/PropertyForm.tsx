
"use client";

import { useForm, useFieldArray } from 'react-hook-form';
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
import { X } from 'lucide-react';
import { useState } from 'react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

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
  amenities: z.array(z.string().min(1, 'Amenity cannot be empty.')),
  images: z.any()
    .refine((files) => !files || files.length <= 4, "You can add up to 4 images.")
    .refine((files) => !files || Array.from(files).every((file: any) => file instanceof File), "Expected a file list.")
    .refine((files) => !files || Array.from(files).every((file: any) => file.size <= MAX_FILE_SIZE), `Max file size is 5MB.`)
    .refine(
      (files) => !files || Array.from(files).every((file: any) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      ".jpg, .jpeg, .png and .webp files are accepted."
    ).optional(),
});

export type PropertyFormValues = z.infer<typeof formSchema>;

type PropertyFormProps = {
  onSubmit: (values: PropertyFormValues) => void;
  property: Property | null;
  isSubmitting?: boolean;
};

export default function PropertyForm({ onSubmit, property, isSubmitting }: PropertyFormProps) {
  
  const defaultValues = {
    title: property?.title || '',
    price: property?.price || 0,
    location: property?.location || { address: '', area: '', city: 'Enugu', state: 'Enugu State' },
    features: property?.features || { bedrooms: 0, bathrooms: 0, toilets: 0, parking: 0, sizeSqm: 0, yearBuilt: new Date().getFullYear() },
    type: property?.type || 'Apartment',
    description: property?.description || '',
    amenities: property?.amenities || [],
  }

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "amenities"
  });

  const [amenityInput, setAmenityInput] = useState('');

  const handleAddAmenity = () => {
    if (amenityInput.trim() !== '') {
      append(amenityInput.trim());
      setAmenityInput('');
    }
  };

  const handleSubmit = (values: PropertyFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col h-full">
        <ScrollArea className="flex-grow pr-6">
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
            
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images (up to 4)</FormLabel>
                  <FormControl>
                    <Input type="file" multiple accept="image/*" onChange={(e) => field.onChange(e.target.files)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
            
            <div className="space-y-4 rounded-md border p-4">
              <FormLabel>Amenities</FormLabel>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g. POP Ceiling"
                  value={amenityInput}
                  onChange={(e) => setAmenityInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddAmenity();
                    }
                  }}
                />
                <Button type="button" onClick={handleAddAmenity}>Add</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2 bg-muted p-2 rounded-md">
                    <span>{form.getValues(`amenities.${index}`)}</span>
                    <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={() => remove(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
               <FormMessage>{form.formState.errors.amenities?.message}</FormMessage>
            </div>

            </div>
        </ScrollArea>
        <div className="flex-shrink-0 flex justify-end gap-4 pt-6">
            <Button type="submit" className="bg-navy-blue text-white hover:bg-navy-blue/90" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : (property ? 'Update Property' : 'Add Property')}
            </Button>
        </div>
      </form>
    </Form>
  );
}

    
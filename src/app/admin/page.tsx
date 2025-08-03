
"use client";

import * as React from "react";
import { getProperties } from "@/lib/properties";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import PropertyTable from "@/components/admin/PropertyTable";
import PropertyForm from "@/components/admin/PropertyForm";
import { useToast } from "@/hooks/use-toast";

export default function AdminPage() {
  const { toast } = useToast();
  const [properties, setProperties] = React.useState<Property[]>(getProperties());
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setDialogOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setDialogOpen(true);
  };

  const handleDeleteProperty = (propertyId: string) => {
    // In a real app, this would be an API call.
    // Here we just filter the state.
    setProperties(properties.filter((p) => p.id !== propertyId));
    toast({
      title: "Property Deleted",
      description: "The property has been removed from the list.",
    });
  };

  const handleFormSubmit = (values: Omit<Property, 'id' | 'agent' | 'listingStatus' | 'images'>) => {
    if (selectedProperty) {
      // Update existing property
      const updatedProperties = properties.map((p) =>
        p.id === selectedProperty.id ? { ...p, ...values } : p
      );
      setProperties(updatedProperties);
      toast({
        title: "Property Updated",
        description: "The property details have been successfully updated.",
      });
    } else {
      // Add new property
      const newProperty: Property = {
        ...values,
        id: (properties.length + 1).toString(),
        images: ['https://placehold.co/800x600.png'],
        listingStatus: 'For Rent',
        agent: { // Default agent info
          name: 'Mr. David Okoro',
          agency: 'Christif Properties',
          phone: '+2348022262178',
          email: 'david.okoro@christifproperties.com',
          avatar: 'https://picsum.photos/seed/agent1/100/100',
        }
      };
      setProperties([...properties, newProperty]);
       toast({
        title: "Property Added",
        description: "The new property has been added to the list.",
      });
    }
    setDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-headline text-4xl font-bold text-navy-blue">
          Manage Properties
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddProperty} className="bg-golden-sand text-navy-blue hover:bg-golden-sand/90">Add New Property</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-navy-blue">
                {selectedProperty ? "Edit Property" : "Add New Property"}
              </DialogTitle>
            </DialogHeader>
            <PropertyForm
              onSubmit={handleFormSubmit}
              property={selectedProperty}
            />
          </DialogContent>
        </Dialog>
      </div>

      <PropertyTable
        properties={properties}
        onEdit={handleEditProperty}
        onDelete={handleDeleteProperty}
      />
    </div>
  );
}

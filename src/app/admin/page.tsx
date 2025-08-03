
"use client";

import * as React from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import PropertyTable from "@/components/admin/PropertyTable";
import PropertyForm from "@/components/admin/PropertyForm";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import type { PropertyFormValues } from "@/components/admin/PropertyForm";
import { uploadImages } from "@/app/admin/actions";


export default function AdminPage() {
  const { toast } = useToast();
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<Property | null>(null);

  const fetchProperties = React.useCallback(async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "properties"));
      const props: Property[] = [];
      querySnapshot.forEach((doc) => {
        props.push({ id: doc.id, ...(doc.data() as Omit<Property, 'id'>) });
      });
      setProperties(props);
    } catch (error) {
      console.error("Error fetching properties: ", error);
      toast({
        title: "Error",
        description: "Failed to fetch properties.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  React.useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleAddProperty = () => {
    setSelectedProperty(null);
    setDialogOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setDialogOpen(true);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    try {
        await deleteDoc(doc(db, "properties", propertyId));
        setProperties(properties.filter((p) => p.id !== propertyId));
        toast({
            title: "Property Deleted",
            description: "The property has been removed.",
        });
    } catch (error) {
        console.error("Error deleting property: ", error);
        toast({
            title: "Error",
            description: "Failed to delete property.",
            variant: "destructive",
        });
    }
  };
  
  const handleFormSubmit = async (values: PropertyFormValues) => {
    setSubmitting(true);
    try {
      let imageUrls: string[] = selectedProperty?.images || [];
      
      const imageFiles = values.images as FileList | null;
      if (imageFiles && imageFiles.length > 0) {
        const formData = new FormData();
        Array.from(imageFiles).forEach(file => {
          formData.append('images', file);
        });

        const newImageUrls = await uploadImages(formData);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const { images, amenities, ...restOfValues } = values;
      const amenitiesArray = Array.isArray(amenities) ? amenities : (amenities as string).split(',').map(s => s.trim()).filter(Boolean);
      
      const propertyData = {
          ...restOfValues,
          amenities: amenitiesArray,
          images: imageUrls.length > 0 ? imageUrls : (selectedProperty?.images || ['https://placehold.co/800x600.png']),
      };

      if (selectedProperty) {
        const propDoc = doc(db, "properties", selectedProperty.id);
        await updateDoc(propDoc, propertyData);
        toast({
          title: "Property Updated",
          description: "The property details have been successfully updated.",
        });
      } else {
        const newPropertyData = {
          ...propertyData,
          listingStatus: 'For Rent' as const,
          agent: {
            name: 'Mr. David Okoro',
            agency: 'Christif Properties',
            phone: '+2348022262178',
            email: 'david.okoro@christifproperties.com',
            avatar: 'https://picsum.photos/seed/agent1/100/100',
          }
        };
        await addDoc(collection(db, "properties"), newPropertyData);
        toast({
          title: "Property Added",
          description: "The new property has been added to the list.",
        });
      }
      fetchProperties();
      setDialogOpen(false);
    } catch (error) {
       console.error("Error submitting form: ", error);
       toast({
         title: "Error submitting form",
         description: error instanceof Error ? error.message : "An unknown error occurred.",
         variant: "destructive",
       });
    } finally {
        setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-navy-blue">
          Manage Properties
        </h1>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAddProperty} className="bg-golden-sand text-navy-blue hover:bg-golden-sand/90 w-full sm:w-auto">Add New Property</Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-navy-blue">
                {selectedProperty ? "Edit Property" : "Add New Property"}
              </DialogTitle>
              <DialogDescription>
                  {selectedProperty ? "Update the details of this property." : "Fill in the form to add a new property."}
              </DialogDescription>
            </DialogHeader>
            <PropertyForm
              onSubmit={handleFormSubmit}
              property={selectedProperty}
              isSubmitting={isSubmitting}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <PropertyTable
          properties={properties}
          onEdit={handleEditProperty}
          onDelete={handleDeleteProperty}
        />
      )}
    </div>
  );
}

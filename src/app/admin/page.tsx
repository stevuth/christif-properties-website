
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
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { LogOut, KeyRound, Building2, ArrowLeft } from "lucide-react";
import ChangePasswordForm from "@/components/admin/ChangePasswordForm";
import Link from "next/link";

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;

function AdminDashboard() {
  const { toast } = useToast();
  const { logout, user } = useAuth();
  const [properties, setProperties] = React.useState<Property[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [isPropertyDialogOpen, setPropertyDialogOpen] = React.useState(false);
  const [isPasswordDialogOpen, setPasswordDialogOpen] = React.useState(false);
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
    setPropertyDialogOpen(true);
  };

  const handleEditProperty = (property: Property) => {
    setSelectedProperty(property);
    setPropertyDialogOpen(true);
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

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to Cloudinary.');
    }

    const data = await response.json();
    return data.secure_url;
  };
  
  const handleFormSubmit = async (values: PropertyFormValues) => {
    setSubmitting(true);
    try {
      let imageUrls: string[] = selectedProperty?.images || [];
      
      const imageFiles = values.images as FileList | null;
      if (imageFiles && imageFiles.length > 0) {
        toast({ title: `Uploading ${imageFiles.length} image(s)...`, description: "Please wait." });
        const uploadPromises = Array.from(imageFiles).map(uploadToCloudinary);
        const newImageUrls = await Promise.all(uploadPromises);
        imageUrls = [...imageUrls, ...newImageUrls];
      }

      const { images, ...restOfValues } = values;
      
      const propertyData = {
          ...restOfValues,
          images: imageUrls.length > 0 ? imageUrls : ['https://placehold.co/800x600.png'],
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
      setPropertyDialogOpen(false);
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
    <div className="bg-background min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-2">
                <Building2 className="h-8 w-8 text-navy-blue" />
                <span className="font-headline text-2xl font-bold text-navy-blue">
                    Christif Properties
                </span>
            </Link>
            <div className="flex items-center gap-2">
                <Button variant="outline" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-0 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Back to Website</span>
                    </Link>
                 </Button>
                 <Dialog open={isPasswordDialogOpen} onOpenChange={setPasswordDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                        <KeyRound className="mr-0 sm:mr-2 h-4 w-4" />
                        <span className="hidden sm:inline">Change Password</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                     <DialogHeader>
                        <DialogTitle className="font-headline text-2xl text-navy-blue">Change Password</DialogTitle>
                        <DialogDescription>Enter a new password for your account.</DialogDescription>
                     </DialogHeader>
                     <ChangePasswordForm onFinished={() => setPasswordDialogOpen(false)} />
                  </DialogContent>
                </Dialog>
                
                <Button onClick={logout} variant="outline">
                    <LogOut className="mr-0 sm:mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Logout</span>
                </Button>
            </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-navy-blue">
                Manage Properties
            </h1>
            <p className="text-warm-gray">Welcome, {user?.email}</p>
            </div>
            <div className="flex flex-wrap w-full sm:w-auto gap-2">
                <Dialog open={isPropertyDialogOpen} onOpenChange={setPropertyDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={handleAddProperty} className="bg-golden-sand text-navy-blue hover:bg-golden-sand/90 w-full sm:w-auto">Add New Property</Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl h-[90vh] flex flex-col">
                    <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-navy-blue">
                        {selectedProperty ? "Edit Property" : "Add New Property"}
                    </DialogTitle>
                    <DialogDescription>
                        {selectedProperty ? "Update the details of this property." : "Fill in the form to add a new property."}
                    </DialogDescription>
                    </DialogHeader>
                    <div className="flex-grow overflow-hidden">
                    <PropertyForm
                        onSubmit={handleFormSubmit}
                        property={selectedProperty}
                        isSubmitting={isSubmitting}
                    />
                    </div>
                </DialogContent>
                </Dialog>
            </div>
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
      </main>
    </div>
  );
}

export default function AdminPage() {
    return (
        <ProtectedRoute>
            <AdminDashboard />
        </ProtectedRoute>
    )
}

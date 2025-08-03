
'use server';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export async function uploadImages(formData: FormData): Promise<string[]> {
  const imageFiles = formData.getAll('images') as File[];
  const imageUrls: string[] = [];

  if (!imageFiles || imageFiles.length === 0) {
    return [];
  }

  try {
    for (const imageFile of imageFiles) {
      if (imageFile.size === 0) continue;

      // Convert the file to a buffer for server-side upload
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Create a storage reference
      const storageRef = ref(storage, `properties/${Date.now()}-${imageFile.name}`);
      
      // Upload the file buffer
      await uploadBytes(storageRef, buffer, {
        contentType: imageFile.type,
      });
      
      // Get the download URL and add it to our array
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }
    
    return imageUrls;

  } catch (error) {
    console.error("Firebase Upload Error:", error);
    // Re-throw the error with a more specific message to be caught by the client
    if (error instanceof Error) {
        throw new Error(`Firebase Upload Failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image upload.");
  }
}

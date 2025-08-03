
'use server';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export async function uploadImages(formData: FormData): Promise<string[]> {
  const images = formData.getAll('images') as File[];
  const imageUrls: string[] = [];

  if (!images || images.length === 0) {
    return [];
  }
  
  try {
    for (const image of images) {
      if (image.size === 0) continue;
      
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const storageRef = ref(storage, `properties/${Date.now()}-${image.name}`);
      
      await uploadBytes(storageRef, buffer, {
        contentType: image.type,
      });
      
      const url = await getDownloadURL(storageRef);
      imageUrls.push(url);
    }
    
    return imageUrls;

  } catch (error) {
    console.error("Firebase Upload Error:", error);
    // Re-throw the error to be caught by the client
    if (error instanceof Error) {
        throw new Error(`Firebase Upload Failed: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image upload.");
  }
}

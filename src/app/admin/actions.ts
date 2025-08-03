
'use server';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export async function uploadImages(formData: FormData): Promise<string[]> {
  const images = formData.getAll('images') as File[];
  const imageUrls: string[] = [];

  if (!images || images.length === 0) {
    return [];
  }

  for (const image of images) {
    if (image.size === 0) continue;
    
    const arrayBuffer = await image.arrayBuffer();

    const storageRef = ref(storage, `properties/${Date.now()}-${image.name}`);
    
    await uploadBytes(storageRef, arrayBuffer, {
      contentType: image.type,
    });
    
    const url = await getDownloadURL(storageRef);
    imageUrls.push(url);
  }
  
  return imageUrls;
}

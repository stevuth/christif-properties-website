import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Property } from './types';

export async function getProperties(): Promise<Property[]> {
  try {
    const querySnapshot = await getDocs(collection(db, 'properties'));
    const properties: Property[] = [];
    querySnapshot.forEach((doc) => {
      properties.push({ id: doc.id, ...(doc.data() as Omit<Property, 'id'>) });
    });
    return properties;
  } catch (error) {
    console.error("Error fetching properties: ", error);
    return [];
  }
}

export async function getPropertyById(id: string): Promise<Property | undefined> {
  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...(docSnap.data() as Omit<Property, 'id'>) };
    } else {
      console.log("No such document!");
      return undefined;
    }
  } catch (error) {
    console.error("Error fetching property by ID: ", error);
    return undefined;
  }
}

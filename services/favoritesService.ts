// app/services/favoritesService.ts
import { db } from '../firebase/firebaseConfig';
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export const loadFavoritesFromFirebase = async (userId: string) => {
  try {
    const favoritesRef = collection(db, 'users', userId, 'favorites');
    const q = query(favoritesRef);
    const querySnapshot = await getDocs(q);

    const favorites = querySnapshot.docs.map(doc => ({
      id: doc.id,
      name: doc.data().courseName,
      courseCode: doc.id, // use doc ID as fallback
    }));

    return favorites;
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const saveFavoriteToFirebase = async (userId: string, courseName: string) => {
  const favoritesRef = collection(db, 'users', userId, 'favorites');
  await addDoc(favoritesRef, { courseName });
};

export const removeFavoriteFromFirebase = async (userId: string, courseName: string) => {
  const favoritesRef = collection(db, 'users', userId, 'favorites');
  const q = query(favoritesRef, where('courseName', '==', courseName));
  const snapshot = await getDocs(q);
  snapshot.forEach(async (docSnap) => {
    await deleteDoc(doc(db, 'users', userId, 'favorites', docSnap.id));
  });
};

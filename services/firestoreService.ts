// app/services/firestoreService.ts

import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

/**
 * Updates the user's document in Firestore with the given profile image URL.
 *
 * @param userId - The UID of the user (from Firebase Authentication)
 * @param imageUrl - The Firebase Storage download URL of the uploaded profile image
 * @returns A Promise that resolves once the update is complete
 */
export const saveProfileImageUrl = async (userId: string, imageUrl: string): Promise<void> => {
  try {
    if (!userId || !imageUrl) {
      throw new Error('Missing userId or imageUrl');
    }

    const userDocRef = doc(db, 'users', userId);

    await updateDoc(userDocRef, {
      profileImage: imageUrl,
    });

    console.log(`✅ Firestore: Saved profile image URL for user: ${userId}`);
  } catch (error) {
    console.error('❌ Firestore update failed:', error);
    throw error;
  }
};

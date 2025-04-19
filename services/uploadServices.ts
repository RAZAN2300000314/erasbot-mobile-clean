import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';
import * as FileSystem from 'expo-file-system';

/**
 * Uploads a user's profile image to Firebase Storage and returns its download URL.
 */
export const uploadProfileImage = async (uri: string, userId: string): Promise<string> => {
  try {
    // ✅ Ensure local-accessible URI using expo-file-system
    const fileName = `profile_${userId}.jpg`;
    const safeUri = FileSystem.documentDirectory + fileName;

    console.log('📁 Copying image to safe file path:', safeUri);
    await FileSystem.copyAsync({ from: uri, to: safeUri });

    const fileInfo = await FileSystem.getInfoAsync(safeUri);
    if (!fileInfo.exists) throw new Error('Copied file not found at: ' + safeUri);

    const response = await fetch(safeUri);
    const blob = await response.blob();

    const imageRef = ref(storage, `userProfiles/${userId}/profile.jpg`);
    await uploadBytes(imageRef, blob);

    const downloadURL = await getDownloadURL(imageRef);
    console.log('✅ Firebase Storage upload successful:', downloadURL);
    return downloadURL;

  } catch (error: any) {
    console.error('❌ Firebase upload failed:', error.message || error);
    throw error;
  }
};

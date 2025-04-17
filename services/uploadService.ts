import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase/firebaseConfig';

export const uploadProfileImage = async (uri: string, userId: string): Promise<string> => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const imageRef = ref(storage, `userProfiles/${userId}/profile.jpg`);
  await uploadBytes(imageRef, blob);

  return await getDownloadURL(imageRef);
};

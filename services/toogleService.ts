// services/toogleService.ts

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const fetchFeatureToggles = async () => {
  try {
    const docRef = doc(db, 'toggles', 'apiToggles');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data(); // returns { tripadvisor: true, yelp: true, ... }
    } else {
      console.warn('Toggles document does not exist');
      return {};
    }
  } catch (error) {
    console.error('[Toggles Error]', error);
    return {};
  }
};

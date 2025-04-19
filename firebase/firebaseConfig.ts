// firebase/firebaseConfig.ts

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth/react-native';
import type { Auth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBQ58NxODMLbQ1Hr3fDZvqZ_arkxFo4VQw',
  authDomain: 'erasbot-mobile-application.firebaseapp.com',
  projectId: 'erasbot-mobile-application',
  storageBucket: 'erasbot-mobile-application.appspot.com',
  messagingSenderId: '519422051382',
  appId: '1:519422051382:web:ff6248bc070356a9e58497',
  measurementId: 'G-VKG4Z4EMC8',
};

// ✅ Initialize Firebase app
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// ✅ Explicitly typed `auth`
let auth: Auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

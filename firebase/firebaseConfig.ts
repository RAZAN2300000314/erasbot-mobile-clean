// firebase/firebaseConfig.ts
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ58NxODMLbQ1Hr3fDZvqZ_arkxFo4VQw',
  authDomain: 'erasbot-mobile-application.firebaseapp.com',
  projectId: 'erasbot-mobile-application',
  storageBucket: 'erasbot-mobile-application.appspot.com',
  messagingSenderId: '519422051382',
  appId: '1:519422051382:web:ff6248bc070356a9e58497',
  measurementId: 'G-VKG4Z4EMC8',
};

// ✅ Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export Firestore and Auth instances
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
export const firebaseApp = initializeApp(firebaseConfig);
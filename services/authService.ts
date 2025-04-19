// app/services/authServices.ts

import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Registers a new user using Firebase Authentication
 * and creates a user document in Firestore with additional profile info.
 *
 * @param email - User's email
 * @param password - User's chosen password
 * @param name - User's full name or display name
 * @returns The authenticated Firebase user object
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<any> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create Firestore user profile document
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email,
    name,
    createdAt: new Date().toISOString(),
    profileImage: '', // ⬅️ Optional: initialize empty profileImage field
  });

  return user;
};

/**
 * Logs in an existing user using Firebase Authentication.
 *
 * @param email - The user's email
 * @param password - The user's password
 * @returns The authenticated Firebase user object
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

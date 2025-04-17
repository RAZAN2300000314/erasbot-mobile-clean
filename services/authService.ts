import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Register a new user with Firebase Auth and store additional user info in Firestore.
 */
export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<any> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email,
    name,
    createdAt: new Date().toISOString(),
  });

  return user;
};

/**
 * Log in an existing user via Firebase Auth.
 */
export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

type UserContextType = {
  userId: string | null;
  userName: string;
  setUserName: (name: string) => void;
  profileImage: string | null;
  setProfileImage: (uri: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState('Guest');
  const [profileImage, setProfileImageState] = useState<string | null>(null);

  // Load saved profile image on mount
  useEffect(() => {
    const loadProfileImage = async () => {
      const uri = await AsyncStorage.getItem('profileImage');
      if (uri) setProfileImageState(uri);
    };
    loadProfileImage();
  }, []);

  // Listen for Firebase Auth state changes
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName || 'Guest');
      } else {
        setUserId(null);
        setUserName('Guest');
      }
    });
    return () => unsubscribe();
  }, []);

  const setProfileImage = async (uri: string) => {
    setProfileImageState(uri);
    await AsyncStorage.setItem('profileImage', uri);
  };

  return (
    <UserContext.Provider value={{ userId, userName, setUserName, profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

// app/context/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextType = {
  userName: string;
  setUserName: (name: string) => void;
  profileImage: string | null;
  setProfileImage: (uri: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userName, setUserName] = useState('Guest');
  const [profileImage, setProfileImageState] = useState<string | null>(null);

  // Load saved image on mount
  useEffect(() => {
    (async () => {
      const uri = await AsyncStorage.getItem('profileImage');
      if (uri) setProfileImageState(uri);
    })();
  }, []);

  const setProfileImage = async (uri: string) => {
    setProfileImageState(uri);
    await AsyncStorage.setItem('profileImage', uri);
  };

  return (
    <UserContext.Provider value={{ userName, setUserName, profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

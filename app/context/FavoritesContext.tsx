// app/context/FavoritesContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  saveFavoriteToFirebase,
  removeFavoriteFromFirebase,
  loadFavoritesFromFirebase,
} from '../../services/favoritesService';
import { useUser } from './UserContext';

type Course = { name: string; courseCode: string };

type FavoritesContextType = {
  favorites: Course[];
  addFavorite: (course: Course) => void;
  removeFavorite: (courseCode: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Course[]>([]);
  const { userId } = useUser();

  // ✅ Load from Firebase on app start
  useEffect(() => {
    const fetchFavorites = async () => {
      if (userId) {
        const loadedFavorites = await loadFavoritesFromFirebase(userId);
        setFavorites(loadedFavorites);
      }
    };
    fetchFavorites();
  }, [userId]);

  const addFavorite = (course: Course) => {
    setFavorites((prev) => [...prev, course]);
    if (userId) {
      saveFavoriteToFirebase(userId, course.name);
    }
  };

  const removeFavorite = (courseCode: string) => {
    const course = favorites.find((c) => c.courseCode === courseCode);
    if (course) {
      setFavorites((prev) => prev.filter((c) => c.courseCode !== courseCode));
      if (userId) {
        removeFavoriteFromFirebase(userId, course.name);
      }
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};

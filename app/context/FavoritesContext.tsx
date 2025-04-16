// app/context/FavoritesContext.tsx

import React, { createContext, useContext, useState } from 'react';

type Course = {
  name: string;
  courseCode: string;
};

type FavoritesContextType = {
  favorites: Course[];
  addFavorite: (course: Course) => void;
  removeFavorite: (courseCode: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Course[]>([]);

  const addFavorite = (course: Course) => {
    if (!favorites.find((c) => c.courseCode === course.courseCode)) {
      setFavorites((prev) => [...prev, course]);
    }
  };

  const removeFavorite = (courseCode: string) => {
    setFavorites((prev) => prev.filter((c) => c.courseCode !== courseCode));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within a FavoritesProvider');
  return context;
};

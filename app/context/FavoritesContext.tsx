// app/context/FavoritesContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

export type Course = {
  id?: string;             // optional for fallback
  name: string;
  courseCode: string;
};

type FavoritesContextType = {
  favorites: Course[];
  addFavorite: (course: Course) => void;
  removeFavorite: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Course[]>([]);

  const addFavorite = (course: Course) => {
    const uniqueId = course.id ?? course.courseCode;
    setFavorites((prev) => {
      if (prev.some((c) => (c.id ?? c.courseCode) === uniqueId)) return prev;
      return [...prev, { ...course, id: uniqueId }];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((c) => (c.id ?? c.courseCode) !== id));
  };

  useEffect(() => {
    console.log('Favorites Updated:', favorites);
  }, [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

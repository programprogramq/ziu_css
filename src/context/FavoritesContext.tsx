import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import type { Movie } from '../types/movie';

interface FavoritesContextType {
  favorites: Movie[];

  toggleFavorite: (movie: Movie) => void;

  isFavorite: (id: number) => boolean;
}

const FavoritesContext =
  createContext<FavoritesContextType | null>(
    null
  );

const STORAGE_KEY = 'movie-favorites';

export function FavoritesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favorites, setFavorites] = useState<Movie[]>(
    []
  );

  useEffect(() => {
    const saved = localStorage.getItem(
      STORAGE_KEY
    );

    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some(
        (m) => m.id === movie.id
      );

      const next = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie];

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(next)
      );

      return next;
    });
  };

  const isFavorite = (id: number) => {
    return favorites.some((m) => m.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites musi być użyty w FavoritesProvider'
    );
  }

  return context;
}
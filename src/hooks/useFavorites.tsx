'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';

type FavoritesContextType = {
  favorites: Set<number>;
  toggleFavorite: (userId: number) => void;
  isFavorite: (userId: number) => boolean;
};

const FAVORITES_STORAGE_KEY = 'github-favorites';

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set();

    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return new Set(stored ? JSON.parse(stored) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(Array.from(favorites)));
  }, [favorites]);

  const toggleFavorite = useCallback((userId: number) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  }, []);

  const isFavorite = useCallback((userId: number) => favorites.has(userId), [favorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites debe ser usado dentro de un FavoritesProvider');
  }
  return context;
}

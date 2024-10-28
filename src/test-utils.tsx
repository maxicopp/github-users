import { render as rtlRender } from '@testing-library/react';
import React, { createContext } from 'react';

const mockFavoritesContext = {
  favorites: [],
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
  isFavorite: jest.fn(),
  toggleFavorite: jest.fn(),
};

export const FavoritesContext = createContext(mockFavoritesContext);

function render(ui: React.ReactElement, options = {}) {
  return rtlRender(ui, {
    wrapper: ({ children }) => (
      <FavoritesContext.Provider value={mockFavoritesContext}>
        {children}
      </FavoritesContext.Provider>
    ),
    ...options,
  });
}

export * from '@testing-library/react';
export { render };

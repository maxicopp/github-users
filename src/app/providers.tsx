'use client';

import { FavoritesProvider } from "@/hooks/useFavorites";
import { SkeletonTheme } from 'react-loading-skeleton';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme
      baseColor="var(--gray-alpha-100)"
      highlightColor="var(--gray-alpha-200)"
      borderRadius={12}
    >
      <FavoritesProvider>{children}</FavoritesProvider>
    </SkeletonTheme>
  );
}

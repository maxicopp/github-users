'use client';

import { FavoritesProvider } from "@/hooks/useFavorites";
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SkeletonTheme
      baseColor="var(--gray-alpha-100)"
      highlightColor="var(--gray-alpha-200)"
      borderRadius={12}
    >
      <FavoritesProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </FavoritesProvider>
    </SkeletonTheme>
  );
}

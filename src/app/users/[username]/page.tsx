import { Suspense } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { UserProfile } from './UserProfile';
import { ErrorBoundary } from '@/components/ErrorBoundary';

interface Props {
  params: Promise<{
    username: string;
  }>;
}

export default async function UserPage({ params }: Props) {
  const { username } = await params;

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.backLink}>
        ← Volver a la lista
      </Link>

      <main className={styles.main}>
        <ErrorBoundary fallback={<div className={styles.error}>Error al cargar los detalles del usuario. Por favor, inténtelo de nuevo más tarde.</div>}>
          <Suspense fallback={<div className={styles.loading}>Cargando detalles del usuario...</div>}>
            <UserProfile username={username} />
          </Suspense>
        </ErrorBoundary>
      </main>
    </div>
  );
}

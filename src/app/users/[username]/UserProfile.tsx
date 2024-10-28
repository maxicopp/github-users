'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useFavorites } from '@/hooks/useFavorites';
import styles from './page.module.css';
import { GitHubUser } from '@/types/github';
import { getUserDetails } from '@/lib/github';

interface UserProfileProps {
  username: string;
}

export function UserProfile({ username }: UserProfileProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await getUserDetails(username);
        setUser(userData);
      } catch {
        setError('Error al cargar los detalles del usuario');
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, [username]);

  if (isLoading) return <div className={styles.loading}>Cargando...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!user) return null;

  const favorite = isFavorite(user.id);

  return (
    <div className={styles.profile}>
      <Image
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        width={150}
        height={150}
        className={styles.avatar}
        priority
      />

      <div className={styles.info}>
        <div className={styles.header}>
          <h1>{user.name || user.login}</h1>
          <button
            onClick={() => toggleFavorite(user.id)}
            className={`${styles.favoriteButton} ${favorite ? styles.favorite : ''}`}
            aria-label={favorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
          >
            ★
          </button>
        </div>
        {user.bio && <p className={styles.bio}>{user.bio}</p>}

        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>Repositorios</span>
            <span className={styles.value}>{user.public_repos}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Seguidores</span>
            <span className={styles.value}>{user.followers}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>Siguiendo</span>
            <span className={styles.value}>{user.following}</span>
          </div>
        </div>

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          Ver en GitHub
        </a>
      </div>
    </div>
  );
}

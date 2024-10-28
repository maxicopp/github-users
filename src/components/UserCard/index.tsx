'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';
import { GitHubUser } from '@/types/github';
import styles from './styles.module.css';

interface UserCardProps {
  user: GitHubUser;
}

export function UserCard({ user }: UserCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(user.id);

  return (
    <div className={styles.card}>
      <Image
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        width={80}
        height={80}
        className={styles.avatar}
      />
      <div className={styles.info}>
        <Link href={`/users/${user.login}`} className={styles.name}>
          {user.login}
        </Link>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          Ver en GitHub
        </a>
      </div>
      <button
        onClick={() => toggleFavorite(user.id)}
        className={`${styles.favoriteButton} ${favorite ? styles.favorite : ''}`}
        aria-label={favorite ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
      >
        ★
      </button>
    </div>
  );
}

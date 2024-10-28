'use client';

import Skeleton from 'react-loading-skeleton';
import { GitHubUser } from '@/types/github';
import { UserCard } from '@/components/UserCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import styles from './styles.module.css';

interface UserListProps {
  users: GitHubUser[];
  loading?: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

export function UserList({ users, loading, hasMore, onLoadMore }: UserListProps) {
  const lastUserRef = useInfiniteScroll(onLoadMore, hasMore, !!loading);

  if (loading && users.length === 0) {
    return (
      <div className={styles.grid} data-testid="user-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.skeletonCard} data-testid="skeleton-card">
            <div className={styles.skeletonAvatar}>
              <Skeleton circle width={80} height={80} />
            </div>
            <div className={styles.info}>
              <Skeleton height={24} />
              <Skeleton width="60%" height={20} />
            </div>
            <div className={styles.skeletonStar}>
              <Skeleton circle height={24} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return <p className={styles.empty}>No se encontraron usuarios.</p>;
  }

  return (
    <div className={styles.grid} data-testid="user-grid">
      {users.map((user, index) => (
        <div
          key={user.id}
          ref={index === users.length - 1 ? lastUserRef : undefined}
        >
          <UserCard user={user} />
        </div>
      ))}
      {loading && (
        <div className={styles.skeletonCard} data-testid="skeleton-card">
          <div className={styles.skeletonAvatar}>
            <Skeleton circle width={80} height={80} />
          </div>
          <div className={styles.info}>
            <Skeleton height={24} />
            <Skeleton width="60%" height={20} />
          </div>
          <div className={styles.skeletonStar}>
            <Skeleton circle height={24} />
          </div>
        </div>
      )}
    </div>
  );
}

'use client';

import Skeleton from 'react-loading-skeleton';
import { GitHubUser } from '@/types/github';
import { UserCard } from '@/components/UserCard';
import styles from './styles.module.css';

interface UserListProps {
  users: GitHubUser[];
  loading?: boolean;
}

export function UserList({ users, loading }: UserListProps) {
  if (loading) {
    return (
      <div className={styles.grid}>
        {[...Array(6)].map((_, i) => (
          <div key={i} className={styles.skeletonCard}>
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
    <div className={styles.grid}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

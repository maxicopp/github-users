'use client';

import { GitHubUser } from '@/types/github';
import { UserCard } from '@/components/UserCard';
import styles from './styles.module.css';

interface UserListProps {
  users: GitHubUser[];
}

export function UserList({ users }: UserListProps) {
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

'use client';

import { useState, useEffect } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { GitHubUser } from '@/types/github';
import styles from './page.module.css';
import { UserList } from '@/components/UserList';
import { getUsers, searchUsers } from '@/lib/github';

export default function Home() {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadInitialUsers();
  }, []);

  async function loadInitialUsers() {
    try {
      const initialUsers = await getUsers();
      setUsers(initialUsers);
    } catch {
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    try {
      const result = await searchUsers(query);
      setUsers(result.items);
    } catch {
      setError('Failed to search users');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Usuarios de GitHub</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className={styles.error}>{error}</div>}
      <UserList users={users} loading={loading} />
    </main>
  );
}

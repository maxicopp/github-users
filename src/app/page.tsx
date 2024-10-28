'use client';

import { useState, useEffect, useCallback } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { GitHubUser } from '@/types/github';
import styles from './page.module.css';
import { UserList } from '@/components/UserList';
import { getUsers, searchUsers } from '@/lib/github';
import { useGitHubCache } from '@/hooks/useGitHubCache';
import { useRateLimit } from '@/hooks/useRateLimit';
import { toast } from 'react-toastify';
import { RateLimitError } from '@/lib/errors';

export default function Home() {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentQuery, setCurrentQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const { getCachedUsers, updateCache } = useGitHubCache();
  const { rateLimitInfo, checkRateLimit } = useRateLimit();

  const loadInitialUsers = useCallback(async () => {
    try {
      const initialUsers = await getUsers();
      setUsers(initialUsers);
      updateCache('', initialUsers, initialUsers.length ?? 0);
    } catch {
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  }, [updateCache]);

  useEffect(() => {
    loadInitialUsers();
  }, [loadInitialUsers]);

  async function handleSearch(query: string) {
    setLoading(true);
    setError(null);
    setCurrentQuery(query);

    try {
      const hasRemainingCalls = await checkRateLimit();
      if (!hasRemainingCalls) {
        toast.error('Has alcanzado el límite de peticiones a la API. Por favor, espera unos minutos.', {
          toastId: 'rate-limit',
        });
        return;
      }

      const cached = getCachedUsers(query);
      if (cached.users.length > 0) {
        setUsers(cached.users);
        setHasMore(cached.hasMore);
        return;
      }

      const result = await searchUsers(query, 1);
      setUsers(result.items);
      updateCache(query, result.items, result.total_count);
      setHasMore(result.items.length < result.total_count);
    } catch (error) {
      if (error instanceof RateLimitError) {
        const resetTime = new Date(error.resetTime * 1000).toLocaleString();
        toast.error(`Límite de peticiones excedido. Se restablecerá en ${resetTime}`, {
          toastId: 'rate-limit',
        });
      } else {
        setError('Error al buscar usuarios');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadMore() {
    if (!hasMore || loading) return;

    setLoading(true);
    const { page } = getCachedUsers(currentQuery);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const result = await searchUsers(currentQuery, page);
      const newUsers = result.items.filter(
        (newUser: GitHubUser) => !users.some(
          (existingUser: GitHubUser) => existingUser.id === newUser.id
        )
      );
      updateCache(currentQuery, newUsers, result.total_count);
      setUsers(prev => [...prev, ...newUsers]);
      setHasMore(users.length + newUsers.length < result.total_count);
    } catch (error) {
      if (error instanceof RateLimitError) {
        const resetTime = new Date(error.resetTime * 1000).toLocaleString();
        toast.error(`Límite de peticiones excedido. Se restablecerá en ${resetTime}`, {
          toastId: 'rate-limit',
        });
      } else {
        setError('Error al cargar más usuarios');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Usuarios de GitHub</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <div className={styles.error}>{error}</div>}
      {rateLimitInfo && rateLimitInfo.remaining < 10 && (
        <div className={styles.warning}>
          Quedan {rateLimitInfo.remaining} peticiones disponibles.
          Se restablecerá en {new Date(rateLimitInfo.reset * 1000).toLocaleTimeString()}
        </div>
      )}
      <UserList
        users={users}
        loading={loading}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
      />
    </main>
  );
}

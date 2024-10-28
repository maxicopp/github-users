import { useState, useCallback } from 'react';
import { GitHubUser } from '@/types/github';

interface CacheState {
  users: Map<string, GitHubUser[]>;
  page: Map<string, number>;
  hasMore: Map<string, boolean>;
}

interface CacheResult {
  users: GitHubUser[];
  page: number;
  hasMore: boolean;
}

export function useGitHubCache() {
  const [cache, setCache] = useState<CacheState>({
    users: new Map(),
    page: new Map(),
    hasMore: new Map(),
  });

  const getCachedUsers = useCallback((query: string): CacheResult => {
    return {
      users: cache.users.get(query) || [],
      page: cache.page.get(query) || 1,
      hasMore: cache.hasMore.get(query) ?? true,
    };
  }, [cache]);

  const updateCache = useCallback((query: string, newUsers: GitHubUser[], total: number) => {
    setCache(prev => {
      const currentUsers = prev.users.get(query) || [];
      const currentPage = prev.page.get(query) || 1;

      const uniqueUsers = Array.from(
        new Map(
          [...currentUsers, ...newUsers].map(user => [user.id, user])
        ).values()
      );

      const updatedUsers = new Map(prev.users);
      const updatedPage = new Map(prev.page);
      const updatedHasMore = new Map(prev.hasMore);

      updatedUsers.set(query, uniqueUsers);
      updatedPage.set(query, currentPage + 1);
      updatedHasMore.set(query, uniqueUsers.length < total);

      return {
        users: updatedUsers,
        page: updatedPage,
        hasMore: updatedHasMore,
      };
    });
  }, []);

  return { getCachedUsers, updateCache };
}

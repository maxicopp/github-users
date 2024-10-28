'use client';

import { useState, useCallback } from 'react';

interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

export function useRateLimit() {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkRateLimit = useCallback(async () => {
    if (isChecking) return true;

    setIsChecking(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_GITHUB_API_URL}/rate_limit`);
      if (!response.ok) throw new Error('Error al obtener rate limit');

      const data = await response.json();
      const { limit, remaining, reset } = data.rate;

      setRateLimitInfo({ limit, remaining, reset });
      return remaining > 0;
    } catch (error) {
      console.error('Error al obtener rate limit:', error);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [isChecking]);

  return { rateLimitInfo, checkRateLimit };
}

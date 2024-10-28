import { GitHubUser, SearchUsersResponse } from "@/types/github";
import { RateLimitError } from './errors';

const GITHUB_API_URL = process.env.NEXT_PUBLIC_GITHUB_API_URL;

interface QueuedRequest<T> {
  execute: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

class RequestQueue {
  private isProcessing: boolean = false;
  private queue: Array<QueuedRequest<unknown>> = [];

  async enqueue<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        execute: request,
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.processQueue();
    });
  }

  private async processQueue() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const { execute, resolve, reject } = this.queue[0];

    try {
      const result = await execute();
      resolve(result);
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Unknown error'));
    } finally {
      this.queue.shift();
      this.isProcessing = false;
      this.processQueue();
    }
  }
}

const requestQueue = new RequestQueue();

async function makeRequest(url: string) {
  return requestQueue.enqueue(async () => {
    const response = await fetch(url);
    if (response.status === 403) {
      const resetTime = response.headers.get('X-RateLimit-Reset');
      throw new RateLimitError(Number(resetTime));
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  });
}

export async function getUsers(): Promise<GitHubUser[]> {
  return makeRequest(`${GITHUB_API_URL}/users`);
}

export async function getUserDetails(username: string): Promise<GitHubUser> {
  return makeRequest(`${GITHUB_API_URL}/users/${username}`);
}

export async function searchUsers(query: string, page: number = 1): Promise<SearchUsersResponse> {
  const searchParams = new URLSearchParams({
    q: query || 'type:user',
    page: page.toString(),
    per_page: '30',
    sort: 'followers',
    order: 'desc'
  });

  const data = await makeRequest(`${GITHUB_API_URL}/search/users?${searchParams}`);

  return {
    items: data.items,
    total_count: Math.min(data.total_count, 1000)
  };
}

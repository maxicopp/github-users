import { useRef, useCallback } from 'react';

interface QueuedRequest<T> {
  execute: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (error: Error) => void;
}

type QueueItem = QueuedRequest<unknown>;

export function useRequestQueue() {
  const isProcessing = useRef(false);
  const queue = useRef<QueueItem[]>([]);

  const processQueue = useCallback(async () => {
    if (isProcessing.current || queue.current.length === 0) return;

    isProcessing.current = true;
    const { execute, resolve, reject } = queue.current[0];

    try {
      const result = await execute();
      resolve(result);
    } catch (error) {
      reject(error instanceof Error ? error : new Error('Error desconocido'));
    } finally {
      queue.current.shift();
      isProcessing.current = false;
      processQueue();
    }
  }, []);

  const enqueueRequest = useCallback(
    <T>(request: () => Promise<T>): Promise<T> => {
      return new Promise<T>((resolve, reject) => {
        queue.current.push({
          execute: request,
          resolve: resolve as (value: unknown) => void,
          reject,
        });
        processQueue();
      });
    },
    [processQueue]
  );

  return { enqueueRequest };
}

/**
 * Performance optimization utilities
 * - Request deduplication (prevent duplicate API calls)
 * - Query caching helpers
 */

import { useCallback, useRef, useEffect } from 'react';

/**
 * In-memory cache for API requests
 * Stores successful responses for deduplication
 */
class RequestCache<T> {
  private cache: Map<string, { data: T; timestamp: number }> = new Map();
  private readonly TTL: number; // milliseconds

  constructor(ttlMs: number = 5 * 60 * 1000) { // 5 minutes default
    this.TTL = ttlMs;
  }

  set(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  get(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // Check if entry has expired
    if (Date.now() - entry.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  has(key: string): boolean {
    return this.get(key) !== null;
  }
}

/**
 * Debounce hook for user-triggered API calls
 * Prevents rapid successive requests
 */
export const useDebounce = <T extends unknown[]>(
  callback: (...args: T) => void,
  delayMs: number = 300
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debounced = useCallback(
    (...args: T) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delayMs);
    },
    [callback, delayMs]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debounced;
};

/**
 * Creates an AbortController with timeout
 * Cancels fetch automatically after specified duration
 */
export const createFetchWithTimeout = (timeoutMs: number = 15000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  return {
    signal: controller.signal,
    cleanup: () => clearTimeout(timeoutId),
  };
};

/**
 * Global cache instance for course data
 * Prevents duplicate API calls for the same course
 */
export const courseCache = new RequestCache<unknown>(5 * 60 * 1000);

/**
 * Cache key generator for API requests
 */
export const generateCacheKey = (endpoint: string, params?: Record<string, unknown>): string => {
  if (!params || Object.keys(params).length === 0) {
    return endpoint;
  }
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}=${encodeURIComponent(String(params[key]))}`)
    .join('&');
  return `${endpoint}?${sortedParams}`;
};

/**
 * Request deduplication for concurrent identical requests
 * Prevents multiple simultaneous calls for the same resource
 */
class RequestDeduplicator {
  private inflight: Map<string, Promise<unknown>> = new Map();

  async fetch<T>(
    key: string,
    fetcher: () => Promise<T>
  ): Promise<T> {
    // Return existing promise if request is in-flight
    if (this.inflight.has(key)) {
      return this.inflight.get(key) as Promise<T>;
    }

    // Create new promise and store it
    const promise = fetcher()
      .then((data) => {
        this.inflight.delete(key);
        return data;
      })
      .catch((error) => {
        this.inflight.delete(key);
        throw error;
      });

    this.inflight.set(key, promise);
    return promise;
  }

  clear(): void {
    this.inflight.clear();
  }
}

export const requestDeduplicator = new RequestDeduplicator();

/**
 * Memoization helper for expensive computations
 * Similar to useMemo but for standalone functions
 */
export const memoize = <TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => TReturn,
  keyGenerator?: (...args: TArgs) => string
) => {
  const cache = new Map<string, TReturn>();
  const defaultKeyGenerator = (...args: TArgs) => JSON.stringify(args);
  const getKey = keyGenerator || defaultKeyGenerator;

  return (...args: TArgs): TReturn => {
    const key = getKey(...args);
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

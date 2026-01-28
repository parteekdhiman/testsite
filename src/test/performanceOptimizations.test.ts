import { describe, it, expect, vi } from 'vitest'
import { debounce, throttle, createLazyLoadObserver, cacheManager } from '../utils/performanceOptimizations'

describe('Performance Utilities', () => {
  describe('debounce', () => {
    it('should debounce function calls', async () => {
      let callCount = 0
      const debouncedFn = debounce(() => callCount++, 100)

      debouncedFn()
      debouncedFn()
      debouncedFn()

      expect(callCount).toBe(0)

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(callCount).toBe(1)
    })
  })

  describe('throttle', () => {
    it('should throttle function calls', async () => {
      let callCount = 0
      const throttledFn = throttle(() => callCount++, 100)

      throttledFn()
      throttledFn()
      throttledFn()

      expect(callCount).toBe(1)

      await new Promise(resolve => setTimeout(resolve, 150))
      throttledFn()
      expect(callCount).toBe(2)
    })
  })

  describe('cacheManager', () => {
    it('should set and get cached values', () => {
      const key = 'test-key'
      const value = { data: 'test' }

      cacheManager.set(key, value, 1000)
      const retrieved = cacheManager.get(key)

      expect(retrieved).toEqual(value)
    })

    it('should return null for expired cache', async () => {
      const key = 'test-key-expired'
      const value = { data: 'test' }

      cacheManager.set(key, value, 100) // 100ms TTL

      await new Promise(resolve => setTimeout(resolve, 150))

      const retrieved = cacheManager.get(key)
      expect(retrieved).toBeNull()
    })

    it('should clear cached values', () => {
      const key = 'test-key-clear'
      const value = { data: 'test' }

      cacheManager.set(key, value, 1000)
      cacheManager.clear(key)

      const retrieved = cacheManager.get(key)
      expect(retrieved).toBeNull()
    })
  })

  describe('createLazyLoadObserver', () => {
    it('should return null when IntersectionObserver is not supported', () => {
      const originalIntersectionObserver = (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver;
      delete (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver;

      const observer = createLazyLoadObserver(() => {});
      expect(observer).toBeNull();

      // Restore original
      (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = originalIntersectionObserver;
    });

    it('should create IntersectionObserver when supported', () => {
      const mockCallback = vi.fn();
      const observer = createLazyLoadObserver(mockCallback);

      expect(observer).toBeInstanceOf(IntersectionObserver);
    });
  });
})
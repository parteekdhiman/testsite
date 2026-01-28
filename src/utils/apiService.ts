/**
 * API Service Utility for connecting frontend to backend
 * Location: src/services/api.ts
 */

import { log } from "console";

// Base URL for API requests — set `VITE_API_URL` to your backend root (e.g. https://api.example.com)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
/**
 * Retry configuration
 */
const RETRY_CONFIG = {
  maxRetries: 3,
  baseDelay: 1000,
  maxDelay: 10000,
};

/**
 * Sleep utility for retry delays
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculate exponential backoff delay
 */
const getRetryDelay = (attempt: number): number => {
  const delay = RETRY_CONFIG.baseDelay * Math.pow(2, attempt);
  return Math.min(delay, RETRY_CONFIG.maxDelay);
};

/**
 * Generic API request function with error handling and retry logic
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {},
  retryCount = 0
): Promise<unknown> => {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
    });

    const contentType = response.headers.get('content-type') || '';
    let data: unknown = null;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // fallback: read as text for non-JSON responses
      const text = await response.text();
      data = text;
    }

    if (!response.ok) {
      // Try to extract useful error message
      const errMsg =
        (data && data.error) ||
        (typeof data === 'string' ? data : null) ||
        `HTTP ${response.status}: ${response.statusText}`;

      // Retry for network errors or server errors (5xx)
      if (retryCount < RETRY_CONFIG.maxRetries && (
        response.status >= 500 ||
        response.status === 408 || // Request timeout
        response.status === 429    // Too many requests
      )) {
        const delay = getRetryDelay(retryCount);
        console.warn(`API request failed, retrying in ${delay}ms... (${retryCount + 1}/${RETRY_CONFIG.maxRetries})`);
        await sleep(delay);
        return apiRequest(endpoint, options, retryCount + 1);
      }

      throw new Error(errMsg);
    }

    // Normalize non-JSON successful responses into an object
    if (typeof data === 'string') {
      return { ok: true, text: data };
    }

    return data;
  } catch (error) {
    // Handle network errors with retry
    if (retryCount < RETRY_CONFIG.maxRetries && (
      error instanceof TypeError || // Network errors
      error.name === 'AbortError'   // Request aborted
    )) {
      const delay = getRetryDelay(retryCount);
      console.warn(`Network error, retrying in ${delay}ms... (${retryCount + 1}/${RETRY_CONFIG.maxRetries})`);
      await sleep(delay);
      return apiRequest(endpoint, options, retryCount + 1);
    }

    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

/**
 * Lead Submission API
 * Used in contact forms
 */
export const submitLead = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
}) => {
  return apiRequest('/lead', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Newsletter Subscription API
 */
export const subscribeNewsletter = async (data: {
  email: string;
}) => {
  return apiRequest('/newsletter', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Course Inquiry API
 * Used when downloading brochures
 */
export const submitCourseInquiry = async (data: {
  fullName: string;
  email: string;
  phone: string;
  course: string;
}) => {
  return apiRequest('/course-inquiry', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Health Check API
 * Used to verify backend connectivity
 */
export const checkHealth = async () => {
  return apiRequest('/health');
};
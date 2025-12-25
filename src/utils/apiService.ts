/**
 * API Service Utility for connecting frontend to backend
 * Location: src/services/api.ts
 */

// Base URL for API requests — set `VITE_API_URL` to your backend root (e.g. https://api.example.com)
const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Generic API request function with error handling
 */
const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
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
    let data: any = null;

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
      throw new Error(errMsg);
    }

    // Normalize non-JSON successful responses into an object
    if (typeof data === 'string') {
      return { ok: true, text: data };
    }

    return data;
  } catch (error) {
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
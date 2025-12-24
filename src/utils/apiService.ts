/**
 * API Service Utility for connecting frontend to backend
 * Location: src/services/api.ts
 */

// Base URL for API requests
const API_BASE_URL = import.meta.env.DEV 
  ? 'https://newusbackend.vercel.app'  // Development: direct backend URL
  : import.meta.env.VITE_API_URL || '';  // Production: use env variable

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

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || 
        `HTTP ${response.status}: ${response.statusText}`
      );
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
  brochureUrl?: string;
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
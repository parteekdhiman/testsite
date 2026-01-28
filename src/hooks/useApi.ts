import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Custom hook for API calls with loading and error states
 */
export const useApiCall = <TData = unknown, TVariables = unknown>(
  apiFunction: (variables: TVariables) => Promise<TData>,
  options?: {
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
    successMessage?: string;
    errorMessage?: string;
  }
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<TData | null>(null);

  const execute = useCallback(async (variables: TVariables) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await apiFunction(variables);
      setData(result);

      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      if (options?.successMessage) {
        // You can integrate with your toast system here
        console.log(options.successMessage);
      }

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);

      if (options?.onError) {
        options.onError(error);
      }

      if (options?.errorMessage) {
        // You can integrate with your toast system here
        console.error(options.errorMessage, error.message);
      }

      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [apiFunction, options]);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    data,
    error,
    isLoading,
    reset,
    isSuccess: data !== null,
    isError: error !== null,
  };
};

/**
 * Hook for form submissions with API calls
 */
export const useFormSubmission = <TData = unknown>(
  apiFunction: (data: unknown) => Promise<TData>,
  options?: {
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: TData) => void;
    onError?: (error: Error) => void;
  }
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<Error | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const submit = useCallback(async (formData: unknown) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await apiFunction(formData);
      setSubmitSuccess(true);

      if (options?.onSuccess) {
        options.onSuccess(result);
      }

      if (options?.successMessage) {
        console.log(options.successMessage);
      }

      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Submission failed');
      setSubmitError(error);

      if (options?.onError) {
        options.onError(error);
      }

      if (options?.errorMessage) {
        console.error(options.errorMessage, error.message);
      }

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [apiFunction, options]);

  const reset = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    setSubmitSuccess(false);
  }, []);

  return {
    submit,
    isSubmitting,
    submitError,
    submitSuccess,
    reset,
  };
};

/**
 * Hook for API health checks with retry logic
 */
export const useApiHealth = () => {
  return useQuery({
    queryKey: ['api-health'],
    queryFn: async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/health`);
        if (!response.ok) {
          throw new Error(`Health check failed: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.warn('API health check failed:', error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });
};
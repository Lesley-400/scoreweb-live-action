
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SecureErrorHandler, SecurityMonitor } from '../utils/security';

interface ApiOptions {
  timeout?: number;
  retries?: number;
}

export const useSecureApi = () => {
  const secureRequest = useCallback(async <T>(
    operation: () => Promise<T>,
    context: string,
    options: ApiOptions = {}
  ): Promise<{ data: T | null; error: string | null }> => {
    const { timeout = 10000, retries = 2 } = options;
    let lastError: Error | null = null;

    // Create timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeout);
    });

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        // Race between the operation and timeout
        const result = await Promise.race([operation(), timeoutPromise]);
        
        // Log successful operation
        SecurityMonitor.logSecurityEvent('API_SUCCESS', {
          context,
          attempt: attempt + 1,
        });

        return { data: result, error: null };
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error');
        
        // Log the attempt
        SecurityMonitor.logSecurityEvent('API_ERROR', {
          context,
          attempt: attempt + 1,
          error: lastError.message,
        });

        // Don't retry on certain errors
        if (lastError.message.includes('unauthorized') || lastError.message.includes('forbidden')) {
          break;
        }

        // Wait before retry (exponential backoff)
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }
    }

    // Handle the final error
    const errorResponse = SecureErrorHandler.handleError(lastError, context);
    return { data: null, error: errorResponse.message };
  }, []);

  const secureSupabaseQuery = useCallback(async <T>(
    queryFn: () => Promise<{ data: T | null; error: any }>,
    context: string
  ) => {
    return secureRequest(async () => {
      const { data, error } = await queryFn();
      if (error) {
        throw new Error(error.message || 'Supabase query failed');
      }
      return data;
    }, context);
  }, [secureRequest]);

  return {
    secureRequest,
    secureSupabaseQuery,
  };
};

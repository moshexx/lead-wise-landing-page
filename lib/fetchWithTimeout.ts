/**
 * Fetch utility with timeout and retry capabilities
 * Prevents hanging requests and provides automatic retry logic
 */

export interface FetchWithTimeoutOptions extends RequestInit {
  timeoutMs?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Fetch with automatic timeout using AbortController
 * @param url - The URL to fetch
 * @param options - Fetch options including timeout settings
 * @returns Promise<Response>
 * @throws Error if request times out or fails after retries
 */
export async function fetchWithTimeout(
  url: string,
  options: FetchWithTimeoutOptions = {}
): Promise<Response> {
  const {
    timeoutMs = 10000, // Default 10 seconds
    retries = 0,
    retryDelay = 1000,
    ...fetchOptions
  } = options;

  let lastError: Error | null = null;

  // Try request with retries
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      // Check if it's an abort error (timeout)
      if (error instanceof Error && error.name === 'AbortError') {
        lastError = new Error(`Request timeout after ${timeoutMs}ms`);
      } else if (error instanceof Error) {
        lastError = error;
      } else {
        lastError = new Error('Unknown error occurred');
      }

      // If this is the last attempt, throw the error
      if (attempt === retries) {
        throw lastError;
      }

      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, retryDelay * (attempt + 1)));
    }
  }

  // This should never be reached, but TypeScript requires it
  throw lastError || new Error('Request failed');
}

/**
 * Fetch with retry logic for failed requests
 * @param url - The URL to fetch
 * @param options - Fetch options
 * @param maxRetries - Maximum number of retry attempts (default: 2)
 * @returns Promise<Response>
 */
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries: number = 2
): Promise<Response> {
  return fetchWithTimeout(url, {
    ...options,
    retries: maxRetries,
  });
}

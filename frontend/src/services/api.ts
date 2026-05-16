/**
 * Base API configuration and utilities
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Enhanced fetch wrapper with timeout support
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { timeout = 10000, ...fetchOptions } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      throw new Error(
        `API Error: ${response.status} ${response.statusText}`
      );
    }

    return response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

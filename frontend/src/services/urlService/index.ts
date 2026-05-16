/**
 * URL Shortening Service
 * Handles all API calls to the URL Shortener backend
 */

import { apiFetch } from '../api';
import type { ShortenUrlRequest, ShortenUrlResponse } from './types';

export class UrlService {
  /**
   * Shorten a URL using the backend API
   * @param url - The original URL to shorten
   * @returns Promise with shortened URL and short code
   * @throws Error if the request fails or URL is invalid
   */
  static async shortenUrl(url: string): Promise<ShortenUrlResponse> {
    const request: ShortenUrlRequest = { url };

    try {
      const response = await apiFetch<ShortenUrlResponse>('/url/shorten', {
        method: 'POST',
        body: JSON.stringify(request),
      });

      return response;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to shorten URL';
      throw new Error(message);
    }
  }
}

// Named export for the service
export default UrlService;

// Re-export types for convenience
export type { ShortenUrlRequest, ShortenUrlResponse } from './types';

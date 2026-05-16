/**
 * URL Shortening Service Types
 * Matches backend: UrlShortener.Api/Controllers/UrlController.cs
 */

export interface ShortenUrlRequest {
  url: string;
}

export interface ShortenUrlResponse {
  shortenedUrl: string;
  shortCode: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}

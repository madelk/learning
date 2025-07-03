/**
 * Valid app names in the workspace
 */
export type AppName = 'react' | 'vue' | 'webcomponents';

/**
 * Detects if the current environment is running on localhost
 * @returns true if running on localhost or 127.0.0.1, false otherwise or if running in non-browser environment
 */
export const isLocalhost =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1');

/**
 * Extracts the app name from a URL path
 * @param path The URL path to analyze
 * @returns The detected app name (react, vue, webcomponents)
 */
export function detectAppFromPath(path: string): AppName {
  if (path.includes('/webcomponents')) return 'webcomponents';
  if (path.includes('/vue')) return 'vue';
  if (path.includes('/react')) return 'react';
  return 'react';
}

/**
 * Determines which app is currently running based on URL and user agent
 * @returns The current app name, defaulting to 'react' if unable to determine
 */
export function getCurrentApp(): AppName {
  if (typeof window === 'undefined') return 'react';

  const path = window.location.pathname;
  const port = window.location.port;

  if (isLocalhost) {
    // Local development - detect by port
    switch (port) {
      case '4200':
        return 'react';
      case '4202':
        return 'webcomponents';
      case '4203':
        return 'vue';
      default:
        // Fallback: check path for app name
        return detectAppFromPath(path);
    }
  } else {
    // Production - detect by path
    return detectAppFromPath(path);
  }
}

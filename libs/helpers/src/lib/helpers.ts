
// Detect current environment (local vs production)
export const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Helper to detect app from path
export function detectAppFromPath(path: string): string {
  if (path.includes('/reactnative')) return 'reactnative';
  if (path.includes('/webcomponents')) return 'webcomponents';
  if (path.includes('/vue')) return 'vue';
  if (path.includes('/react')) return 'react';
  return 'react';
}

// Detect current app from URL
export function getCurrentApp(): string {
  if (typeof window === 'undefined') return 'react';
  
  const path = window.location.pathname;
  const port = window.location.port;
  const userAgent = window.navigator.userAgent.toLowerCase();

  // Try to detect React Native web by user agent or path
  if (userAgent.includes('reactnative') || path.includes('/reactnative')) {
    return 'reactnative';
  }

  if (isLocalhost) {
    // Local development - detect by port
    switch (port) {
      case '4200': return 'react';
      case '4201': return 'reactnative';
      case '4202': return 'webcomponents';
      case '4203': return 'vue';
      default:
        // Fallback: check path for app name
        return detectAppFromPath(path);
    }
  } else {
    // Production - detect by path
    return detectAppFromPath(path);
  }
}
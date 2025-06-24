import type { NavBarConfig } from '../types';

// Framework SVG icons (official SVGs as strings)
const FRAMEWORK_ICONS = {
  react: `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="20" cy="20" rx="3.5" ry="3.5" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="2" fill="none"><ellipse rx="18" ry="7.5" transform="matrix(.866 .5 -.866 .5 20 20)"/><ellipse rx="18" ry="7.5" transform="matrix(-.866 .5 .866 .5 20 20)"/><ellipse rx="18" ry="7.5" transform="matrix(0 1 1 0 20 20)"/></g></g></svg>`,
  vue: `<svg width="20" height="20" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg"><g><polygon fill="#41B883" points="130.88 0 0 0 130.88 226.69 261.76 0 130.88 0"/><polygon fill="#34495E" points="130.88 41.73 44.13 41.73 130.88 192.73 217.63 41.73 130.88 41.73"/><polygon fill="#41B883" points="130.88 73.73 76.13 73.73 130.88 169.73 185.63 73.73 130.88 73.73"/></g></svg>`,
  webcomponents: `<svg width="20" height="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g><rect x="2" y="6" width="28" height="20" rx="3" fill="#29ABE2"/><rect x="6" y="10" width="20" height="12" rx="2" fill="#fff"/><rect x="10" y="14" width="12" height="4" rx="1" fill="#29ABE2"/></g></svg>`,
  reactnative: `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g><ellipse cx="20" cy="20" rx="3.5" ry="3.5" fill="#61DAFB"/><g stroke="#61DAFB" stroke-width="2" fill="none"><ellipse rx="18" ry="7.5" transform="matrix(.866 .5 -.866 .5 20 20)"/><ellipse rx="18" ry="7.5" transform="matrix(-.866 .5 .866 .5 20 20)"/><ellipse rx="18" ry="7.5" transform="matrix(0 1 1 0 20 20)"/></g><rect x="16" y="32" width="8" height="3" rx="1.5" fill="#61DAFB"/></g></svg>` // React Native: React logo + bar for mobile
};

// Detect current environment (local vs production)
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Helper to detect app from path
function detectAppFromPath(path: string): string {
  if (path.includes('/reactnative')) return 'reactnative';
  if (path.includes('/webcomponents')) return 'webcomponents';
  if (path.includes('/vue')) return 'vue';
  if (path.includes('/react')) return 'react';
  return 'react';
}

// Detect current app from URL
function getCurrentApp(): string {
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

// Helper to get the current subpath after the app segment
function getCurrentSubPath(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  // Match /appname/anything or /appname
  const match = path.match(/^\/(react|vue|webcomponents|reactnative)(\/.*)?$/);
  return match && match[2] ? match[2] : '/';
}

// Default shared configuration
export const DEFAULT_NAVBAR_CONFIG: NavBarConfig = {
    items: [
        { label: 'Home', href: `/${getCurrentApp()}/` },
        { label: 'About', href: `/${getCurrentApp()}/about` },
    ],
    appSelector: {
        enabled: true,
        currentApp: getCurrentApp(),
        apps: [
            {
                id: 'react',
                name: 'React',
                icon: FRAMEWORK_ICONS.react,
                localUrl: `http://localhost:4200/react${getCurrentSubPath()}`,
                prodUrl: `https://www.madelk.co.uk/react${getCurrentSubPath()}`
            },
            {
                id: 'vue',
                name: 'Vue',
                icon: FRAMEWORK_ICONS.vue,
                localUrl: `http://localhost:4203/vue${getCurrentSubPath()}`,
                prodUrl: `https://www.madelk.co.uk/vue${getCurrentSubPath()}`
            },
            {
                id: 'webcomponents',
                name: 'Web Components',
                icon: FRAMEWORK_ICONS.webcomponents,
                localUrl: `http://localhost:4202/webcomponents${getCurrentSubPath()}`,
                prodUrl: `https://www.madelk.co.uk/webcomponents${getCurrentSubPath()}`
            },
            {
                id: 'reactnative',
                name: 'React Native',
                icon: FRAMEWORK_ICONS.reactnative,
                localUrl: `http://localhost:4201/reactnative${getCurrentSubPath()}`,
                prodUrl: `https://www.madelk.co.uk/reactnative${getCurrentSubPath()}`
            }
        ]
    },
    styles: {
        container: {
            backgroundColor: '#333',
            padding: '1rem',
            gap: '1rem',
            display: 'flex',
            flexDirection: 'row',
        },
        link: {
            color: 'white',
            padding: '0.5rem',
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            textDecoration: 'none',
        },
        dropdown: {
            backgroundColor: '#444',
            border: '1px solid #555',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            color: 'white',
            padding: '0.5rem',
            fontSize: '16px',
            cursor: 'pointer',
            minWidth: '150px',
        },
        dropdownItem: {
            padding: '0.5rem',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            color: 'white',
            hoverBackgroundColor: '#555',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
        },
    },
};

export { getCurrentApp, isLocalhost };

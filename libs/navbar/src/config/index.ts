import type { NavBarConfig } from '../types';

// Framework SVG icons (simplified for this example)
const FRAMEWORK_ICONS = {
  react: '⚛️',
  vue: '🟢',
  webcomponents: '🔧',
  reactnative: '📱'
};

// Detect current environment (local vs production)
const isLocalhost = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

// Detect current app from URL
function getCurrentApp(): string {
  if (typeof window === 'undefined') return 'react';
  
  const path = window.location.pathname;
  const port = window.location.port;
  
  if (isLocalhost) {
    // Local development - detect by port
    switch (port) {
      case '4200': return 'react';
      case '4201': return 'reactnative';
      case '4202': return 'webcomponents';
      case '4203': return 'vue';
      default: return 'react';
    }
  } else {
    // Production - detect by path
    if (path.includes('/react')) return 'react';
    if (path.includes('/reactnative')) return 'reactnative';
    if (path.includes('/webcomponents')) return 'webcomponents';
    if (path.includes('/vue')) return 'vue';
    return 'react';
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

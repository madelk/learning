import type { NavBarConfig } from '../types';

// Port configuration for local development
const APP_PORTS = {
  react: 4200,
  vue: 4203,
  webcomponents: 4202,
  reactnative: 4201,
} as const;

// Domain configuration
const DOMAINS = {
  local: 'http://localhost',
  production: 'https://www.madelk.co.uk',
} as const;

// Get icons for all frameworks (local and production)
export function getIcons(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const { hostname } = window.location;
  const isLocal = hostname === 'localhost' || hostname === '127.0.0.1';
  
  if (isLocal) {
    return {
      react: `${DOMAINS.local}:${APP_PORTS.react}/react/favicon.png`,
      vue: `${DOMAINS.local}:${APP_PORTS.vue}/vue/favicon.png`,
      webcomponents: `${DOMAINS.local}:${APP_PORTS.webcomponents}/webcomponents/favicon.png`,
      reactnative: `${DOMAINS.local}:${APP_PORTS.reactnative}/reactnative/favicon.png`,
    };
  } else {
    return {
      react: `${DOMAINS.production}/react/favicon.png`,
      vue: `${DOMAINS.production}/vue/favicon.png`,
      webcomponents: `${DOMAINS.production}/webcomponents/favicon.png`,
      reactnative: `${DOMAINS.production}/reactnative/favicon.png`,
    };
  }
}

// Framework favicon PNGs as <img> tags using getIcons
function getFrameworkIcons(): Record<string, string> {
  const icons = getIcons();
  return {
    react: `<img src="${icons.react || ''}" alt="React" width="20" height="20" />`,
    vue: `<img src="${icons.vue || ''}" alt="Vue" width="20" height="20" />`,
    webcomponents: `<img src="${icons.webcomponents || ''}" alt="Web Components" width="20" height="20" />`,
    reactnative: `<img src="${icons.reactnative || ''}" alt="React Native" width="20" height="20" />`
  };
}

const FRAMEWORK_ICONS = getFrameworkIcons();

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
  const userAgent = window.navigator.userAgent.toLowerCase();

  // Try to detect React Native web by user agent or path
  if (userAgent.includes('reactnative') || path.includes('/reactnative')) {
    return 'reactnative';
  }

  return detectAppFromPath(path);
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
                localUrl: `${DOMAINS.local}:${APP_PORTS.react}/react${getCurrentSubPath()}`,
                prodUrl: `${DOMAINS.production}/react${getCurrentSubPath()}`
            },
            {
                id: 'vue',
                name: 'Vue',
                icon: FRAMEWORK_ICONS.vue,
                localUrl: `${DOMAINS.local}:${APP_PORTS.vue}/vue${getCurrentSubPath()}`,
                prodUrl: `${DOMAINS.production}/vue${getCurrentSubPath()}`
            },
            {
                id: 'webcomponents',
                name: 'Web Components',
                icon: FRAMEWORK_ICONS.webcomponents,
                localUrl: `${DOMAINS.local}:${APP_PORTS.webcomponents}/webcomponents${getCurrentSubPath()}`,
                prodUrl: `${DOMAINS.production}/webcomponents${getCurrentSubPath()}`
            },
            {
                id: 'reactnative',
                name: 'React Native',
                icon: FRAMEWORK_ICONS.reactnative,
                localUrl: `${DOMAINS.local}:${APP_PORTS.reactnative}/reactnative${getCurrentSubPath()}`,
                prodUrl: `${DOMAINS.production}/reactnative${getCurrentSubPath()}`
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

export { getCurrentApp };

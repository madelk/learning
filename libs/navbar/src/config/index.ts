import type { NavBarConfig } from '../types';

// Default shared configuration
export const DEFAULT_NAVBAR_CONFIG: NavBarConfig = {
  items: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
  ],
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
  },
};

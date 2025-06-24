// Shared navbar configuration and styling
export interface NavBarConfig {
  items: NavBarItem[];
  styles: NavBarStyles;
}

export interface NavBarItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavBarStyles {
  container: {
    backgroundColor: string;
    padding: string;
    gap: string;
    display?: string;
    flexDirection?: string;
  };
  link: {
    color: string;
    padding: string;
    backgroundColor?: string;
    border?: string;
    fontSize?: string;
    cursor?: string;
    textDecoration?: string;
  };
}

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

// Helper function to generate CSS string from styles
export function generateCSS(styles: NavBarStyles): string {
  return `
    :host {
      display: block;
      background: ${styles.container.backgroundColor};
      color: ${styles.link.color};
      padding: ${styles.container.padding};
    }
    nav {
      display: ${styles.container.display};
      gap: ${styles.container.gap};
      flex-direction: ${styles.container.flexDirection};
    }
    a {
      color: ${styles.link.color};
      text-decoration: ${styles.link.textDecoration};
      padding: ${styles.link.padding};
    }
  `;
}

// Helper function to generate nav items HTML
export function generateNavHTML(items: NavBarItem[]): string {
  const links = items
    .map(item => `<a href="${item.href || '#'}">${item.label}</a>`)
    .join('');
  return `<nav>${links}</nav>`;
}

import type { NavBarStyles, NavBarItem } from '../types';

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

// Helper function to convert shared styles to web-compatible styles
export function convertToWebStyles(styles: Record<string, string | undefined>): React.CSSProperties {
  return {
    display: styles.display,
    flexDirection: styles.flexDirection as React.CSSProperties['flexDirection'],
    backgroundColor: styles.backgroundColor,
    padding: styles.padding,
    gap: styles.gap,
    color: styles.color,
    border: styles.border,
    fontSize: styles.fontSize,
    cursor: styles.cursor,
    textDecoration: styles.textDecoration,
  };
}

import { isLocalhost } from '@study/helpers';
import type { CSSProperties } from 'react';

import type {
  NavBarStyles,
  NavBarItem,
  AppSelectorConfig,
  AppOption
} from '../types/index.js';

/** Converts a NavBarStyles object into a CSS string representation */
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
      align-items: center;
    }
    a {
      color: ${styles.link.color};
      text-decoration: ${styles.link.textDecoration};
      padding: ${styles.link.padding};
    }
    .app-selector {
      position: relative;
      margin-right: auto;
      display: inline-block;
    }
    .app-selector-button {
      background: ${styles.dropdown.backgroundColor};
      border: ${styles.dropdown.border};
      border-radius: ${styles.dropdown.borderRadius};
      color: ${styles.dropdown.color};
      padding: ${styles.dropdown.padding};
      font-size: ${styles.dropdown.fontSize};
      cursor: ${styles.dropdown.cursor};
      min-width: ${styles.dropdown.minWidth};
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: space-between;
    }
    .app-selector-dropdown {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      background: ${styles.dropdown.backgroundColor};
      border: ${styles.dropdown.border};
      border-radius: ${styles.dropdown.borderRadius};
      box-shadow: ${styles.dropdown.boxShadow};
      min-width: 200px;
      z-index: 9999;
      display: none;
    }
    .app-selector-dropdown.open {
      display: block;
    }
    .app-selector-item {
      padding: ${styles.dropdownItem.padding};
      cursor: ${styles.dropdownItem.cursor};
      background: ${styles.dropdownItem.backgroundColor};
      color: ${styles.dropdownItem.color};
      display: ${styles.dropdownItem.display};
      align-items: ${styles.dropdownItem.alignItems};
      gap: ${styles.dropdownItem.gap};
      border: none;
      width: 100%;
      text-align: left;
    }
    .app-selector-item:hover {
      background: ${styles.dropdownItem.hoverBackgroundColor};
    }
    .app-selector-item.current {
      background: ${styles.dropdownItem.hoverBackgroundColor};
      font-weight: bold;
    }
    .app-icon {
      font-size: 1.2em;
    }
    .dropdown-arrow {
      transition: transform 0.2s;
    }
    .dropdown-arrow.open {
      transform: rotate(180deg);
    }
  `;
}

/** Generates HTML markup for navigation items based on the provided configuration */
export function generateNavHTML(items: NavBarItem[]): string {
  const links = items
    .map((item) => `<a href="${item.href || '#'}">${item.label}</a>`)
    .join('');
  return `<nav>${links}</nav>`;
}

/** Generates HTML markup for the app selector dropdown based on the provided configuration */
export function generateAppSelectorHTML(
  appSelector: AppSelectorConfig
): string {
  if (!appSelector.enabled) return '';

  const currentApp = appSelector.apps.find(
    (app) => app.id === appSelector.currentApp
  );
  const currentIcon = currentApp?.icon || '🔧';
  const currentName = currentApp?.name || 'Unknown';

  const dropdownItems = appSelector.apps
    .map((app) => {
      const isCurrent = app.id === appSelector.currentApp;
      const url = isLocalhost ? app.localUrl : app.prodUrl;
      return `
        <button class="app-selector-item ${isCurrent ? 'current' : ''}" 
                data-url="${url}" 
                data-app-id="${app.id}">
          <span class="app-icon">${app.icon}</span>
          <span>${app.name}</span>
          ${isCurrent ? '<span style="margin-left: auto;">✓</span>' : ''}
        </button>
      `;
    })
    .join('');

  return `
    <div class="app-selector">
      <button class="app-selector-button" id="app-selector-toggle">
        <span class="app-icon">${currentIcon}</span>
        <span>${currentName}</span>
        <span class="dropdown-arrow">▼</span>
      </button>
      <div class="app-selector-dropdown" id="app-selector-dropdown">
        ${dropdownItems}
      </div>
    </div>
  `;
}

/** Returns the appropriate URL for an app based on environment and configuration */
export function getAppUrl(app: AppOption): string {
  return isLocalhost ? app.localUrl : app.prodUrl;
}

/** Converts React Native style properties to web-compatible CSS properties */
export function convertToWebStyles(styles: CSSProperties): React.CSSProperties {
  return styles;
}

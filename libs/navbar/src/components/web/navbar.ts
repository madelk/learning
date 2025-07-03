import { getNavbarConfig } from '../../config/custom-config.js';
import {
  generateCSS,
  generateNavHTML,
  generateAppSelectorHTML
} from '../../utils/index.js';
import type { NavBarConfig } from '../../types/index.js';

export class NavBar extends HTMLElement {
  private config: NavBarConfig;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.config = getNavbarConfig();
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  private render() {
    if (this.shadowRoot) {
      const appSelectorHTML = this.config.appSelector?.enabled
        ? generateAppSelectorHTML(this.config.appSelector)
        : '';

      this.shadowRoot.innerHTML = `
        <style>
          ${generateCSS(this.config.styles)}
        </style>
        <nav>
          ${appSelectorHTML}
          ${generateNavHTML(this.config.items)}
        </nav>
      `;
    }
  }

  private setupEventListeners() {
    if (!this.shadowRoot) return;

    // App selector toggle
    const toggleButton = this.shadowRoot.getElementById('app-selector-toggle');
    const dropdown = this.shadowRoot.getElementById('app-selector-dropdown');
    const arrow = this.shadowRoot.querySelector('.dropdown-arrow');

    if (toggleButton && dropdown) {
      toggleButton.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown.classList.contains('open');
        dropdown.classList.toggle('open', !isOpen);
        arrow?.classList.toggle('open', !isOpen);
      });

      // Close dropdown when clicking outside
      document.addEventListener('click', () => {
        dropdown.classList.remove('open');
        arrow?.classList.remove('open');
      });

      // App selector items
      const appItems = this.shadowRoot.querySelectorAll('.app-selector-item');
      appItems.forEach((item) => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const url = (item as HTMLElement).dataset['url'];
          if (url) {
            window.location.href = url;
          }
        });
      });
    }
  }
}

customElements.define('custom-navbar', NavBar);

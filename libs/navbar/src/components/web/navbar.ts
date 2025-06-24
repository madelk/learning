import { DEFAULT_NAVBAR_CONFIG } from '../../config';
import { generateCSS, generateNavHTML } from '../../utils';
import type { NavBarConfig } from '../../types';

export class NavBar extends HTMLElement {
  private config: NavBarConfig = DEFAULT_NAVBAR_CONFIG;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          ${generateCSS(this.config.styles)}
        </style>
        ${generateNavHTML(this.config.items)}
      `;
    }
  }
}

customElements.define('custom-navbar', NavBar);

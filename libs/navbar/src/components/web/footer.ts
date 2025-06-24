// @ts-expect-error: Vite CSS import as string for shadow DOM injection
import footerStyles from '../../footer.css?inline';

export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>${footerStyles}</style>
        <footer class="footer">
          <a class="footer-link-button" href="https://github.com/madelk/learning" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </footer>
      `;
    }
  }
}

customElements.define('custom-footer', Footer);

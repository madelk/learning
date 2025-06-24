export class Footer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    if (this.shadowRoot) {
      // Attempt to fetch the shared CSS file using a relative path
      let css = '';
      try {
        // This assumes the built output will serve footer.css at this relative path
        const resp = await fetch('/libs/navbar/src/footer.css');
        css = await resp.text();
      } catch {
        // fallback: no styles loaded
      }
      this.shadowRoot.innerHTML = `
        <style>${css}</style>
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

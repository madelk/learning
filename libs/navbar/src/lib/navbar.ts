export class NavBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            background: #333;
            color: white;
            padding: 1rem;
          }
          nav {
            display: flex;
            gap: 1rem;
          }
          a {
            color: white;
            text-decoration: none;
          }
        </style>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
        </nav>
      `;
    }
  }
}

customElements.define('custom-navbar', NavBar);

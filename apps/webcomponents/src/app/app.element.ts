import './app.element.scss';
import './about.element';
import './main.element';

export class AppElement extends HTMLElement {
  public static readonly observedAttributes = [];

  private hashChangeListener = () => this.render();

  connectedCallback() {
    this.render();
    globalThis.addEventListener('hashchange', this.hashChangeListener);
  }

  disconnectedCallback() {
    globalThis.removeEventListener('hashchange', this.hashChangeListener);
  }
  render() {
    // Support for /webcomponents base path
    const basePath = '/webcomponents';
    let route = location.hash.replace('#', '');
    if (!route) {
      // If no hash, use pathname after basePath
      route = location.pathname.startsWith(basePath) ? location.pathname.slice(basePath.length) : '/';
    } else if (route.startsWith(basePath)) {
      route = route.slice(basePath.length);
    }
    if (!route.startsWith('/')) route = '/' + route;
    let content = '';
    content = route === '/about' ? '<about-page></about-page>' : `<main-page></main-page>`;
    this.innerHTML = `
      <div class="wrapper">
        <div class="container">
          ${content}
        </div>
        <custom-footer></custom-footer>
      </div>
    `;
  }
}
customElements.define('study-root', AppElement);

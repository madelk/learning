import './app.element.scss';
import './about.element';
import './main.element';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  private hashChangeListener = () => this.render();

  connectedCallback() {
    this.render();
    window.addEventListener('hashchange', this.hashChangeListener);
  }

  disconnectedCallback() {
    window.removeEventListener('hashchange', this.hashChangeListener);
  }
  render() {
    // Support for /webcomponents base path
    const basePath = '/webcomponents';
    let route = location.hash.replace('#', '');
    if (!route) {
      // If no hash, use pathname after basePath
      if (location.pathname.startsWith(basePath)) {
        route = location.pathname.slice(basePath.length);
      } else {
        route = '/';
      }
    } else if (route.startsWith(basePath)) {
      route = route.slice(basePath.length);
    }
    if (!route.startsWith('/')) route = '/' + route;
    let content = '';
    if (route === '/about') {
      content = '<about-page></about-page>';
    } else {
      content = `<main-page></main-page>`;
    }
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

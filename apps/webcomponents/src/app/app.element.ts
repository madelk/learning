import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    this.innerHTML = `
    <div class="wrapper">
      <div class="container">
        <h1>We got web components working!</h1>
      </div>
      <custom-footer></custom-footer>
    </div>
      `;
  }
}
customElements.define('study-root', AppElement);

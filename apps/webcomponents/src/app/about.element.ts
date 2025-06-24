export class AboutElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <h1>About</h1>
          <p>This is the about page for the Web Components app.</p>
        </div>
      </div>
    `;
  }
}
customElements.define('about-page', AboutElement);

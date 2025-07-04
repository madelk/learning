import {getHomepageText} from '@study/pagetext';

const text = getHomepageText();

export class MainElement extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="wrapper">
        <div class="container">
          <h1 class="${text.title.className}">${text.title.text}</h1>
          ${text.paragraphs.text.map((paragraph: string) => `
            <p class="${text.paragraphs.className}">${paragraph}</p>
          `).join('')}
        </div>
      </div>
    `;
  }
}
customElements.define('main-page', MainElement);

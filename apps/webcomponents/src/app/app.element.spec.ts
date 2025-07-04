import { AppElement } from './app.element';
import { getHomepageText } from '@study/pagetext';

describe('AppElement', () => {
  let app: AppElement;

  beforeAll(() => {
    // Ensure custom elements are defined
    if (!customElements.get('study-root')) {
      customElements.define('study-root', AppElement);
    }
    if (!customElements.get('main-page')) {
      // Create a mock main page that matches the real implementation
      class MockMainPage extends HTMLElement {
        connectedCallback() {
          const text = getHomepageText();
          this.innerHTML = `
            <div class="wrapper">
              <div class="container">
                <h1 class="${text.title.className}">${text.title.text}</h1>
                ${text.paragraphs.text
                  .map(
                    (p, i) => `
                  <p class="${text.paragraphs.className}" key="${i}">${p}</p>
                `
                  )
                  .join('')}
              </div>
            </div>
          `;
        }
      }
      customElements.define('main-page', MockMainPage);
    }
  });

  beforeEach(() => {
    app = new AppElement();
  });

  it('should create successfully', () => {
    expect(app).toBeTruthy();
  });

  it('should have a greeting', async () => {
    // Arrange
    const text = getHomepageText();
    document.body.append(app);
    app.connectedCallback();

    // Act
    // Give the component a chance to render
    await new Promise((resolve) => setTimeout(resolve, 0));
    const mainPage = app.querySelector('main-page');
    const heading =
      mainPage?.querySelector('h1') ||
      mainPage?.querySelector('h2') ||
      mainPage?.shadowRoot?.querySelector('h1') ||
      mainPage?.shadowRoot?.querySelector('h2');

    // Assert
    expect(mainPage).toBeTruthy();
    expect(heading).toBeTruthy();
    expect(heading?.innerHTML).toContain(text.title.text);

    // Cleanup
    app.remove();
  });
});

import './navbar';

describe('NavBar', () => {
  let element: HTMLElement;

  beforeEach(() => {
    element = document.createElement('custom-navbar');
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  it('should create the navbar element', () => {
    expect(element).toBeTruthy();
    expect(element.shadowRoot).toBeTruthy();
  });

  it('should render navigation links', () => {
    const links = element.shadowRoot?.querySelectorAll('a');
    expect(links?.length).toBe(3);
    
    expect(links?.[0].getAttribute('href')).toBe('/react/');
    expect(links?.[0].textContent).toBe('Home');
    
    expect(links?.[1].getAttribute('href')).toBe('/react/about');
    expect(links?.[1].textContent).toBe('About');

    expect(links?.[2].getAttribute('href')).toBe('/react/calculator');
    expect(links?.[2].textContent).toBe('Calculator');
  });

  it('should render app selector when enabled', () => {
    const appSelector = element.shadowRoot?.querySelector('.app-selector');
    expect(appSelector).toBeTruthy();
    
    const toggleButton = element.shadowRoot?.querySelector('#app-selector-toggle');
    expect(toggleButton).toBeTruthy();
    
    const dropdown = element.shadowRoot?.querySelector('#app-selector-dropdown');
    expect(dropdown).toBeTruthy();
  });

  it('should have app selector items for all frameworks', () => {
    const appItems = element.shadowRoot?.querySelectorAll('.app-selector-item');
    expect(appItems?.length).toBe(4); // React, Vue, Web Components, React Native
    
    // Check that framework icons are present
    const icons = element.shadowRoot?.querySelectorAll('.app-icon');
    expect(icons?.length).toBeGreaterThan(0);
  });

  it('should have the correct styles', () => {
    const style = element.shadowRoot?.querySelector('style');
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain('background: #333');
    expect(style?.textContent).toContain('color: white');
    expect(style?.textContent).toContain('.app-selector');
    expect(style?.textContent).toContain('.app-selector-dropdown');
  });
});

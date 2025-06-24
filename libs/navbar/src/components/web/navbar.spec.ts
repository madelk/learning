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
    expect(links?.length).toBe(2);
    
    expect(links?.[0].getAttribute('href')).toBe('/');
    expect(links?.[0].textContent).toBe('Home');
    
    expect(links?.[1].getAttribute('href')).toBe('/about');
    expect(links?.[1].textContent).toBe('About');
  });

  it('should have the correct styles', () => {
    const style = element.shadowRoot?.querySelector('style');
    expect(style).toBeTruthy();
    expect(style?.textContent).toContain('background: #333');
    expect(style?.textContent).toContain('color: white');
  });
});

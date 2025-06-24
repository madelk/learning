import { getFaviconPath } from './index';

describe('getFaviconPath', () => {
  const originalWindow = { ...window };

  afterEach(() => {
    // Restore window.location after each test
    Object.defineProperty(window, 'location', {
      value: originalWindow.location,
      writable: true,
    });
  });

  function mockLocation(hostname: string, port: string) {
    Object.defineProperty(window, 'location', {
      value: { hostname, port },
      writable: true,
    });
  }

  it('returns correct local favicon paths for each framework', () => {
    mockLocation('localhost', '4203');
    expect(getFaviconPath('vue')).toBe('/vue/favicon.png');
    mockLocation('localhost', '4200');
    expect(getFaviconPath('react')).toBe('/react/favicon.png');
    mockLocation('localhost', '4202');
    expect(getFaviconPath('webcomponents')).toBe('/webcomponents/favicon.png');
    mockLocation('localhost', '4201');
    expect(getFaviconPath('reactnative')).toBe('/reactnative/favicon.png');
  });

  it('returns correct prod favicon paths for each framework', () => {
    mockLocation('www.madelk.co.uk', '');
    expect(getFaviconPath('vue')).toBe('https://www.madelk.co.uk/vue/favicon.png');
    expect(getFaviconPath('react')).toBe('https://www.madelk.co.uk/react/favicon.png');
    expect(getFaviconPath('webcomponents')).toBe('https://www.madelk.co.uk/webcomponents/favicon.png');
    expect(getFaviconPath('reactnative')).toBe('https://www.madelk.co.uk/reactnative/favicon.png');
  });
});

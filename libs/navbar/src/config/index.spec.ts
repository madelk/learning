import { getIcons, isLocalhost } from './index.js';

describe('navbar config functions', () => {
  const originalWindow = { ...window };

  afterEach(() => {
    // Restore window.location after each test
    Object.defineProperty(window, 'location', {
      value: originalWindow.location,
      writable: true
    });
  });

  function mockLocation(hostname: string, pathname = '/') {
    Object.defineProperty(window, 'location', {
      value: { hostname, pathname },
      writable: true
    });
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'test-browser' },
      writable: true
    });
  }

  describe('getIcons', () => {
    it('returns correct local favicon URLs for each framework', () => {
      mockLocation('localhost');
      const icons = getIcons();
      expect(icons.react).toBe('http://localhost:4200/react/favicon.png');
      expect(icons.vue).toBe('http://localhost:4203/vue/favicon.png');
      expect(icons.webcomponents).toBe(
        'http://localhost:4202/webcomponents/favicon.png'
      );
      expect(icons.reactnative).toBe(
        'http://localhost:4201/reactnative/favicon.png'
      );
    });

    it('returns correct production favicon URLs for each framework', () => {
      mockLocation('www.madelk.co.uk');
      const icons = getIcons();
      expect(icons.react).toBe('https://www.madelk.co.uk/react/favicon.png');
      expect(icons.vue).toBe('https://www.madelk.co.uk/vue/favicon.png');
      expect(icons.webcomponents).toBe(
        'https://www.madelk.co.uk/webcomponents/favicon.png'
      );
      expect(icons.reactnative).toBe(
        'https://www.madelk.co.uk/reactnative/favicon.png'
      );
    });

    it('returns empty object when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error Testing window undefined scenario
      delete global.window;
      const icons = getIcons();
      expect(icons).toEqual({});
      global.window = originalWindow;
    });
  });

  describe('isLocalhost', () => {
    it('returns true for localhost', () => {
      mockLocation('localhost');
      expect(isLocalhost()).toBe(true);
    });

    it('returns true for 127.0.0.1', () => {
      mockLocation('127.0.0.1');
      expect(isLocalhost()).toBe(true);
    });

    it('returns false for production domains', () => {
      mockLocation('www.madelk.co.uk');
      expect(isLocalhost()).toBe(false);
    });

    it('returns false when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error Testing window undefined scenario
      delete global.window;
      expect(isLocalhost()).toBe(false);
      global.window = originalWindow;
    });
  });
});

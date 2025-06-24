import { getIcons, getCurrentApp, isLocalhost } from './index';

describe('navbar config functions', () => {
  const originalWindow = { ...window };

  afterEach(() => {
    // Restore window.location after each test
    Object.defineProperty(window, 'location', {
      value: originalWindow.location,
      writable: true,
    });
  });

  function mockLocation(hostname: string, pathname = '/') {
    Object.defineProperty(window, 'location', {
      value: { hostname, pathname },
      writable: true,
    });
    Object.defineProperty(window, 'navigator', {
      value: { userAgent: 'test-browser' },
      writable: true,
    });
  }

  describe('getIcons', () => {
    it('returns correct local favicon URLs for each framework', () => {
      mockLocation('localhost');
      const icons = getIcons();
      expect(icons.react).toBe('http://localhost:4200/react/favicon.png');
      expect(icons.vue).toBe('http://localhost:4203/vue/favicon.png');
      expect(icons.webcomponents).toBe('http://localhost:4202/webcomponents/favicon.png');
      expect(icons.reactnative).toBe('http://localhost:4201/reactnative/favicon.png');
    });

    it('returns correct production favicon URLs for each framework', () => {
      mockLocation('www.madelk.co.uk');
      const icons = getIcons();
      expect(icons.react).toBe('https://www.madelk.co.uk/react/favicon.png');
      expect(icons.vue).toBe('https://www.madelk.co.uk/vue/favicon.png');
      expect(icons.webcomponents).toBe('https://www.madelk.co.uk/webcomponents/favicon.png');
      expect(icons.reactnative).toBe('https://www.madelk.co.uk/reactnative/favicon.png');
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

  describe('getCurrentApp', () => {
    it('detects react app from path', () => {
      mockLocation('localhost', '/react/home');
      expect(getCurrentApp()).toBe('react');
    });

    it('detects vue app from path', () => {
      mockLocation('localhost', '/vue/about');
      expect(getCurrentApp()).toBe('vue');
    });

    it('detects webcomponents app from path', () => {
      mockLocation('localhost', '/webcomponents/docs');
      expect(getCurrentApp()).toBe('webcomponents');
    });

    it('detects reactnative app from path', () => {
      mockLocation('localhost', '/reactnative/mobile');
      expect(getCurrentApp()).toBe('reactnative');
    });

    it('detects reactnative app from user agent', () => {
      mockLocation('localhost', '/other');
      Object.defineProperty(window, 'navigator', {
        value: { userAgent: 'ReactNative/test' },
        writable: true,
      });
      expect(getCurrentApp()).toBe('reactnative');
    });

    it('defaults to react for unknown paths', () => {
      mockLocation('localhost', '/unknown');
      expect(getCurrentApp()).toBe('react');
    });

    it('returns react when window is undefined', () => {
      const originalWindow = global.window;
      // @ts-expect-error Testing window undefined scenario
      delete global.window;
      expect(getCurrentApp()).toBe('react');
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

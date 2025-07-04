import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { isLocalhost, getIcons } from './default-config.js';

describe('default-config utilities', () => {
  // Store original window.location to restore after tests
  let originalLocation: Location;
  beforeEach(() => {
    // Save original location
    originalLocation = globalThis.location;

    // Mock window.location using defineProperty to avoid TypeScript errors
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: {
        ...originalLocation,
        hostname: '',
        pathname: '/'
      }
    });
  });

  afterEach(() => {
    // Restore original location
    Object.defineProperty(globalThis, 'location', {
      writable: true,
      value: originalLocation
    });
    vi.resetAllMocks();
  });

  describe('isLocalhost', () => {
    it('should return true when hostname is localhost', () => {
      globalThis.location.hostname = 'localhost';
      expect(isLocalhost()).toBe(true);
    });

    it('should return true when hostname is 127.0.0.1', () => {
      globalThis.location.hostname = '127.0.0.1';
      expect(isLocalhost()).toBe(true);
    });

    it('should return false for production domains', () => {
      globalThis.location.hostname = 'www.madelk.co.uk';
      expect(isLocalhost()).toBe(false);
    });

    it('should return false when window is undefined', () => {
      // Mock a scenario where window is undefined (e.g., server-side rendering)
      const originalWindow = globalThis.window;
      // @ts-expect-error - intentionally setting window to undefined for test
      globalThis.window = undefined;

      expect(isLocalhost()).toBe(false);

      // Restore window
      globalThis.window = originalWindow;
    });
  });

  describe('getIcons', () => {
    it('should return local URLs when on localhost', () => {
      globalThis.location.hostname = 'localhost';
      const icons = getIcons();

      expect(icons.react).toContain('http://localhost:4200/react/favicon.png');
      expect(icons.vue).toContain('http://localhost:4203/vue/favicon.png');
      expect(icons.webcomponents).toContain(
        'http://localhost:4202/webcomponents/favicon.png'
      );

    });

    it('should return production URLs when not on localhost', () => {
      globalThis.location.hostname = 'www.madelk.co.uk';
      const icons = getIcons();

      expect(icons.react).toContain(
        'https://www.madelk.co.uk/react/favicon.png'
      );
      expect(icons.vue).toContain('https://www.madelk.co.uk/vue/favicon.png');
      expect(icons.webcomponents).toContain(
        'https://www.madelk.co.uk/webcomponents/favicon.png'
      );

    });

    it('should return empty object when window is undefined', () => {
      // Mock a scenario where window is undefined (e.g., server-side rendering)
      const originalWindow = globalThis.window;
      // @ts-expect-error - intentionally setting window to undefined for test
      globalThis.window = undefined;

      const icons = getIcons();
      expect(icons).toEqual({});

      // Restore window
      globalThis.window = originalWindow;
    });
  });
});

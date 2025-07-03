// Mock the getCurrentApp function
import { vi, describe, it, expect, afterEach } from 'vitest';
vi.mock('@study/helpers', () => ({
  getCurrentApp: vi.fn()
}));
import * as helpers from '@study/helpers';
import { getNavbarConfig } from './custom-config.js';

describe('customNavbarConfig', () => {
  // Reset the module imports between tests
  afterEach(() => {
    vi.resetModules();
  });

  describe('navigation items', () => {
    it('should include Home and About for all apps', () => {
      // Test for all app types
      ['react', 'vue', 'webcomponents', 'reactnative'].forEach((appType) => {
        // Mock getCurrentApp to return the current app type
        vi.spyOn(helpers, 'getCurrentApp').mockReturnValue(appType);

        // Generate a fresh config with the mocked app type
        const config = getNavbarConfig();

        // Check basic navigation items
        const navItems = config.items;
        expect(navItems).toContainEqual({
          label: 'Home',
          href: `/${appType}/`
        });
        expect(navItems).toContainEqual({
          label: 'About',
          href: `/${appType}/about`
        });
      });
    });

    it('should include Calculator for react, vue, and webcomponents apps only', () => {
      // Apps that should have Calculator
      ['react', 'vue', 'webcomponents'].forEach((appType) => {
        vi.spyOn(helpers, 'getCurrentApp').mockReturnValue(appType);
        const config = getNavbarConfig();

        const navItems = config.items;
        expect(navItems).toContainEqual({
          label: 'Calculator',
          href: `/${appType}/calculator`
        });
      });

      // React Native should NOT have Calculator
      vi.spyOn(helpers, 'getCurrentApp').mockReturnValue('reactnative');
      const reactNativeConfig = getNavbarConfig();

      const navItems = reactNativeConfig.items;
      expect(navItems).not.toContainEqual({
        label: 'Calculator',
        href: '/reactnative/calculator'
      });
    });

    it('should include Computed and Form pages only for vue app', () => {
      // Vue app should have Computed and Form
      vi.spyOn(helpers, 'getCurrentApp').mockReturnValue('vue');
      const vueConfig = getNavbarConfig();

      expect(vueConfig.items).toContainEqual({
        label: 'Computed',
        href: '/vue/computed'
      });
      expect(vueConfig.items).toContainEqual({
        label: 'Form',
        href: '/vue/form'
      });

      // Other apps should NOT have Computed and Form
      ['react', 'webcomponents', 'reactnative'].forEach((appType) => {
        vi.spyOn(helpers, 'getCurrentApp').mockReturnValue(appType);
        const config = getNavbarConfig();

        expect(config.items).not.toContainEqual({
          label: 'Computed',
          href: '/vue/computed'
        });
        expect(config.items).not.toContainEqual({
          label: 'Form',
          href: '/vue/form'
        });
      });
    });

    it('should have the correct number of navigation items for each app', () => {
      // React and webcomponents should have 3 items (Home, About, Calculator)
      ['react', 'webcomponents'].forEach((appType) => {
        vi.spyOn(helpers, 'getCurrentApp').mockReturnValue(appType);
        const config = getNavbarConfig();
        expect(config.items.length).toBe(3);
      });

      // Vue should have 5 items (Home, About, Calculator, Computed, Form)
      vi.spyOn(helpers, 'getCurrentApp').mockReturnValue('vue');
      const vueConfig = getNavbarConfig();
      expect(vueConfig.items.length).toBe(5);

      // React Native should have 2 items (Home, About)
      vi.spyOn(helpers, 'getCurrentApp').mockReturnValue('reactnative');
      const reactNativeConfig = getNavbarConfig();
      expect(reactNativeConfig.items.length).toBe(2);
    });
  });
});

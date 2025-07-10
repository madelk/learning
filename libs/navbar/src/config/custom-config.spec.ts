import { type AppName } from "@study/helpers";
import { afterEach, describe, expect, it, vi } from "vitest";

import * as helpers from "@study/helpers";

import {
  baseNavbarConfig,
  getNavbarConfig,
  vueNavbarConfig
} from "./custom-config.js";

vi.mock("@study/helpers", () => ({
  getCurrentApp: vi.fn()
}));

describe("customNavbarConfig", () => {
  // Reset the module imports between tests
  afterEach(() => {
    vi.resetModules();
  });

  describe("navigation items", () => {
    it("should include Home and About for all apps", () => {
      // Test for all app types
      const allApps: AppName[] = ["react", "vue", "webcomponents"];

      for (const appType of allApps) {
        // Mock getCurrentApp to return the current app type
        vi.spyOn(helpers, "getCurrentApp").mockReturnValue(appType);

        // Generate a fresh config with the mocked app type
        const config = getNavbarConfig();

        // Check basic navigation items
        const navItems = config.items;
        expect(navItems).toContainEqual({
          label: "Home",
          href: `/${appType}/`
        });
        expect(navItems).toContainEqual({
          label: "About",
          href: `/${appType}/about`
        });
      }
    });

    it("should include Calculator for react and vue apps only", () => {
      // Apps that should have Calculator
      const calculatorApps: AppName[] = ["react", "vue"];
      for (const appType of calculatorApps) {
        vi.spyOn(helpers, "getCurrentApp").mockReturnValue(appType);
        const config = getNavbarConfig();

        const navItems = config.items;
        expect(navItems).toContainEqual({
          label: "Calculator",
          href: `/${appType}/calculator`
        });
      }

      // Apps that should NOT have Calculator
      const notCalculatorApps: AppName[] = ["webcomponents"];
      for (const appType of notCalculatorApps) {
        vi.spyOn(helpers, "getCurrentApp").mockReturnValue(appType);
        const config = getNavbarConfig();

        const navItems = config.items;
        expect(navItems).not.toContainEqual({
          label: "Calculator",
          href: `/${appType}/calculator`
        });
      }
    });

    it("should include Computed and Form pages only for vue app", () => {
      // Vue app should have Computed and Form
      vi.spyOn(helpers, "getCurrentApp").mockReturnValue("vue");
      const vueConfig = getNavbarConfig();

      expect(vueConfig.items).toContainEqual({
        label: "Computed",
        href: "/vue/computed"
      });
      expect(vueConfig.items).toContainEqual({
        label: "Form",
        href: "/vue/form"
      });

      // Other apps should NOT have Computed and Form
      const otherApps: AppName[] = ["react", "webcomponents"];
      for (const appType of otherApps) {
        vi.spyOn(helpers, "getCurrentApp").mockReturnValue(appType);
        const config = getNavbarConfig();

        expect(config.items).not.toContainEqual({
          label: "Computed",
          href: "/vue/computed"
        });
        expect(config.items).not.toContainEqual({
          label: "Form",
          href: "/vue/form"
        });
      }
    });

    it("should have the correct number of navigation items for each app", () => {
      // React should have 3 items (Home, About, Calculator)
      vi.spyOn(helpers, "getCurrentApp").mockReturnValue("react");
      const reactConfig = getNavbarConfig();
      expect(reactConfig.items.length).toBe(
        baseNavbarConfig("react").length + 1
      ); // +1 for Calculator

      // Webcomponents should have 2 items (Home, About)
      vi.spyOn(helpers, "getCurrentApp").mockReturnValue("webcomponents");
      const webcomponentsConfig = getNavbarConfig();
      expect(webcomponentsConfig.items.length).toBe(
        baseNavbarConfig("webcomponents").length
      );

      // Vue should have Home, About, Calculator, and all vue-specific items
      vi.spyOn(helpers, "getCurrentApp").mockReturnValue("vue");
      const vueConfig = getNavbarConfig();

      expect(vueConfig.items.length).toBe(
        baseNavbarConfig("vue").length + vueNavbarConfig.length + 1 // +1 for Calculator
      );
    });
  });
});

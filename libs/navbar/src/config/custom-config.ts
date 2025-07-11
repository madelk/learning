import { getCurrentApp } from "@study/helpers";

import type { NavBarConfig, NavBarItem } from "../types/index.js";

import { DEFAULT_NAVBAR_CONFIG } from "./default-config.js";

/**
 * Apps that support the calculator feature
 */
const CALCULATOR_SUPPORTED_APPS = new Set(["react", "vue"]);

/**
 * Get the navbar configuration for the current app
 * @returns NavBarConfig with app-specific navigation items
 */
export function getNavbarConfig(): NavBarConfig {
  // Get the current app
  const currentApp = getCurrentApp();

  // Create basic navigation items for all apps (copy to avoid mutation)
  const navItems: NavBarItem[] = baseNavbarConfig(currentApp);

  // Add Calculator only for apps that support it
  if (CALCULATOR_SUPPORTED_APPS.has(currentApp)) {
    navItems.push({ label: "Calculator", href: `/${currentApp}/calculator` });
  }

  // Add Vue-specific pages only if we're in the Vue app
  if (currentApp === "vue") {
    navItems.push(...vueNavbarConfig);
  }

  // Create the custom navbar config
  return {
    ...DEFAULT_NAVBAR_CONFIG,
    items: navItems
  };
}

export function baseNavbarConfig(appType: string): NavBarItem[] {
  return [
    { label: "Home", href: `/${appType}/` },
    { label: "About", href: `/${appType}/about` }
  ];
}
export const vueNavbarConfig: NavBarItem[] = [
  { label: "Cheat Sheet", href: "/vue/cheat-sheet" },
  { label: "Computed", href: "/vue/computed" },
  { label: "Form", href: "/vue/form" },
  { label: "Volume", href: "/vue/volume" },
  { label: "Component", href: "/vue/component" },
  { label: "Slots", href: "/vue/slots" },
  { label: "Dynamic", href: "/vue/dynamic" },
  { label: "http", href: "/vue/http" },
  { label: "Lifecycle", href: "/vue/lifecycle" }
];

// Shared navbar types and interfaces
import type { CSSProperties } from 'react';

// Framework types
export type FrameworkId = 'react' | 'vue' | 'webcomponents' | 'reactnative';
export type FrameworkIcons = Record<FrameworkId, string>;

// Extended CSS properties for custom styling needs
export interface ExtendedCSSProperties extends CSSProperties {
  hoverBackgroundColor?: string;
}

export interface NavBarConfig {
  items: NavBarItem[];
  styles: NavBarStyles;
  appSelector?: AppSelectorConfig;
}

export interface NavBarItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface AppSelectorConfig {
  enabled: boolean;
  currentApp?: string;
  apps: AppOption[];
}

export interface AppOption {
  id: string;
  name: string;
  icon: string; // SVG icon or emoji
  localUrl: string;
  prodUrl: string;
}

export interface NavBarStyles {
  container: CSSProperties;
  link: CSSProperties;
  dropdown: CSSProperties;
  dropdownItem: ExtendedCSSProperties;
}

// React Native specific props
export interface NavBarNativeProps {
  config?: Partial<NavBarConfig>;
  onItemPress?: (item: NavBarItem) => void;
}

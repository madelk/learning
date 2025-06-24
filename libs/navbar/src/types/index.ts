// Shared navbar types and interfaces
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
  container: {
    backgroundColor: string;
    padding: string;
    gap: string;
    display?: string;
    flexDirection?: string;
  };
  link: {
    color: string;
    padding: string;
    backgroundColor?: string;
    border?: string;
    fontSize?: string;
    cursor?: string;
    textDecoration?: string;
  };
  dropdown: {
    backgroundColor?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
    color?: string;
    padding?: string;
    fontSize?: string;
    cursor?: string;
    minWidth?: string;
  };
  dropdownItem: {
    padding?: string;
    cursor?: string;
    backgroundColor?: string;
    color?: string;
    hoverBackgroundColor?: string;
    display?: string;
    alignItems?: string;
    gap?: string;
  };
}

// React Native specific props
export interface NavBarNativeProps {
  config?: Partial<NavBarConfig>;
  onItemPress?: (item: NavBarItem) => void;
}

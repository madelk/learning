// Shared navbar types and interfaces
export interface NavBarConfig {
  items: NavBarItem[];
  styles: NavBarStyles;
}

export interface NavBarItem {
  label: string;
  href?: string;
  onClick?: () => void;
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
}

// React Native specific props
export interface NavBarNativeProps {
  config?: Partial<NavBarConfig>;
  onItemPress?: (item: NavBarItem) => void;
}

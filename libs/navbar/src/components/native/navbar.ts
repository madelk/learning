import React from 'react';
import { DEFAULT_NAVBAR_CONFIG } from '../../config';
import { convertToWebStyles } from '../../utils';
import type { NavBarConfig, NavBarNativeProps } from '../../types';

export const NavBarNative: React.FC<NavBarNativeProps> = ({
  config: userConfig,
  onItemPress,
}) => {
  // Merge user config with defaults
  const config: NavBarConfig = {
    items: userConfig?.items || DEFAULT_NAVBAR_CONFIG.items,
    styles: {
      ...DEFAULT_NAVBAR_CONFIG.styles,
      ...userConfig?.styles,
      container: {
        ...DEFAULT_NAVBAR_CONFIG.styles.container,
        ...userConfig?.styles?.container,
      },
      link: {
        ...DEFAULT_NAVBAR_CONFIG.styles.link,
        ...userConfig?.styles?.link,
      },
    },
  };

  // For web builds, we'll use a simple div-based implementation
  // For native builds, this would use actual React Native components
  if (typeof window !== 'undefined') {
    // Web environment - use DOM elements
    return React.createElement(
      'div',
      { style: convertToWebStyles(config.styles.container) },
      ...config.items.map((item, index) =>
        React.createElement(
          'button',
          {
            key: index,
            onClick: () => onItemPress?.(item) || (item.href && (window.location.href = item.href)),
            style: convertToWebStyles(config.styles.link),
            type: 'button',
          },
          item.label
        )
      )
    );
  }

  // Native environment - this would need actual react-native imports
  // For now, return a placeholder
  return React.createElement(
    'div',
    {},
    'NavBar (Native mode not available in web)'
  );
};

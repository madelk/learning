import React, { useState } from 'react';
import { DEFAULT_NAVBAR_CONFIG } from '../../config/index.js';
import { getAppUrl, convertToWebStyles } from '../../utils/index.js';
import type { NavBarConfig, NavBarNativeProps, AppOption } from '../../types/index.js';

export const NavBarNative: React.FC<NavBarNativeProps> = ({
  config: userConfig,
  onItemPress,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Merge user config with defaults
  const config: NavBarConfig = {
    items: userConfig?.items || DEFAULT_NAVBAR_CONFIG.items,
    appSelector: userConfig?.appSelector || DEFAULT_NAVBAR_CONFIG.appSelector,
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
      dropdown: {
        ...DEFAULT_NAVBAR_CONFIG.styles.dropdown,
        ...userConfig?.styles?.dropdown,
      },
      dropdownItem: {
        ...DEFAULT_NAVBAR_CONFIG.styles.dropdownItem,
        ...userConfig?.styles?.dropdownItem,
      },
    },
  };

  const handleAppSelect = (app: AppOption) => {
    const url = getAppUrl(app);
    if (typeof window !== 'undefined') {
      window.location.href = url;
    }
    setIsDropdownOpen(false);
  };

  const renderAppSelector = () => {
    if (!config.appSelector?.enabled) return null;

    const currentApp = config.appSelector.apps.find(app => app.id === config.appSelector?.currentApp);
    const currentIcon = currentApp?.icon || '🔧';
    const currentName = currentApp?.name || 'Unknown';

    return React.createElement(
      'button',
      {
        onClick: (e: React.MouseEvent) => {
          e.stopPropagation();
          setIsDropdownOpen(!isDropdownOpen);
        },
        style: {
          ...convertToWebStyles(config.styles.dropdown),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          marginRight: 'auto',
        },
        type: 'button',
      },
      React.createElement('span', {
        style: { display: 'inline-flex', verticalAlign: 'middle' },
        dangerouslySetInnerHTML: { __html: currentIcon }
      }),
      React.createElement('span', {}, currentName),
      React.createElement('span', {
        style: {
          transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.2s'
        }
      }, '▼')
    );
  };

  // Handle clicking outside to close dropdown
  React.useEffect(() => {
    const handleClickOutside = () => {
      setIsDropdownOpen(false);
    };

    if (isDropdownOpen && typeof document !== 'undefined') {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
    
    return undefined;
  }, [isDropdownOpen]);

  // For web builds, we'll use a simple div-based implementation
  // For native builds, this would use actual React Native components
  if (typeof window !== 'undefined') {
    // Web environment - use DOM elements
    return React.createElement(
      React.Fragment,
      {},
      React.createElement(
        'div',
        { 
          style: {
            ...convertToWebStyles(config.styles.container),
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }
        },
        renderAppSelector(),
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
      ),
      // Render dropdown outside navbar as a portal-like element
      isDropdownOpen && config.appSelector?.enabled && React.createElement(
        'div',
        {
          onClick: (e: React.MouseEvent) => e.stopPropagation(),
          style: {
            position: 'fixed',
            top: '60px', // Position below navbar
            left: '16px', // Align with navbar padding
            zIndex: 10000, // Very high z-index to ensure it's above everything
            ...convertToWebStyles(config.styles.dropdown),
            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
            borderRadius: '8px',
            minWidth: '200px',
            maxWidth: '300px',
            // Ensure it doesn't affect document flow
            pointerEvents: 'auto',
          },
        },
        ...config.appSelector.apps.map((app, index) => {
          const isCurrent = app.id === config.appSelector?.currentApp;
          return React.createElement(
            'button',
            {
              key: index,
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                handleAppSelect(app);
              },
              style: {
                ...convertToWebStyles(config.styles.dropdownItem),
                width: '100%',
                textAlign: 'left',
                fontWeight: isCurrent ? 'bold' : 'normal',
                backgroundColor: isCurrent 
                  ? config.styles.dropdownItem.hoverBackgroundColor 
                  : config.styles.dropdownItem.backgroundColor,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                borderRadius: '4px',
                margin: '2px',
              },
              type: 'button',
              onMouseEnter: (e: React.MouseEvent) => {
                if (!isCurrent) {
                  (e.target as HTMLElement).style.backgroundColor = config.styles.dropdownItem.hoverBackgroundColor || '#555';
                }
              },
              onMouseLeave: (e: React.MouseEvent) => {
                if (!isCurrent) {
                  (e.target as HTMLElement).style.backgroundColor = config.styles.dropdownItem.backgroundColor || 'transparent';
                }
              },
            },
            React.createElement('span', {
              style: { display: 'inline-flex', verticalAlign: 'middle' },
              dangerouslySetInnerHTML: { __html: app.icon }
            }),
            React.createElement('span', {}, app.name),
            isCurrent && React.createElement('span', { style: { marginLeft: 'auto' } }, '✓')
          );
        })
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

import React from 'react';

export interface NavBarNativeProps {
  onHomePress?: () => void;
  onAboutPress?: () => void;
}

export const NavBarNative: React.FC<NavBarNativeProps> = ({
  onHomePress,
  onAboutPress,
}) => {
  const { View, Text, TouchableOpacity } = require('react-native');
  
  return React.createElement(
    View,
    { style: styles.container },
    React.createElement(
      TouchableOpacity,
      { onPress: onHomePress, style: styles.link },
      React.createElement(Text, { style: styles.linkText }, 'Home')
    ),
    React.createElement(
      TouchableOpacity,
      { onPress: onAboutPress, style: styles.link },
      React.createElement(Text, { style: styles.linkText }, 'About')
    )
  );
};

const styles = {
  container: {
    flexDirection: 'row' as const,
    backgroundColor: '#333',
    padding: 16,
    gap: 16,
  },
  link: {
    padding: 8,
  },
  linkText: {
    color: 'white',
    fontSize: 16,
  },
};

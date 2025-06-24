import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking
} from 'react-native';
import { NavBarNative } from '@study/navbar/src/native';
import About from './About';

export const App = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      const url = event.url;
      if (typeof url === 'string' && url.includes('/reactnative/about')) {
        setShowAbout(true);
      } else {
        setShowAbout(false);
      }
    };
    const subscription = Linking.addEventListener('url', handleUrl);
    // Check initial URL
    Linking.getInitialURL().then((url) => {
      if (typeof url === 'string' && url.includes('/reactnative/about')) {
        setShowAbout(true);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <NavBarNative />
        {showAbout ? (
          <About />
        ) : (
          <ScrollView
            ref={(ref) => {
              scrollViewRef.current = ref;
            }}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <View style={styles.section}>
              <Text style={styles.textLg}>Hello there,</Text>
              <Text
                style={[styles.textXL, styles.appTitleText]}
                testID="heading"
                role="heading"
              >
                We got react native working!
              </Text>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  codeBlock: {
    backgroundColor: 'rgba(55, 65, 81, 1)',
    marginVertical: 12,
    padding: 12,
    borderRadius: 4,
  },
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomSm: {
    marginBottom: 6,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textBold: {
    fontWeight: '500',
  },
  textCenter: {
    textAlign: 'center',
  },
  text2XS: {
    fontSize: 12,
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
  },
  textLg: {
    fontSize: 24,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  textSubtle: {
    color: '#6b7280',
  },
  section: {
    marginVertical: 12,
    marginHorizontal: 12,
  },
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  hero: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 36,
    marginBottom: 24,
  },
  heroTitle: {
    flex: 1,
    flexDirection: 'row',
  },
  heroTitleText: {
    color: '#ffffff',
    marginLeft: 12,
  },
  heroText: {
    color: '#ffffff',
    marginVertical: 12,
  },

  connectToCloudButton: {
    backgroundColor: 'rgba(20, 48, 85, 1)',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16,
    width: '50%',
  },

  connectToCloudButtonText: {
    color: '#ffffff',
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: '50%',
    marginTop: 24,
  },
  learning: {
    marginVertical: 12,
  },
  love: {
    marginTop: 12,
    justifyContent: 'center',
  },
});

export default App;

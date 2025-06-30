import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Linking
} from 'react-native';
import { NavBarNative } from '@study/navbar/src/native';
import About from './About';
import { getHomepageText } from '@study/pagetext';
import { styles } from './styles';
const text = getHomepageText();

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
          flex: 1
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
              <Text style={styles.textLg}>{text.title.text}</Text>
              {text.paragraphs.text.map((paragraph, index) => (
                <Text key={index} style={styles.textSm}>
                  {paragraph}
                </Text>
              ))}
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};
export default App;

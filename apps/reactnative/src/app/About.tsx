import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About</Text>
    <Text>This is the about page for the React Native app.</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 }
});

export default About;

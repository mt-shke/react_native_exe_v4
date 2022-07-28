import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import UserProvider from './src/state/UserContext';
import {MMKV} from 'react-native-mmkv';
import 'react-native-gesture-handler';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();
export const storage = new MMKV();

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar hidden />
        <Navigation />
      </View>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

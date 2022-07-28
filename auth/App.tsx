import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import UserProvider from './src/state/UserContext';
import 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import MainNavigation from './src/navigation/MainNavigation';
import {enableLatestRenderer} from 'react-native-maps';

export const storage = new MMKV();


enableLatestRenderer();

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar hidden />
        <MainNavigation />
      </View>
    </UserProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

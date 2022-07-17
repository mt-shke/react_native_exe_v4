import React from 'react';
import {StatusBar, View, StyleSheet} from 'react-native';
import UserProvider from './src/state/UserContext';
import 'react-native-gesture-handler';
import {MMKV} from 'react-native-mmkv';
import MainNavigation from './src/navigation/MainNavigation';

// export const storage = new MMKV({
//   id: `user-${userId}-storage`,
//   path: `${USER_DIRECTORY}/storage`,
//   encryptionKey: 'hunter2',
// });

export const storage = new MMKV();

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

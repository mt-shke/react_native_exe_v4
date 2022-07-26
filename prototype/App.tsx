import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
import UserProvider from './src/state/UserContext';
// import 'react-native-gesture-handler';

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} />
        <MainNavigation />
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

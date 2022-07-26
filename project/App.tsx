import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Navigation from './src/navigation/Navigation';
import UserProvider from './src/state/UserContext';
// import 'react-native-gesture-handler';

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar barStyle={'light-content'} hidden />
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

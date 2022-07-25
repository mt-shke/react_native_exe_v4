import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import MainNavigation from './src/navigation/MainNavigation';
// import 'react-native-gesture-handler';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <MainNavigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

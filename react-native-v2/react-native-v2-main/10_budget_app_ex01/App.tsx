/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {createContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  // useColorScheme,
} from 'react-native';
import {colors} from './src/globals';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import AuthNavigation from './src/navigation/AuthNavigation';
import {createRealmContext} from '@realm/react';
import {PaymentSchema, UserSchema} from './src/schema/realm';
// import UserProvider from './src/state/UserContext';

export const appContextConfig = {
  schema: [UserSchema, PaymentSchema],
};

export const {RealmProvider, useRealm, useQuery} =
  createRealmContext(appContextConfig);

const App = () => {
  return (
    // Using custom Context
    // <UserProvider>
    // Using Realm ReactContext
    <RealmProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          // barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={colors.blue}
        />
        <AuthNavigation />
        {/* <AuthEmbedded /> */}
        {/* <AuthLinked /> */}
      </SafeAreaView>
    </RealmProvider>
    // </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
  },
});

export default App;

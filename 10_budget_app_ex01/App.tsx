import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {colors} from './src/globals';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import AuthNavigation from './src/navigation/AuthNavigation';
import {createRealmContext} from '@realm/react';
import {PaymentSchema, UserSchema} from './src/schema/realm';

export const appContextConfig = {
  schema: [UserSchema, PaymentSchema],
};

export const {RealmProvider, useRealm, useQuery} =
  createRealmContext(appContextConfig);

const App = () => {
  return (
    <RealmProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={colors.blue} />
        <AuthNavigation />
      </SafeAreaView>
    </RealmProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blue,
    flex: 1,
  },
  bar: {
    backgroundColor: colors.blue,
  },
});

export default App;

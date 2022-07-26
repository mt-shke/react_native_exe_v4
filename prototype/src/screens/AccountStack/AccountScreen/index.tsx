import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TAuthenticatedStackParamsList} from '../../../navigation/AuthenticatedStack';

export type TAccountScreen = NativeStackScreenProps<
  TAuthenticatedStackParamsList,
  'AccountScreen'
>;

const AccountScreen = (props: TAccountScreen) => {
  // Paramaters screen
  // Update profile email
  // Set name and address before user can buy things

  const {navigation} = props;
  return (
    <View style={styles.container}>
      <Text>AccountScreen</Text>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

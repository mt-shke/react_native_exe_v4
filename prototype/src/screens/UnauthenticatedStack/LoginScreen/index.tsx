import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';
import LoginForm from './LoginForm';

export type TLoginScreenProps = NativeStackScreenProps<
  TUnauthenticatedStackParamsList,
  'LoginScreen'
>;

const LoginScreen = (props: TLoginScreenProps) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';
import RegisterForm from './RegisterForm';

export type TRegisterScreenProps = NativeStackScreenProps<
  TUnauthenticatedStackParamsList,
  'RegisterScreen'
>;

const RegisterScreen = (props: TRegisterScreenProps) => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

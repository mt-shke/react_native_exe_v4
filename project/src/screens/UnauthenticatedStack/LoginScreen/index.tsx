import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {bgs} from '../../../data';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';
import {randomNum} from '../../../utils';
import LoginForm from './LoginForm';

export type TLoginScreenProps = NativeStackScreenProps<
  TUnauthenticatedStackParamsList,
  'LoginScreen'
>;

const LoginScreen = (props: TLoginScreenProps) => {
  const {navigation} = props;

  const img = bgs[randomNum(4) - 1];
  // todo change bg
  return (
    <ImageBackground source={img} style={styles.container} resizeMode="cover">
      <LoginForm />
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});

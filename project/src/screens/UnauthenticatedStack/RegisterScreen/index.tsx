import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {bgs} from '../../../data';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';
import {randomNum} from '../../../utils';
import RegisterForm from './RegisterForm';

export type TRegisterScreenProps = NativeStackScreenProps<
  TUnauthenticatedStackParamsList,
  'RegisterScreen'
>;

const RegisterScreen = (props: TRegisterScreenProps) => {
  const {navigation} = props;
  const img = bgs[randomNum(4) - 1];

  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.bg} resizeMode="cover">
        <ScrollView>
          <RegisterForm />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
});

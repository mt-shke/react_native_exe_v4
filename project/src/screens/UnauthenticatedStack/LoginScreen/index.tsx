import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Touchable,
  TouchableOpacity,
  Text,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
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
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.bg} resizeMode="cover">
        <ScrollView>
          <LoginForm />
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bg: {
    position: 'absolute',
    height: '100%',
  },
});

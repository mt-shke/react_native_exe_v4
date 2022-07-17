import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import SignUpForm from './SignUpForm';

const SignUpScreen = () => {
  return (
    <ImageBackground
      source={require('../../../assets/img/bg-login.png')}
      style={styles.bg}>
      <View style={styles.container}>
        <SignUpForm />
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 94,
  },
  bg: {
    flex: 1,
  },
});

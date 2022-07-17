import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import LoginForm from './LoginForm';

const LoginScreen: React.FC = () => {
  return (
    <ImageBackground
      source={require('../../../assets/img/bg-login.png')}
      style={styles.bg}>
      <View style={styles.container}>
        <LoginForm />
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 94,
  },
  bg: {
    flex: 1,
  },
});

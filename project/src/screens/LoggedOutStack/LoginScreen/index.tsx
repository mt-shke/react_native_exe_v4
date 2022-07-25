import React from 'react';
import {View, StyleSheet} from 'react-native';
import LoginForm from './LoginForm';

const LoginScreen = () => {
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

import React from 'react';
import {View, StyleSheet} from 'react-native';
import RegisterForm from './RegisterForm';

const RegisterScreen = () => {
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

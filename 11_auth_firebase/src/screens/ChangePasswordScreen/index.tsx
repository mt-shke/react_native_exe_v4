import React from 'react';
import {StyleSheet, ImageBackground, ScrollView} from 'react-native';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordScreen = () => {
  return (
    <ImageBackground
      source={require('../../../assets/img/bg-settings.png')}
      resizeMode="cover"
      style={styles.bg}>
      <ImageBackground
        source={require('../../../assets/img/bg-page-nobg.png')}
        resizeMode="cover"
        style={styles.bg}>
        <ScrollView>
          <ChangePasswordForm />
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});

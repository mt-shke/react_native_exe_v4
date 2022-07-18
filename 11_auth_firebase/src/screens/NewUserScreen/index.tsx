import React from 'react';
import {View, StyleSheet, ImageBackground} from 'react-native';
import NewUserForm from './NewUserForm';

const NewUserScreen = (props: any) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/bg-home.png')}
        style={styles.bg}
        resizeMode="cover">
        <NewUserForm />
      </ImageBackground>
    </View>
  );
};

export default NewUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
});

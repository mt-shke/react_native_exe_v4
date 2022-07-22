import React from 'react';
import {StyleSheet, ImageBackground, ScrollView} from 'react-native';
import DeleteAccountForm from './DeleteAccountForm';
// import {useNavigation} from '@react-navigation/native';
// import {TDeleteAccountScreenNavigationProp} from '../../ts/types/navigation';

const DeleteAccountScreen = () => {
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
          <DeleteAccountForm />
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'flex-end',
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Gap from '../../components/UI/Gap';
import {colors, fonts} from '../../globals';

const ValidationModal = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Your account has been successfully created!
      </Text>
      <Gap height={40} />
      <Text style={styles.text}>
        Please check your email and validate your account before login.
      </Text>
    </View>
  );
};

export default ValidationModal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 160,
    paddingVertical: 50,
    paddingHorizontal: 20,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
    textAlign: 'center',
    color: colors.whiteBlue,
  },
});

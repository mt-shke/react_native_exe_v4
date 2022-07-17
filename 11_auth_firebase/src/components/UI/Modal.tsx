import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../../globals';

interface IModal {
  text?: string;
  style?: any;
}

const Modal = ({text, style}: IModal) => {
  let modalStyle = {...styles.container};
  modalStyle = {...modalStyle, ...style};
  return (
    <View style={modalStyle}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    backgroundColor: colors.darkBlue,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
    textAlign: 'center',
    color: colors.whiteBlue,
  },
});

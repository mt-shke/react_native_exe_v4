import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../../globals';

interface ITextStylised {
  content: string;
}

const TextStylised = ({content}: ITextStylised) => {
  return <Text style={styles.text}>{`${content}`}</Text>;
};

export default TextStylised;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: colors.whiteBlue,
  },
});

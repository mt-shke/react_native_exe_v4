import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {colors, fonts} from '../../globals';

interface ITextStylised {
  content: string;
  align?: 'center';
}

const TextStylised = ({content, align}: ITextStylised) => {
  return (
    <Text
      style={{...styles.text, textAlign: align ?? 'left'}}>{`${content}`}</Text>
  );
};

export default TextStylised;

const styles = StyleSheet.create({
  text: {
    fontFamily: fonts.courgette,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: colors.white,
  },
});

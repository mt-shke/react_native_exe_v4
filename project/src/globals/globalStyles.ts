import {colors} from './colors';
import {StyleSheet} from 'react-native';
import {fonts} from './fonts';

export const gStyle = StyleSheet.create({
  btnContainer: {
    paddingVertical: 10,
    width: '50%',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: colors.green,
  },
  btnText: {
    fontFamily: fonts.hindi,
    fontSize: 16,
  },
});

export const vStyle = {
  borderRadius: 8,
};

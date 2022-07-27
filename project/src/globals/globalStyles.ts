import {colors} from './colors';
import {StyleSheet} from 'react-native';
import {fonts} from './fonts';

export const gStyle = StyleSheet.create({
  btnContainer: {
    paddingVertical: 10,
    minWidth: '50%',
    alignSelf: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 50,
    backgroundColor: colors.green,
  },
  btnText: {
    fontFamily: fonts.courgette,
    fontSize: 18,
    textAlign: 'center',
  },
});

export const vStyle = {
  borderRadius: 8,
};

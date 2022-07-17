export * from './fonts';
export * from './colors';

import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const formWidth = screenWidth - 40;

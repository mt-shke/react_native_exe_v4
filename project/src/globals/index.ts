export * from './colors';
export * from './globalStyles';
export * from './fonts';

import {Dimensions} from 'react-native';

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

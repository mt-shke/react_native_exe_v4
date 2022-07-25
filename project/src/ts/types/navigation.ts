import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TMainStackParamsList} from '../../navigation/MainStack';

// Main
export type THomeStackScreenProps = NativeStackScreenProps<
  TMainStackParamsList,
  'HomeStack'
>;

export type TMarketStackScreenProps = NativeStackScreenProps<
  TMainStackParamsList,
  'MarketStack'
>;

export type TAccountStackScreenProps = NativeStackScreenProps<
  TMainStackParamsList,
  'AccountStack'
>;

export type TLoggedOutStackScreenProps = NativeStackScreenProps<
  TMainStackParamsList,
  'LoggedOutStack'
>;

// HomeStack

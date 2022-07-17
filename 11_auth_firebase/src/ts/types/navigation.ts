import {DrawerNavigationProp} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import {TSettingsDrawerParamList} from '../../navigation/SettingsDrawer';
import {TUnAuthenticatedStackParamsList} from '../../navigation/UnAuthenticatedStack';

// Screen Navigation Type
// UnAuthenticatedStack

export type TLoginScreenNavigationProp = NativeStackNavigationProp<
  TUnAuthenticatedStackParamsList,
  'LoginScreen'
>;

export type TSignUpScreenNavigationProp = NativeStackNavigationProp<
  TUnAuthenticatedStackParamsList,
  'SignUpScreen'
>;

export type TLostPasswordScreenNavigationProp = NativeStackNavigationProp<
  TUnAuthenticatedStackParamsList,
  'LostPasswordScreen'
>;

// AuthenticatedStack

export type TNewUserScreenNavigationProp = NativeStackNavigationProp<
  TAuthenticatedStackParamsList,
  'NewUserScreen'
>;

export type THomeScreenNavigationProp = NativeStackNavigationProp<
  TAuthenticatedStackParamsList,
  'HomeScreen'
>;

export type TSettingsDrawerNavigationProp = NativeStackNavigationProp<
  TAuthenticatedStackParamsList,
  'SettingsDrawer'
>;

// SettingsDrawer

export type TSettingsScreenNavigationProp = DrawerNavigationProp<
  TSettingsDrawerParamList,
  'SettingsScreen'
>;

export type TUpdateProfileScreenNavigationProp = DrawerNavigationProp<
  TSettingsDrawerParamList,
  'UpdateProfileScreen'
>;
export type TChangePasswordScreenNavigationProp = DrawerNavigationProp<
  TSettingsDrawerParamList,
  'ChangePasswordScreen'
>;
export type TDeleteAccountScreenNavigationProp = DrawerNavigationProp<
  TSettingsDrawerParamList,
  'DeleteAccountScreen'
>;

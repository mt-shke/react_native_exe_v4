import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {TAccountStackScreenProps} from '../ts/types';
import {TAuthenticatedStackParamsList} from './MainStack';
import AccountScreen from '../../screens/AccountStack/AccountScreen';
import ChangePasswordScreen from '../../screens/AccountStack/ChangePasswordScreen';
import UpdateProfileScreen from '../../screens/AccountStack/UpdateProfileScreen';
import DeleteAccountScreen from '../../screens/AccountStack/DeleteAccountScreen';

export type TAccountStackParamsList = {
  AccountScreen: undefined;
  ChangePasswordScreen: undefined;
  UpdateProfileScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Stack = createNativeStackNavigator<TAuthenticatedStackParamsList>();

const AccountStack = (props: TAccountStackScreenProps) => {
  const {navigation} = props;
  return (
    <Stack.Navigator
      initialRouteName="AccountScreen"
      defaultScreenOptions={screenOptions}>
      <Stack.Screen
        name="AccountScreen"
        options={screenOptions}
        component={AccountScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        options={screenOptions}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        options={screenOptions}
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        options={screenOptions}
        component={DeleteAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

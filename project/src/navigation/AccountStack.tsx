import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountStack/AccountScreen';
import UpdateProfileScreen from '../screens/AccountStack/UpdateProfileScreen';
import ChangePasswordScreen from '../screens/AccountStack/ChangePasswordScreen';
import DeleteAccountScreen from '../screens/AccountStack/DeleteAccountScreen';

export type TAccountStackParamsList = {
  AccountScreen: undefined;
  UpdateProfileScreen: undefined;
  ChangePasswordScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Stack = createNativeStackNavigator<TAccountStackParamsList>();

const AccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AccountScreen"
      screenOptions={screenOptions}>
      <Stack.Screen
        name="AccountScreen"
        options={screenOptions}
        component={AccountScreen}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        options={screenOptions}
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        options={screenOptions}
        component={ChangePasswordScreen}
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

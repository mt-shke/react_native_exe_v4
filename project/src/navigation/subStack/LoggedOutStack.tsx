import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import LoginScreen from '../../screens/LoggedOutStack/LoginScreen';
import RegisterScreen from '../../screens/LoggedOutStack/RegisterScreen';
import {TLoggedOutStackScreenProps} from '../../ts/types';

export type TLoggedOutStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

const Stack = createNativeStackNavigator<TLoggedOutStackParamsList>();

const LoggedOutStack = (props: TLoggedOutStackScreenProps) => {
  const {navigation} = props;
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      defaultScreenOptions={screenOptions}>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default LoggedOutStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

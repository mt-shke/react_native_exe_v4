import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import LostPasswordScreen from '../screens/LostPasswordScreen';

export type TUnAuthenticatedStackParamsList = {
  LoginScreen: undefined;
  SignUpScreen: undefined;
  LostPasswordScreen: undefined;
};

const Stack = createNativeStackNavigator<TUnAuthenticatedStackParamsList>();

const UnAuthenticatedStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOptions}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen
          name="LostPasswordScreen"
          component={LostPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UnAuthenticatedStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

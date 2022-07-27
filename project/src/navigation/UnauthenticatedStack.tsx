import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import LoginScreen from '../screens/UnauthenticatedStack/LoginScreen';
import RegisterScreen from '../screens/UnauthenticatedStack/RegisterScreen';
import LostPasswordScreen from '../screens/UnauthenticatedStack/LostPasswordScreen';

export type TUnauthenticatedStackParamsList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  LostPasswordScreen: undefined;
};

const Stack = createNativeStackNavigator<TUnauthenticatedStackParamsList>();

const UnauthenticatedStack = ({user}: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={screenOptions}>
        <Stack.Screen name="LoginScreen" options={screenOptions}>
          {props => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterScreen" options={screenOptions}>
          {props => <RegisterScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LostPasswordScreen" options={screenOptions}>
          {props => <LostPasswordScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UnauthenticatedStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

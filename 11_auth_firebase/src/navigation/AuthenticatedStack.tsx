import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewUserScreen from '../screens/NewUserScreen';
import {IUser} from '../ts/interfaces';
import SettingsDrawer from './SettingsDrawer';

export type TAuthenticatedStackParamsList = {
  HomeScreen: undefined;
  SettingsDrawer: undefined;
  NewUserScreen: undefined;
};

const Stack = createNativeStackNavigator<TAuthenticatedStackParamsList>();

interface IUserProps {
  user: IUser;
}

const AuthenticatedStack = ({user}: IUserProps) => {
  const initialRoute = user.newUser ? 'NewUserScreen' : 'HomeScreen';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        defaultScreenOptions={screenOptions}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={screenOptions}
        />
        <Stack.Screen
          name="SettingsDrawer"
          component={SettingsDrawer}
          options={screenOptions}
        />
        <Stack.Screen
          name="NewUserScreen"
          component={NewUserScreen}
          options={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

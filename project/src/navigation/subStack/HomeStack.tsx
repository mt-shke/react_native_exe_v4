import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HomeScreen from '../../screens/HomeStack/HomeScreen';
import {THomeStackScreenProps} from '../../ts/types';

export type THomeStackParamsList = {
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<THomeStackParamsList>();

const HomeStack = (props: THomeStackScreenProps) => {
  const {navigation} = props;

  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      defaultScreenOptions={screenOptions}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

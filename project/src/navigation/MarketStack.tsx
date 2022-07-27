import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MarketScreen from '../screens/MarketStack/MarketScreen/indext';
import React from 'react';
import {screenOptions} from './AuthenticatedStack';
import AddProductScreen from '../screens/MarketStack/AddProductScreen';

export type TMarketStackParamsList = {
  MarketScreen: undefined;
  AddProductScreen: undefined;
};

const Stack = createNativeStackNavigator<TMarketStackParamsList>();

const MarketStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MarketScreen"
      defaultScreenOptions={screenOptions}>
      <Stack.Screen
        name="MarketScreen"
        component={MarketScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="AddProductScreen"
        component={AddProductScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default MarketStack;

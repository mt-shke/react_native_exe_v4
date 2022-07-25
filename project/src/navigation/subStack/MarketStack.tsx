import React from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import MarketScreen from '../screens/MarketScreen';
import DetailedProductSreen from '../../screens/MarketStack/DetailedProductScreen';
import ProductsSreen from '../../screens/MarketStack/ProductsScreen';
import RegisterProductScreen from '../../screens/MarketStack/RegisterProductScreen';
import {TMarketStackScreenProps} from '../../ts/types';

export type TMarketStackParamsList = {
  MarketScreen: undefined;
  ProductsScreen: undefined;
  DetailedProductScreen: undefined; // todo route product
  RegisterProductScreen: undefined;
};

const Stack = createNativeStackNavigator<TMarketStackParamsList>();

const MarketStack = (props: TMarketStackScreenProps) => {
  return (
    <Stack.Navigator
      initialRouteName="MarketScreen"
      defaultScreenOptions={screenOptions}>
      <Stack.Screen
        name="MarketScreen"
        component={MarketScreen}
        options={screenOptions}
        {...props}
      />
      <Stack.Screen
        name="ProductsScreen"
        component={ProductsSreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="DetailedProductScreen"
        component={DetailedProductSreen}
        options={screenOptions}
      />
      <Stack.Screen
        name="RegisterProductScreen"
        component={RegisterProductScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

export default MarketStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

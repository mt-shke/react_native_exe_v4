import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddProductScreen from '../screens/AddProductScreen';
import MarketScreen from '../screens/MarketScreen/indext';
import React from 'react';

type TMarketStackParamsList = {
  MarketScreen: undefined;
  AddProductScreen: undefined;
};

const Stack = createNativeStackNavigator<TMarketStackParamsList>();

const MarketStack = () => {
  return (
    <Stack.Navigator initialRouteName="MarketScreen">
      <Stack.Screen name="MarketScreen" component={MarketScreen} />
      <Stack.Screen name="AddProductScreen" component={AddProductScreen} />
    </Stack.Navigator>
  );
};

export default MarketStack;

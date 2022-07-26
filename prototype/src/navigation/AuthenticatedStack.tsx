import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen/indext';
import AccountScreen from '../screens/AccountStack/AccountScreen';

export type TAuthenticatedStackParamsList = {
  HomeScreen: undefined;
  MarketScreen: undefined;
  AccountScreen: undefined;
};

const Tab = createMaterialBottomTabNavigator<TAuthenticatedStackParamsList>();

const AuthenticatedStack = ({user}: any) => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          activeColor={colors.black}
          inactiveColor={colors.grey}
          barStyle={styles.bottomBar}
          screenOptions={screenOptions}>
          <Tab.Screen
            name="HomeScreen"
            options={{
              tabBarLabel: 'Accueil',
              tabBarIcon: ({focused}) => (
                <Ionicons
                  // name={osIcon + "apps"}
                  name={'md-home'}
                  color={focused ? colors.black : colors.grey}
                  size={24}
                />
              ),
            }}>
            {props => <HomeScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name="MarketScreen"
            options={{
              tabBarLabel: 'Marché',
              tabBarIcon: ({focused}) => (
                <Ionicons
                  name={'settings-sharp'}
                  color={focused ? colors.black : colors.grey}
                  size={24}
                />
              ),
            }}>
            {props => <MarketScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name="AccountScreen"
            options={{
              tabBarLabel: 'Compte',
              tabBarIcon: ({focused}) => (
                <Ionicons
                  name={'md-settings-sharp'}
                  color={focused ? colors.black : colors.grey}
                  size={24}
                />
              ),
            }}>
            {props => <AccountScreen {...props} />}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AuthenticatedStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {},
  bottomBar: {
    // height: 200,
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});

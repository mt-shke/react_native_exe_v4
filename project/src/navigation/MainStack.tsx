import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeStack from './subStack/HomeStack';
import MarketStack from './subStack/MarketStack';
import LoggedOutStack from './subStack/LoggedOutStack';
import AccountStack from './subStack/AccountStack';

export type TMainStackParamsList = {
  HomeStack: undefined;
  MarketStack: undefined;
  AccountStack: undefined;
  LoggedOutStack: undefined;
  // ChatScreen: undefined;
};

const Tab = createMaterialBottomTabNavigator<TMainStackParamsList>();

const MainStack = ({user}: any) => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <Tab.Navigator
          initialRouteName="HomeStack"
          activeColor={colors.black}
          inactiveColor={colors.grey}
          barStyle={styles.bottomBar}
          screenOptions={screenOptions}>
          <Tab.Screen
            name="HomeStack"
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
            {props => <HomeStack {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name="MarketStack"
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
            {props => <MarketStack {...props} />}
          </Tab.Screen>

          {user ? (
            <Tab.Screen
              name="AccountStack"
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
              {props => <AccountStack {...props} />}
            </Tab.Screen>
          ) : (
            <Tab.Screen
              name="LoggedOutStack"
              options={{
                tabBarLabel: 'Connection',
                tabBarIcon: ({focused}) => (
                  <Ionicons
                    name={'log-out-sharp'}
                    color={focused ? colors.black : colors.white}
                    size={24}
                  />
                ),
              }}>
              {props => <LoggedOutStack {...props} />}
            </Tab.Screen>
          )}
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default MainStack;

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

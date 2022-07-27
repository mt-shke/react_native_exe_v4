import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {ImageBackground, StyleSheet} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {colors} from '../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import MarketStack from './MarketStack';
import AccountStack from './AccountStack';

export type TAuthenticatedStackParamsList = {
  HomeScreen: undefined;
  MarketStack: undefined;
  AccountStack: undefined;
};

const Tab = createMaterialBottomTabNavigator<TAuthenticatedStackParamsList>();

const AuthenticatedStack = ({user}: any) => {
  return (
    <NavigationContainer>
      <SafeAreaProvider style={styles.container}>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          activeColor={colors.black}
          inactiveColor={colors.whitesecondary}
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
                  color={focused ? colors.black : colors.whitesecondary}
                  size={24}
                />
              ),
            }}>
            {props => <HomeScreen {...props} />}
          </Tab.Screen>

          <Tab.Screen
            name="MarketStack"
            component={MarketStack}
            options={{
              tabBarLabel: 'Marché',
              tabBarIcon: ({focused}) => (
                <Ionicons
                  name={'md-logo-markdown'}
                  color={focused ? colors.black : colors.whitesecondary}
                  size={24}
                />
              ),
            }}
          />

          <Tab.Screen
            name="AccountStack"
            options={{
              tabBarLabel: 'Compte',
              tabBarIcon: ({focused}) => (
                <Ionicons
                  name={'md-settings-sharp'}
                  color={focused ? colors.black : colors.whitesecondary}
                  size={24}
                />
              ),
            }}>
            {() => (
              <ImageBackground
                source={require('../../assets/img/bg/black/bg-account.jpg')}
                resizeMode="cover"
                style={styles.bg}>
                <AccountStack />
              </ImageBackground>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};

export default AuthenticatedStack;

export const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
  },
  bottomBar: {
    // height: 200,
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  bg: {
    flex: 1,
  },
});

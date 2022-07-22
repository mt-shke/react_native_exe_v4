import React from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewUserScreen from '../screens/NewUserScreen';
import {IUser} from '../ts/interfaces';
import SettingsDrawer from './SettingsDrawer';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GalleryScreen from '../screens/GalleryScreen';
import DetailedGalleryImageScreen from '../screens/DetailedGalleryImageScreen';

export type TAuthenticatedStackParamsList = {
  HomeScreen: undefined;
  SettingsDrawer: undefined;
  NewUserScreen: undefined;
  GalleryScreen: undefined;
  DetailedGalleryImageScreen: undefined;
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
          // component={HomeScreen}
          options={screenOptions}>
          {props => <HomeScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen
          name="SettingsDrawer"
          component={SettingsDrawer}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                style={styles.btnSettings}
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}>
                <Ionicons name="book" size={20} />
                {/* <Ionicons name="settings-sharp" size={20} /> */}
              </TouchableOpacity>
            ),
            headerTransparent: true,
            headerTitle: '',
          })}
        />
        <Stack.Screen
          name="NewUserScreen"
          options={screenOptions}
          component={NewUserScreen}
        />
        <Stack.Screen
          name="DetailedGalleryImageScreen"
          options={screenOptions}
          component={DetailedGalleryImageScreen}
        />
        <Stack.Screen name="GalleryScreen" options={screenOptions}>
          {props => <GalleryScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthenticatedStack;

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

const styles = StyleSheet.create({
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});

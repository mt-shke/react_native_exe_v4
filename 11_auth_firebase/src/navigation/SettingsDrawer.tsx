import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import SettingsScreen from '../screens/SettingsScreen';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {jobsImg} from '../data';
import UpdateProfileScreen from '../screens/UpdateProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import {colors} from '../globals';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';

export type TSettingsDrawerParamList = {
  SettingsScreen: undefined;
  UpdateProfileScreen: undefined;
  ChangePasswordScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Drawer = createDrawerNavigator<TSettingsDrawerParamList>();

const SettingsDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={navigatorOptions}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{drawerLabel: 'Settings Menu'}}
      />
      <Drawer.Screen
        name="UpdateProfileScreen"
        component={UpdateProfileScreen}
        options={{drawerLabel: 'Update my profile'}}
      />
      <Drawer.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{drawerLabel: 'Change my password'}}
      />
      <Drawer.Screen
        name="DeleteAccountScreen"
        component={DeleteAccountScreen}
        options={{drawerLabel: 'Delete my account'}}
      />
    </Drawer.Navigator>
  );
};

export default SettingsDrawer;

const CustomDrawer = props => {
  // console.log('inCusDraw:' + user);

  return (
    <ImageBackground
      source={require('../../assets/img/bg-book-cover.png')}
      resizeMode="stretch"
      style={styles.bg}>
      <View style={styles.containerDrawer}>
        <DrawerContentScrollView
          contentContainerStyle={styles.drawer}
          {...props}>
          <View style={styles.containerProfile}>
            <View style={styles.containerAvatar}>
              <Image source={jobsImg[0]} style={styles.avatar} />
            </View>
            <View style={styles.containerData}>
              {/* <Text>{user?.profile?.username}</Text> */}
            </View>
          </View>
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  containerDrawer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  drawer: {
    flex: 1,
  },
  containerProfile: {
    paddingVertical: 50,
    display: 'flex',
  },
  containerAvatar: {},
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 7,
    alignSelf: 'center',
  },
  containerData: {},
});

const navigatorOptions = {
  headerShown: false,
  // headerLeft: false,
  // headerTransparent: true,
  drawerActiveTintColor: colors.whiteBlue,
  drawerInactiveTintColor: colors.darkGrey,
};

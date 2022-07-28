import React, {useContext} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import AccountScreen from '../screens/AccountStack/AccountScreen';
import UpdateProfileScreen from '../screens/AccountStack/UpdateProfileScreen';
import ChangePasswordScreen from '../screens/AccountStack/ChangePasswordScreen';
import {Pressable, Text, TouchableOpacity} from 'react-native';
import {colors, fonts} from '../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {StyleSheet} from 'react-native';
import {UserContext} from '../state/UserContext';
import DeleteAccountScreen from '../screens/AccountStack/DeleteAccountScreen';

export type TAccountStackParamsList = {
  AccountScreen: undefined;
  UpdateProfileScreen: undefined;
  ChangePasswordScreen: undefined;
  DeleteAccountScreen: undefined;
};

const Stack = createNativeStackNavigator<TAccountStackParamsList>();

const AccountStack = () => {
  const {dispatch} = useContext(UserContext);

  return (
    
    <Stack.Navigator
      initialRouteName="AccountScreen"
      // screenOptions={screenOptions}
      defaultScreenOptions={screenOptions}>
      <Stack.Screen
        name="AccountScreen"
        options={({navigation}) => ({
          title: 'Votre compte',
          headerRight: () => (
            <TouchableOpacity
              style={styles.containerLogout}
              onPress={() => dispatch({type: 'LOGOUT_USER'})}>
              <Text style={styles.deco}>Déconnection</Text>
              <Ionicons name={'log-out-sharp'} color={colors.black} size={32} />
            </TouchableOpacity>
          ),
        })}
        component={AccountScreen}
      />
      <Stack.Screen
        name="UpdateProfileScreen"
        options={({navigation}) => ({
          headerTitle: 'Modifier vos paramètres',
          headerLeft: () => (
            <Pressable
              style={styles.containerBtn}
              onPress={() => navigation.replace('AccountScreen')}>
              <Ionicons
                name={'arrow-undo-circle-outline'}
                color={colors.black}
                size={32}
              />
            </Pressable>
          ),
        })}
        component={UpdateProfileScreen}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        options={({navigation}) => ({
          headerTitle: 'Changer votre mot de passe',
          headerLeft: () => (
            <Pressable
              style={styles.containerBtn}
              onPress={() => navigation.replace('AccountScreen')}>
              <Ionicons
                name={'arrow-undo-circle-outline'}
                color={colors.black}
                size={32}
              />
            </Pressable>
          ),
        })}
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="DeleteAccountScreen"
        options={({navigation}) => ({
          // title: 'Supprimer votre compte',
          headerTitle: 'Supprimer votre compte',

          headerLeft: () => (
            <Pressable
              style={styles.containerBtn}
              onPress={() => navigation.replace('AccountScreen')}>
              <Ionicons
                name={'arrow-undo-circle-outline'}
                color={colors.black}
                size={32}
              />
            </Pressable>
          ),
        })}
        component={DeleteAccountScreen}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;

const screenOptions: NativeStackNavigationOptions = {
  // headerShown: false,
};

const styles = StyleSheet.create({
  containerBtn: {
    marginRight: 10,
  },
  deco: {
    fontSize: 18,
    fontFamily: fonts.courgette,
    marginRight: 10,
  },
  containerLogout: {
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

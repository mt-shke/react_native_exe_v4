import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {TAccountStackParamsList} from '../../../navigation/AccountStack';
import {UserContext} from '../../../state/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../globals';
import SettingsItem from './SettingsItem';
import {CommonActions, useNavigation} from '@react-navigation/native';

type TAccountScreenNavigationProp = NativeStackNavigationProp<
  TAccountStackParamsList,
  'AccountScreen'
>;

const AccountScreen = () => {
  // Paramaters screen
  // Update profile email
  // Set name and address before user can buy things
  const {state, dispatch} = useContext(UserContext);

  const navigation = useNavigation<TAccountScreenNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('UpdateProfileScreen');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerSettings}>
          <TouchableOpacity
            onPress={() => navigation.replace('UpdateProfileScreen')}>
            <SettingsItem
              icon={
                <Ionicons name={'md-server'} color={colors.black} size={24} />
              }
              text="Mettre à jour les paramètres"
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.replace('ChangePasswordScreen')}>
            <SettingsItem
              icon={
                <Ionicons
                  name={'md-shield-checkmark-sharp'}
                  color={colors.black}
                  size={24}
                />
              }
              text="Modifier votre mot de passe"
            />
          </TouchableOpacity>
          <SettingsItem
            unavailable={true}
            icon={
              <Ionicons
                name={'md-stats-chart-sharp'}
                color={colors.black}
                size={24}
              />
            }
            text="Activité"
          />
          <SettingsItem
            unavailable={true}
            icon={
              <Ionicons
                name={'md-notifications-sharp'}
                color={colors.black}
                size={24}
              />
            }
            text="Notifications"
          />
          <SettingsItem
            unavailable={true}
            icon={<Ionicons name={'md-mail'} color={colors.black} size={24} />}
            text="Contact"
          />

          <SettingsItem
            unavailable={true}
            icon={
              <Ionicons
                name={'md-receipt-outline'}
                color={colors.black}
                size={24}
              />
            }
            text="Vos commandes"
          />
          <TouchableOpacity
            onPress={() => navigation.replace('UpdateProfileScreen')}>
            <SettingsItem
              icon={
                <Ionicons
                  name={'md-trash-sharp'}
                  color={colors.black}
                  size={24}
                />
              }
              text="Supprimer votre compte"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnLogout}
          onPress={() => dispatch({type: 'LOGOUT_USER'})}>
          <Text style={styles.text}>Logout out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
  },
  btnLogout: {
    backgroundColor: 'green',
  },
  text: {
    backgroundColor: 'green',
    color: 'black',
  },

  // Settings
  containerSettings: {
    marginTop: 20,
    padding: 10,
    color: 'black',
    alignSelf: 'center',
  },
});

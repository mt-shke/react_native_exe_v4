import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {TChangePasswordScreenNavigationProp} from '../../ts/types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ChangePasswordForm from './ChangePasswordForm';

const ChangePasswordScreen = () => {
  const navigation = useNavigation<TChangePasswordScreenNavigationProp>();

  return (
    <ImageBackground
      source={require('../../../assets/img/bg-settings.png')}
      resizeMode="cover"
      style={styles.bg}>
      <ImageBackground
        source={require('../../../assets/img/bg-page-nobg.png')}
        resizeMode="cover"
        style={styles.bg}>
        <ScrollView>
          <ChangePasswordForm />
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
});

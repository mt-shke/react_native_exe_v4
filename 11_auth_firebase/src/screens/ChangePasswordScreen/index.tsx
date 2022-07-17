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

const ChangePasswordScreen = () => {
  const navigation = useNavigation<TChangePasswordScreenNavigationProp>();

  return (
    <ImageBackground
      source={require('../../../assets/img/bg-settings.png')}
      resizeMode="cover"
      style={styles.bg}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnSettings}
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Ionicons name="settings-sharp" size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'flex-end',
  },
});

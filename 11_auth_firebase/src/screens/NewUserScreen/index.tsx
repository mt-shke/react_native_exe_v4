import React from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import {signOut} from '../../firebase';
import NewUserForm from './NewUserForm';

const NewUserScreen = props => {
  console.log(props);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/bg-home.png')}
        style={styles.bg}
        resizeMode="cover">
        <NewUserForm />
        <TouchableOpacity style={styles.btnSign} onPress={() => signOut()}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default NewUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  btnSign: {
    padding: 20,
    backgroundColor: 'green',
  },
});

import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {colors} from '../../globals';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import {UserContext} from '../../state/UserContext';

type THomeScreenProps = MaterialBottomTabScreenProps<
  TAuthenticatedStackParamsList,
  'HomeScreen'
>;

const HomeScreen = (props: THomeScreenProps) => {
  // All the user content
  // Products viewed
  // Commands

  // if no user discover topics
  const {navigation} = props;
  const {state, dispatch} = useContext(UserContext);
  // const navigation = useNavigation<THomeScreenProps>();

  const id = state.user?.firstname || state.user!.email;

  const imgUrl = state.user!.profilPicture.length
    ? state.user!.profilPicture
    : 'https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1095249842.jpg';

  return (
    <View style={styles.container}>
      <View style={styles.containerWelcome}>
        <Text>Welcome {id}</Text>
        <ImageBackground
          source={{
            uri: imgUrl,
          }}
          resizeMode="cover"
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkgrey,
  },
  containerWelcome: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  avatar: {
    width: 30,
    aspectRatio: 1 / 1,
    borderRadius: 50,
    overflow: 'hidden',
  },
});

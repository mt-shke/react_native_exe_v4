import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {colors} from '../../globals';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import {UserContext} from '../../state/UserContext';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';

type THomeScreenProps = MaterialBottomTabScreenProps<
  TAuthenticatedStackParamsList,
  'HomeScreen'
>;

const HomeScreen = (props: THomeScreenProps) => {
  const {navigation} = props;
  const {state, dispatch} = useContext(UserContext);
  // const navigation = useNavigation<THomeScreenProps>();

  Geolocation.getCurrentPosition(info => console.log(info));

  const id = state.user?.firstname || state.user!.email;

  const imgUrl = state.user!.profilPicture.length
    ? state.user!.profilPicture
    : 'https://image.shutterstock.com/image-vector/blank-avatar-photo-place-holder-260nw-1095249842.jpg';

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );

  // return (
  //   <View style={styles.mainContainer}>
  //     <View style={styles.containerWelcome}>
  //       <Text>Welcome {id}</Text>
  //       <ImageBackground
  //         source={{
  //           uri: imgUrl,
  //         }}
  //         resizeMode="cover"
  //         style={styles.avatar}
  //       />
  //     </View>
  //   </View>
  // );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
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

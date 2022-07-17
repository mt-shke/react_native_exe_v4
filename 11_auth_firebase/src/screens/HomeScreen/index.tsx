import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {jobs, jobsImg} from '../../data';
import {signOut} from '../../firebase';
import {colors, fonts} from '../../globals';
import {UserContext} from '../../state/UserContext';
import {THomeScreenNavigationProp} from '../../ts/types/navigation';
// import firestore from '@react-native-firebase/firestore';

// type THomeScreenProps = NativeStackScreenProps<
//   TAuthenticatedStackParamsList,
//   'HomeScreen'
// >;

const HomeScreen = () => {
  const {
    state: {user},
  } = useContext(UserContext);

  const {job, username} = user!.profile;

  useEffect(() => {});

  const navigation = useNavigation<THomeScreenNavigationProp>();
  const bgIndex = jobs.indexOf(user!.profile.job);

  return (
    <ImageBackground
      style={styles.bg}
      source={jobsImg[bgIndex]}
      resizeMode="cover">
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.containtText}>
            <Text style={styles.text}>Welcome {user?.email}</Text>
            <Text
              style={
                styles.text
              }>{`Hello ${username}, I am the Grand Master of the ${job}s, I will teach you how to achieve your goal and become one of us.`}</Text>
          </View>
          <View style={styles.containtText}>
            <Text style={styles.text}>
              {'Your first mission is to change your password'}
            </Text>
          </View>

          {/* <TouchableOpacity
        style={styles.btnDeleteAll}
        onPress={() => deleteCollection('Users')}>
        <View>
          <Text>Delete all users</Text>
        </View>
      </TouchableOpacity> */}

          <TouchableOpacity
            style={[styles.btnMission]}
            onPress={() => navigation.replace('SettingsDrawer')}>
            <View>
              <Text style={styles.btnText}>Go to first mission</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position: 'relative',
  },
  container: {
    marginTop: 160,
  },
  containtText: {
    padding: 20,
    backgroundColor: colors.black,
    width: '90%',
    marginLeft: 10,
    marginTop: 40,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: colors.whiteBlue,
  },
  signBtn: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginVertical: 20,
  },
  display: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  btnMission: {
    backgroundColor: colors.darkGrey,
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    padding: 10,
    borderRadius: 6,
  },
  btnText: {
    fontFamily: fonts.medium,
    fontSize: 18,
    color: colors.whiteBlue,
  },
});

// Check if firestore rules work
// useEffect(() => {
//   // getAUser();
//   getThisUserData();
// }, []);

// const getAUser = async () => {
//   const exempleUser = await firestore()
//     .collection('Users')
//     .doc('JC7ecJW5CZhVS6v2DawcIQwMbFD3')
//     .get();
//   console.log(exempleUser);
//   return exempleUser;
// };

// const getThisUserData = async () => {
//   const thisUserData = await firestore().collection('Users').doc(uid).get();
//   console.log('This user data is:', thisUserData);
//   return thisUserData;
// };

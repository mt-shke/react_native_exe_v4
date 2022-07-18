import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import TextStylised from '../../components/UI/TextStylised';
import {jobs, jobsImg} from '../../data';
import {colors} from '../../globals';
import {UserContext} from '../../state/UserContext';
import {THomeScreenNavigationProp} from '../../ts/types/navigation';

const HomeScreen = (props: any) => {
  // todo find props screen type
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
            <TextStylised content={`Welcome ${user?.email}`} />
            <TextStylised
              content={`Hello ${username}, I am the Grand Master of the ${job}s, I will teach you how to achieve your goal and become one of us.`}
            />
          </View>
          <View style={styles.containtText}>
            <TextStylised
              content={'Your first mission is to change your password'}
            />
          </View>

          {/* <TouchableOpacity
        style={styles.btnDeleteAll}
        onPress={() => deleteCollection('Users')}>
        <View>
          <Text>Delete all users</Text>
        </View>
      </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.btnMission}
            onPress={() => navigation.replace('SettingsDrawer')}>
            <TextStylised content={'Go to first mission'} />
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
    marginTop: 140,
  },
  containtText: {
    padding: 20,
    backgroundColor: colors.black,
    width: '90%',
    marginLeft: 6,
    marginTop: 40,
  },
  btnMission: {
    backgroundColor: colors.darkGrey,
    marginTop: 20,
    alignSelf: 'flex-end',
    marginRight: 20,
    borderRadius: 6,
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

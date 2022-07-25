import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  ActivityIndicator,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import {UserContext} from '../state/UserContext';
import MainStack from './MainStack';

const MainNavigation: React.FC = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);
  const {state, dispatch} = useContext(UserContext);

  function onAuthStateChanged(fetchedUser: any) {
    console.log(
      new Date(Date.now()),
      'In AuthStateChange FetchedUser is:',
      fetchedUser,
    );

    if (!fetchedUser) {
      if (state.user) {
        dispatch({type: 'LOGOUT_USER'});
      }
      setUser(null);
    }

    if (fetchedUser) {
      // if (!fetchedUser.emailVerified) {
      //   setTimeout(() => {
      //     signOutFromApp();
      //   }, 2000);
      //   return;
      // }
      // updateUserState(fetchedUser.uid);
      return;
      // setUser(fetchedUser);
    }
    if (initializing) {
      setInitializing(false);
    }
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // const updateUserState = async (loggedUserUid: string) => {
  //   try {
  //     const response = await getUserData(loggedUserUid);
  //     if (!response) {
  //       throw new Error('Cannot get user data');
  //     }
  //     if (response && !response.exists) {
  //       // Request succeded but no data yet
  //       console.error('Error updating user data, no data yet');
  //       signOut();
  //       return;
  //     }
  //     const responseData = response.data();
  //     dispatch({
  //       type: 'UPDATE_USER',
  //       payload: {
  //         email: responseData!.email,
  //         uid: responseData!.uid,
  //         newUser: responseData!.newUser,
  //         profile: {
  //           username: responseData!.profile.username,
  //           job: responseData!.profile.job,
  //         },
  //       },
  //     });
  //     return;
  //   } catch (error) {
  //     signOut();
  //     return;
  //   }
  // };

  if (initializing) {
    // signOut();
    return (
      <ImageBackground
        source={require('../../assets/img/legumes.jpg')}
        style={styles.bg}>
        <View style={styles.container}>
          <ActivityIndicator size={'large'} />
        </View>
      </ImageBackground>
    );
  }

  return <MainStack user={user} />;
};

export default MainNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
});

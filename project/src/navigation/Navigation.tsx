import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {UserContext} from '../state/UserContext';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import {getUserData, signOut} from '../firebase';

const Navigation = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const {state, dispatch} = useContext(UserContext);

  function onAuthStateChanged(fetchedUser: any) {
    console.log(
      new Date(Date.now()),
      'In AuthStateChange FetchedUser is:',
      fetchedUser,
    );

    // console.log('UserState is: ' + state.user?.email);

    if (!fetchedUser) {
      if (state.user) {
        dispatch({type: 'LOGOUT_USER'});
      }
    }

    if (fetchedUser) {
      if (!fetchedUser.emailVerified) {
        setTimeout(() => {
          signOut();
        }, 2000);
        return;
      }

      updateUserState(fetchedUser.uid);
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

  const updateUserState = async (loggedUserUid: string) => {
    try {
      const response = await getUserData(loggedUserUid);
      if (!response) {
        throw new Error('Cannot get user data');
      }
      if (response && !response.exists) {
        // Request succeded but no data yet
        console.error('Error updating user data, no data yet');
        signOut();
        return;
      }
      const responseData = response.data();

      dispatch({
        type: 'UPDATE_USER',
        payload: {
          email: responseData!.email,
          firstname: responseData!.firstname,
          lastname: responseData!.lastname,
          profilPicture: responseData!.profilPicture,
          address: responseData!.address,
          uid: auth().currentUser!.uid,
        },
      });
      return;
    } catch (error) {
      signOut();
      return;
    }
  };

  if (initializing) {
    signOut();
    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} style={styles.spinner} />
      </View>
    );
  }

  if (!state.user) {
    return <UnauthenticatedStack />;
  }

  return <AuthenticatedStack user={state.user} />;
};

export default Navigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
  },
  spinner: {
    alignSelf: 'center',
  },
});

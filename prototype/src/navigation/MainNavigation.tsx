import React, {useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {UserContext} from '../state/UserContext';
import AuthenticatedStack from './AuthenticatedStack';
import UnauthenticatedStack from './UnauthenticatedStack';
import {getUserData, signOut} from '../firebase';

const MainNavigation = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
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
      return;
    }

    if (fetchedUser) {
      // if (!fetchedUser.emailVerified) {
      //   setTimeout(() => {
      //     signOut();
      //   }, 2000);
      //   return;
      // }

      updateUserState(fetchedUser.uid);
      return;
      // setUser(fetchedUser);
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    if (!state.user) {
      auth().signInWithEmailAndPassword('michel.tcha@gmail.com', 'azeaze');
    }
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

      console.log('responseData is ' + responseData);
      console.log('responseData email is ' + responseData.email);

      dispatch({
        type: 'UPDATE_USER',
        payload: {
          email: responseData!.email,
          firstname: responseData!.firstname,
          lastname: responseData!.lastname,
        },
      });
      return;
    } catch (error) {
      signOut();
      return;
    }
  };

  console.log(state.user);

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

export default MainNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  bg: {
    flex: 1,
  },
  spinner: {
    // alignSelf: 'center',
  },
});
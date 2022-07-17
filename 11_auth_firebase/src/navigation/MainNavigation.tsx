import React, {useContext, useEffect, useState} from 'react';
import UnAuthenticatedStack from './UnAuthenticatedStack';
import AuthenticatedStack from './AuthenticatedStack';
import auth from '@react-native-firebase/auth';
import {UserContext} from '../state/UserContext';
import {ActivityIndicator} from 'react-native';
import {getUserData, signOut} from '../firebase';

const MainNavigation: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const {state, dispatch} = useContext(UserContext);

  function onAuthStateChanged(fetchedUser: any) {
    // console.log(
    //   new Date(Date.now()),
    //   'In AuthStateChange FetchedUser is:',
    //   fetchedUser,
    // );

    if (!fetchedUser) {
      if (state.user) {
        dispatch({type: 'LOGOUT_USER'});
      }
    }

    if (fetchedUser) {
      if (!fetchedUser.emailVerified) {
        signOut();
      }
      updateUserState(fetchedUser.uid);
      return;
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
          uid: responseData!.uid,
          newUser: responseData!.newUser,
          profile: {
            username: responseData!.profile.username,
            job: responseData!.profile.job,
          },
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
    return <ActivityIndicator size={'large'} />;
  }

  if (!state.user) {
    return <UnAuthenticatedStack />;
  }

  return <AuthenticatedStack user={state.user} />;
};

export default MainNavigation;

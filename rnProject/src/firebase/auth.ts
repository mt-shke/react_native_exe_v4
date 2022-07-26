import auth from '@react-native-firebase/auth';
import {storage} from '../../App';
import {ICredentials} from '../ts/interfaces';
import {TSetStringFunction} from '../ts/types';

// USER Signup - Login - Sign out
export const createNewAuthUser = async (
  data: ICredentials,
  setErrMsg: TSetStringFunction,
) => {
  try {
    const createdUser = await auth().createUserWithEmailAndPassword(
      data.email,
      data.password,
    );
    if (!createdUser) {
      console.log('Cannot create newUser');
      // throw new Error();
    }
    return createdUser;
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      setErrMsg('That email address is already in use!');
      return null;
    }
    if (error.code === 'auth/invalid-email') {
      setErrMsg('That email address is invalid!');
      return null;
    }
  }
};

export const signIn = async (
  data: ICredentials,
  setEmailError?: TSetStringFunction,
  setOldPasswordError?: TSetStringFunction,
) => {
  try {
    const user = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    return user;
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      setEmailError && setEmailError('Email is invalid');
    }
    if (error.code === 'auth/wrong-password') {
      setOldPasswordError && setOldPasswordError('Password is not correct');
    }
    if (error.code === 'auth/network-request-failed') {
      console.log('Connection error');
    }
    if (error.code === 'auth/invalid-email') {
      console.log(
        'Invalid email: badly formatted. This error happened when auto signIn',
      );
    }
    return null;
  }
};

export const signOut = () => {
  if (!auth().currentUser) {
    return;
  }
  auth().signOut();
};

export const signOutFromApp = () => {
  storage.set('user', '');
  signOut();
};

// Others Auth Method

export const deleteAccount = async () => {
  try {
    const response = await auth().currentUser?.delete();
    console.log('in updatePassword fn:', response);
    if (!response) {
      return null;
    }
    return response;
  } catch (error) {
    console.error('Error In Firebase/Auth/DelAccFn', error);
    return null;
  }
};

export const updatePassword = async (newPassword: string) => {
  try {
    const response = await auth().currentUser?.updatePassword(newPassword);
    console.log('in updatePassword fn:', response);
    if (response) {
      return {success: true};
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const showCurrentUser = () => {
  const currentUser = auth().currentUser;
  console.log(currentUser);
};

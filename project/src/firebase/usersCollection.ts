import firestore from '@react-native-firebase/firestore';

export const setUserToFirestore = async (userUid: string, email: string) => {
  try {
    const newUserInFirestore = await firestore()
      .collection('Users')
      .doc(userUid)
      .set({
        email: email,
        firstname: '',
        lastname: '',
        profilPicture: '',
        uid: userUid,
        address: {street: '', zipCode: '', state: ''},
      });

    return newUserInFirestore;
  } catch (error) {
    console.log('in Error firestore');
    return null;
  }
};

export const updateUserFirestore = async (uid: string, data: any) => {
  try {
    await firestore().collection('Users').doc(uid).update(data);
    return {success: true};
  } catch (error: any) {
    console.error('In updateUserFn, Error while updating user:', error);
    return {success: false};
  }
};

export const getUserData = async (userUid: string) => {
  try {
    return await firestore().collection('Users').doc(userUid).get();
  } catch (error: any) {
    if (error.code === 'firestore/permission-denied') {
      console.log('While getting user data: permission denied');
      return;
    }
    console.log('getUserData error:' + error);
  }
  return;
};

export const querySnapshot = async (uid: string) => {
  try {
    const doc = await firestore().collection('Users').doc(uid).get();
    if (doc.exists) {
    }
    // return firestore()
    //   .collection('Users')
    //   .doc(uid)
    //   .get()
    //   .then(documentSnapshot => {
    //     if (documentSnapshot.exists) {
    //       return documentSnapshot.data();
    //     }
    //   });
  } catch (error) {}
};

export const getAllUsers = async () => {
  return await firestore().collection('Users');
};

export const getSpecificDoc = async () => {};

export const deleteUserData = async (userUid: string) => {
  try {
    const response = await firestore()
      .collection('Users')
      .doc(userUid)
      .delete();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

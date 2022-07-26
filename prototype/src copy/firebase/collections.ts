import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const setNewCollection = async (
  collectionName: string,
  uid: string,
  data: any,
) => {
  try {
    const newCollection = await firestore()
      .collection(collectionName)
      .doc(uid)
      .set(data);
    return newCollection;
  } catch (error) {
    console.log('in Error firestore');
    return null;
  }
};

export const updateCollection = async (
  collectionName: string,
  uid: string,
  data: any,
) => {
  try {
    const updatedData = await firestore()
      .collection(collectionName)
      .doc(uid)
      .update(data);
    console.log(updatedData);
  } catch (error: any) {
    console.log('In updateUserFn, Error while updating user:', error);
    return null;
  }
};

export const deleteDocument = async (collectionId: string) => {
  try {
    const response = await firestore()
      .collection(collectionId)
      .doc(auth().currentUser?.uid)
      .delete();
    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const deleteCollection = async (collection: string) => {
  // Get all users
  const usersQuerySnapshot = await firestore().collection(collection).get();
  // Create a new batch instance
  const batch = firestore().batch();
  usersQuerySnapshot.forEach(documentSnapshot => {
    batch.delete(documentSnapshot.ref);
  });
  const response = batch.commit();
  return response;
};

import firestore from '@react-native-firebase/firestore';
import {IProduct} from '../ts/interfaces';

export const addProduct = async (userUid: string, data: IProduct) => {
  try {
    const newUserInFirestore = await firestore()
      .collection('Products')
      .doc(userUid)
      .set({
        imgUrl: data.imgUrl,
        title: data.title,
        description: data.description,
        price: data.price,
        quantity: data.quantity,
      });

    return newUserInFirestore;
  } catch (error) {
    console.log('in Error firestore');
    return null;
  }
};

export const updateProduct = async (uid: string, data: any) => {
  try {
    await firestore().collection('Products').doc(uid).update(data);
    return {success: true};
  } catch (error: any) {
    console.error('In updateUserFn, Error while updating user:', error);
    return {success: false};
  }
};

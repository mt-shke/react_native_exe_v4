import firestore from '@react-native-firebase/firestore';
import {IGalleryImg} from '../ts/interfaces';

export const addFirestoreGalleryUserImage = async (
  userUid: string,
  {title, imgUrl, description, fileName}: IGalleryImg,
) => {
  try {
    const doc = await firestore().collection('Images').doc(userUid).get();
    if (!doc.exists) {
      await firestore()
        .collection('Images')
        .doc(userUid)
        .set({
          gallery: firestore.FieldValue.arrayUnion({
            title,
            imgUrl,
            description,
            fileName,
          }),
        });
      return;
    }
    await firestore()
      .collection('Images')
      .doc(userUid)
      .update({
        gallery: firestore.FieldValue.arrayUnion({
          title,
          imgUrl,
          description,
          fileName,
        }),
      });

    return;
  } catch (error: any) {
    console.log('addFirestoreGalleryUserImage error:' + error);
    return error;
  }
};

export const deleteFirestoreGalleryImg = async (
  userUid: string,
  data: IGalleryImg,
) => {
  try {
    await firestore()
      .collection('Images')
      .doc(userUid)
      .update({
        gallery: firestore.FieldValue.arrayRemove(data),
      });

    return;
  } catch (error: any) {
    console.log('deleteFirestoreGalleryImg error:' + error);
    return error;
  }
};

export const getFirestoreGalleryUserImage = async (userUid: string) => {
  try {
    const response = await await firestore()
      .collection('Images')
      .doc(userUid)
      .get();
    if (!response.exists) {
      throw new Error('getFirestoreGalleryUserImage: Cannot get data');
    }
    return (await response.data()?.gallery) ?? [];
  } catch (error: any) {
    console.log('getFirestoreGalleryUserImage error:' + error);
    return error;
  }
};

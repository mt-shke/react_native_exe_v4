import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const sendLocalImgToStorage = async (userUid: string) => {
  try {
    const result = await launchImageLibrary(options);
    if (result.didCancel) {
      console.log('User did cancel action');
      return;
    }
    if (!result.assets) {
      throw new Error('No file found');
    }
    const {fileName, uri} = result.assets[0];
    const ref = storage().ref(`/assets/users/${userUid}/` + fileName);
    const response = await ref.putFile(uri as string);
    return response;
  } catch (error: any) {
    console.log('Error happened while selecting image from library: ' + error);
    return error;
  }
};

export const openCamera = async () => {
  try {
    const cameraOptions: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    const result = await launchCamera(cameraOptions);
    if (result.didCancel) {
      console.log('User did cancel action');
      return;
    }
    return;
  } catch (error: any) {
    console.log('Error happened while opening camera: ' + error);
    return;
  }
};

export const getUserStorageData = async (userUid: string) => {
  try {
    const ref = storage().ref('assets/users/' + userUid);
    const response = await ref.list();
    if (!response) {
      throw new Error(
        "Nothing returned while requesting user's images from storage",
      );
    }
    // let imgsArray: string[] = [];
    // for (let index = 0; index < response.items.length; index++) {
    //   const url = await response.items[index].getDownloadURL();
    //   imgsArray.push(url);
    // }
    return response;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

export const getUserStoragePictures = async (userUid: string) => {
  try {
    const ref = storage().ref('assets/users/' + userUid);
    const response = await ref.list();
    if (!response) {
      throw new Error(
        "Nothing returned while requesting user's images from storage",
      );
    }
    // let imgsArray: string[] = [];
    // for (let index = 0; index < response.items.length; index++) {
    //   const url = await response.items[index].getDownloadURL();
    //   imgsArray.push(url);
    // }
    return response.items;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};

let options: ImageLibraryOptions = {
  mediaType: 'photo',
  selectionLimit: 1,
  // title: 'Select Image',
  // type: 'library',
  // allowEditing: true,
  // customButtons: [
  //   {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
  // ],
  // options: {
  //   maxHeight: 200,
  //   maxWidth: 200,
  //   mediaType: 'photo',
  //   includeBase64: false,
  //   selectionLimit: 1,
  //   // includeExtra
  // },
  // storageOptions: {
  //   skipBackup: true,
  //   path: 'images',
  // },
  // saveToPhotos: true,
};

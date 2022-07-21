import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  deleteStorageImage,
  getUserStorageData,
  openCamera,
} from '../../firebase/storage/images';
import {colors, fonts} from '../../globals';
import {gStyles} from '../../globals/globalStyles';
import {UserContext} from '../../state/UserContext';
import {TGalleryScreenProps} from '../../ts/types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadImageModal from './UploadImageModal';
import {
  deleteFirestoreGalleryImg,
  getFirestoreGalleryUserImage,
} from '../../firebase/imagesCollection';
import UserGalleryCard from './UserGalleryCard';
import {IGalleryImg} from '../../ts/interfaces';

const GalleryScreen = (props: TGalleryScreenProps) => {
  const {navigation} = props;
  const {state} = useContext(UserContext);
  const [userGallery, setUserGallery] = useState<IGalleryImg[]>([]);
  const [imgs, setImg] = useState<string[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [uploadImageModal, setUploadImageModal] = useState<boolean>(false);

  useEffect(() => {
    if (!imgs.length) {
      getPicture(state.user!.uid);
      getFirestoreUserGallery(state.user!.uid);
    }
  }, []);

  const getFirestoreUserGallery = async (userUid: string) => {
    const gallery = await getFirestoreGalleryUserImage(userUid);
    setUserGallery(gallery);
  };

  const getPicture = async (userUid: string) => {
    try {
      if (isFetching) {
        return;
      }
      const userData = await getUserStorageData(userUid);
      if (!userData) {
        throw new Error('Images not found');
      }
      let imgsArray: string[] = [];
      for (let index = 0; index < userData.items.length; index++) {
        const url = await userData.items[index].getDownloadURL();
        imgsArray.push(url);
      }
      setImg(imgsArray);
      setIsFetching(false);
      return;
    } catch (error) {
      console.log('getPicture Error is:' + error);
      setIsFetching(false);
      return;
    }
  };

  const addNewImgToGallery = (img: IGalleryImg) => {
    setUserGallery(previous => [...previous, img]);
  };

  const deleteGalleryImg = async (item: IGalleryImg) => {
    try {
      await deleteFirestoreGalleryImg(state.user!.uid, item);
      const updatedGallery = userGallery.filter(
        (galleryImg: IGalleryImg) => galleryImg !== item,
      );
      await deleteStorageImage(state.user?.uid, item.fileName);
      setUserGallery(updatedGallery ?? []);
    } catch (error) {
      console.log('deleteGalleryImg error: ' + error);
    }
  };

  const btnSubmitStyle = {
    ...styles.btnSubmit,
    ...gStyles.button,
    opacity: isFetching ? 0.5 : 1,
  };

  if (!userGallery?.length) {
    return (
      <View style={styles.bg}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnSettings}
            onPress={() => {
              navigation.replace('SettingsDrawer');
            }}>
            <Ionicons name="book" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            style={btnSubmitStyle}
            onPress={() => setUploadImageModal(true)}>
            <Text style={styles.btnText}>Upload image</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={[styles.btnCamera, gStyles.button]}
            onPress={() => openCamera()}>
            <Text style={styles.btnText}>Open camera</Text>
          </TouchableOpacity>
        </View>
        {!!uploadImageModal && (
          <UploadImageModal
            addNewImgToGallery={addNewImgToGallery}
            setUploadImageModal={setUploadImageModal}
          />
        )}
        {!!uploadImageModal && (
          <Pressable
            style={styles.overlay}
            onPress={() => setUploadImageModal(false)}
          />
        )}
      </View>
    );
  }

  return (
    <View style={styles.bg}>
      <FlatList
        style={styles.container}
        initialNumToRender={4}
        numColumns={1}
        // horizontal={true}
        data={userGallery}
        ListHeaderComponent={
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.btnSettings}
              onPress={() => {
                navigation.replace('SettingsDrawer');
              }}>
              <Ionicons name="book" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              style={btnSubmitStyle}
              onPress={() => setUploadImageModal(true)}>
              <Text style={styles.btnText}>Upload image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isFetching ? true : false}
              style={[styles.btnCamera, gStyles.button]}
              onPress={() => openCamera()}>
              <Text style={styles.btnText}>Open camera</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({item, index}) => (
          <View style={styles.containerImg} key={index}>
            <UserGalleryCard data={item}>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => deleteGalleryImg(item)}>
                <Ionicons name="md-close-circle-sharp" size={20} />
              </TouchableOpacity>
            </UserGalleryCard>
          </View>
        )}
        // ItemSeparatorComponent={({highlighted}) => (
        //   // <Gap height={20} backgroundColor={colors.white} />
        //   <View style={{backgroundColor: 'white', height: 20}} />
        // )}
        // ListFooterComponent={
        //   <View style={styles.footer}>
        //     <Text>Footer</Text>
        //   </View>
        // }
      />
      {!!uploadImageModal && (
        <UploadImageModal
          addNewImgToGallery={addNewImgToGallery}
          setUploadImageModal={setUploadImageModal}
        />
      )}
      {!!uploadImageModal && (
        <Pressable
          style={styles.overlay}
          onPress={() => setUploadImageModal(false)}
        />
      )}
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position: 'relative',
  },
  container: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2,
    opacity: 0.5,
    backgroundColor: colors.black,
  },
  header: {
    backgroundColor: 'transparent',
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignSelf: 'flex-end',
    right: 20,
    top: 20,
  },
  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
  btnSubmit: {
    backgroundColor: colors.lightGreen,
    alignSelf: 'center',
    marginTop: 40,
  },
  btnCamera: {
    backgroundColor: colors.blue,
    alignSelf: 'center',
    marginTop: 40,
  },
  containerImg: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  img: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    margin: 50,
  },
  deleteIcon: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: 10,
  },
});

// Previous functions

// const postImage = async () => {
//   try {
//     if (isFetching) {
//       return;
//     }
//     setIsFetching(true);
//     await sendLocalImgToStorage(state.user!.uid);

//     await setIsFetching(false);
//     return getPicture(state.user!.uid);
//   } catch (error) {
//     console.log('postImage error is:' + error);
//     setIsFetching(false);
//     return;
//   }
// };

// const deleteImg = async (index: number) => {
//   try {
//     await data[index].delete();
//     const updatedImgs = imgs.filter((img, imgIndex) => imgIndex !== index);
//     const updatedData = data.filter(
//       (item: any, itemIndex: number) => itemIndex !== index,
//     );
//     console.log(updatedImgs);

//     setImg(updatedImgs.length ? updatedImgs : []);
//     setData(data.length ? updatedData : []);
//     return;
//   } catch (error: any) {
//     if (error.code === 'storage/object-not-found') {
//       setImg([]);
//       setData([]);
//     }
//     console.log('deleteImg error is:' + error);
//     return;
//   }
// };

import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ImageBackground,
  FlatList,
} from 'react-native';
import {deleteStorageImage, openCamera} from '../../firebase/storage/images';
import {colors, fonts, screenWidth} from '../../globals';
import {gStyles} from '../../globals/globalStyles';
import {UserContext} from '../../state/UserContext';
import {TGalleryScreenProps} from '../../ts/types/navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UploadImageModal from './UploadImageModal';
import {
  deleteFirestoreGalleryImg,
  getFirestoreGalleryUserImage,
} from '../../firebase/imagesCollection';
import {IGalleryImg} from '../../ts/interfaces';
import TextStylised from '../../components/UI/TextStylised';
import LinearGradient from 'react-native-linear-gradient';

const GalleryScreen = (props: TGalleryScreenProps) => {
  const {navigation} = props;
  const {state} = useContext(UserContext);
  const [userGallery, setUserGallery] = useState<IGalleryImg[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [uploadImageModal, setUploadImageModal] = useState<boolean>(false);
  const [deleteModalIndex, setDeleteModalIndex] = useState<number | false>(
    false,
  );

  useEffect(() => {
    if (!userGallery.length) {
      getFirestoreUserGallery(state.user!.uid);
    }
  }, []);

  const getFirestoreUserGallery = async (userUid: string) => {
    const gallery = await getFirestoreGalleryUserImage(userUid);
    setUserGallery(gallery);
  };

  const addNewImgToGallery = (img: IGalleryImg) => {
    setUserGallery(previous => [...previous, img]);
  };

  const deleteGalleryImg = async (item: IGalleryImg) => {
    try {
      if (isFetching) {
        return;
      }
      setIsFetching(true);
      await deleteFirestoreGalleryImg(state.user!.uid, item);
      const updatedGallery = userGallery.filter(
        (galleryImg: IGalleryImg) => galleryImg !== item,
      );
      await deleteStorageImage(state.user?.uid as string, item.fileName);
      setUserGallery(updatedGallery ?? []);
      setDeleteModalIndex(false);
      setIsFetching(false);

      return;
    } catch (error) {
      console.log('deleteGalleryImg error: ' + error);
      setDeleteModalIndex(false);
      setIsFetching(false);
      return;
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
            <Ionicons name="cloud-upload-sharp" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={[styles.btnCamera, gStyles.button]}
            onPress={() => openCamera()}>
            <Ionicons name="camera" size={20} />
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
        style={styles.flatList}
        initialNumToRender={12}
        numColumns={4}
        data={userGallery}
        scrollEnabled={true}
        keyExtractor={item => item.imgUrl}
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
              <Ionicons name="cloud-upload-sharp" size={20} />
            </TouchableOpacity>
            <TouchableOpacity
              disabled={isFetching ? true : false}
              style={[styles.btnCamera, gStyles.button]}
              onPress={() => openCamera()}>
              <Ionicons name="camera" size={20} />
            </TouchableOpacity>
          </View>
        }
        columnWrapperStyle={styles.colWrapper}
        contentContainerStyle={styles.containerContent}
        renderItem={({item, index}) => (
          <>
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.containerGalleryImg,
                // width: [4, 10].includes(index)
                //   ? '50%'
                //   : // : index !== 3
                //     // ? '33%'
                //     '25%',
              }}
              key={index}>
              <ImageBackground
                source={{uri: item.imgUrl}}
                resizeMode="cover"
                style={styles.galleryImg}
              />
              <LinearGradient
                start={{x: 0.2, y: 0}}
                end={{x: 1, y: 0}}
                colors={[colors.black, 'transparent']}
                style={styles.gradient}>
                <Text numberOfLines={1} style={styles.textTitle}>
                  {item.title}
                </Text>
              </LinearGradient>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={() => setDeleteModalIndex(index)}>
                <Ionicons name="md-close-circle-sharp" size={20} />
              </TouchableOpacity>
            </View>

            {deleteModalIndex === index && (
              <View style={styles.modalView}>
                <View style={styles.containerDeleteModal}>
                  <TextStylised content="Confirm" />
                  <View style={styles.containerDeleteIcons}>
                    <TouchableOpacity
                      style={styles.deleteModalIcon}
                      onPress={() => deleteGalleryImg(item)}>
                      <Ionicons
                        name="trash-sharp"
                        size={20}
                        color={colors.orange}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteModalIcon}
                      onPress={() => setDeleteModalIndex(false)}>
                      <Ionicons name="close-sharp" size={20} color={'white'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </>
        )}
        ListFooterComponent={
          <View style={styles.footer}>
            <Text>This is the footer</Text>
          </View>
        }
      />
    </View>
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    position: 'relative',
    flexGrow: 1,
    backgroundColor: colors.black,
  },
  container: {
    flex: 1,
    position: 'relative',
    flexGrow: 1,
  },

  // FlatList Style
  flatList: {
    flex: 1,
    maxWidth: screenWidth,
    flexGrow: 1,
    // flexWrap: 'wrap',
    // flexDirection: 'row',
    // backgroundColor: 'purple',
  },
  header: {
    // backgroundColor: 'red',
    width: screenWidth,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: 'red',
    width: screenWidth,
    height: 200,
    marginBottom: 20,
    marginTop: 100,
  },
  containerContent: {
    width: screenWidth,
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: 'green',
    paddingBottom: 100,
    flexGrow: 1,
  },
  colWrapper: {
    width: screenWidth,
    // backgroundColor: 'blue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    // marginTop: 300,
  },

  // Image
  containerGalleryImg: {
    position: 'relative',
    borderColor: colors.darkBlue,
    alignSelf: 'flex-start',
    width: screenWidth / 4,
    aspectRatio: 1 / 1,
  },
  galleryImg: {
    width: '100%',
    height: '100%',
  },
  textTitle: {
    color: colors.whiteBlue,
    marginLeft: 4,
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    overflow: 'hidden',
    bottom: 0,
    left: 0,
  },
  text: {
    marginTop: 10,
  },

  // Modal Delete
  modalView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  containerDeleteModal: {
    position: 'absolute',
    alignSelf: 'center',
    width: 160,
    backgroundColor: colors.blue,
    borderRadius: 6,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
  },
  containerDeleteIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  deleteModalIcon: {
    alignSelf: 'center',
    padding: 10,
  },

  // Modal
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2,
    opacity: 0.5,
    backgroundColor: colors.black,
  },

  // Button Style & Icon
  btnSettings: {
    position: 'absolute',
    backgroundColor: colors.orange,
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
    marginTop: 60,
    marginHorizontal: 10,
  },
  btnCamera: {
    backgroundColor: colors.blue,
    alignSelf: 'center',
    marginTop: 60,
    marginHorizontal: 10,
  },
  deleteIcon: {
    position: 'absolute',
    zIndex: 2,
    right: 10,
    top: 10,
  },
});

// const DeleteModal = () => {
//   return (
//     <View style={styles.containerDeleteModal}>
//       <TextStylised content="Confirm" />
//       <TouchableOpacity
//         style={styles.deleteIcon}
//         onPress={() => deleteGalleryImg(item)}>
//         <Ionicons name="trash-sharp" size={20} />
//       </TouchableOpacity>
//     </View>
//   );
// };

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

// Flastlist

// <FlatList
// // style={styles.flatList}
// initialNumToRender={12}
// numColumns={4}
// // keyExtractor={(item, index) => index}
// // horizontal={true}
// data={userGallery}
// ListHeaderComponent={
//   <View style={styles.header}>
//     <TouchableOpacity
//       style={styles.btnSettings}
//       onPress={() => {
//         navigation.replace('SettingsDrawer');
//       }}>
//       <Ionicons name="book" size={20} />
//     </TouchableOpacity>
//     <TouchableOpacity
//       style={btnSubmitStyle}
//       onPress={() => setUploadImageModal(true)}>
//       <Text style={styles.btnText}>Upload image</Text>
//     </TouchableOpacity>
//     <TouchableOpacity
//       disabled={isFetching ? true : false}
//       style={[styles.btnCamera, gStyles.button]}
//       onPress={() => openCamera()}>
//       <Text style={styles.btnText}>Open camera</Text>
//     </TouchableOpacity>
//   </View>
// }
// columnWrapperStyle={styles.colWrapper}
// contentContainerStyle={styles.containerContent}
// renderItem={({item, index}) => (
//   <View
//     // eslint-disable-next-line react-native/no-inline-styles
//     style={{
//       ...styles.containerGalleryImg,
//       // width: [4, 5, 6, 7].includes(index)
//       //   ? '25%'
//       //   : index !== 3
//       //   ? '33%'
//       //   : '50%',
//       // width: '20%',
//       margin: 1,
//       aspectRatio: 1 / 1,
//     }}
//     key={index}>
//     <ImageBackground
//       source={{uri: item.imgUrl}}
//       resizeMode="cover"
//       style={styles.galleryImg}
//     />
//     <Text style={styles.textTitle}>{item.title}</Text>
//     {/* <Text style={styles.text}>{item.description}</Text> */}
//     <TouchableOpacity
//       style={styles.deleteIcon}
//       onPress={() => deleteGalleryImg(item)}>
//       <Ionicons name="md-close-circle-sharp" size={20} />
//     </TouchableOpacity>
//   </View>
// )}
// // ItemSeparatorComponent={({highlighted}) => (
// //   // <Gap height={20} backgroundColor={colors.white} />
// //   <View style={{backgroundColor: 'white', height: 20}} />
// // )}
// // ListFooterComponent={
// //   <View style={styles.footer}>
// //     <Text>Footer</Text>
// //   </View>
// // }
// />

// prolly useless

// const getPicture = async (userUid: string) => {
//   try {
//     if (isFetching) {
//       return;
//     }
//     const userData = await getUserStorageData(userUid);
//     if (!userData) {
//       throw new Error('Images not found');
//     }
//     let imgsArray: string[] = [];
//     for (let index = 0; index < userData.items.length; index++) {
//       const url = await userData.items[index].getDownloadURL();
//       imgsArray.push(url);
//     }
//     setImg(imgsArray);
//     setIsFetching(false);
//     return;
//   } catch (error) {
//     console.log('getPicture Error is:' + error);
//     setIsFetching(false);
//     return;
//   }
// };

// {!!uploadImageModal && (
//   <UploadImageModal
//     addNewImgToGallery={addNewImgToGallery}
//     setUploadImageModal={setUploadImageModal}
//   />
// )}
// {!!uploadImageModal && (
//   <UploadImageModal
//     addNewImgToGallery={addNewImgToGallery}
//     setUploadImageModal={setUploadImageModal}
//   />
// )}
// {!!uploadImageModal && (
//   <Pressable
//     style={styles.overlay}
//     onPress={() => {
//       setUploadImageModal(false);
//       // setDeleteModalIndex(false);
//     }}
//   />
// )}

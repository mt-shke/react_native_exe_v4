import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  getUserStorageData,
  sendLocalImgToStorage,
} from '../firebase/storage/images';
import {colors, fonts} from '../globals';
import {gStyles} from '../globals/globalStyles';
import {UserContext} from '../state/UserContext';
import {TGalleryScreenProps} from '../ts/types/navigation';

const GalleryScreen = (props: TGalleryScreenProps) => {
  const {navigation} = props;
  const {state} = useContext(UserContext);
  const [data, setData] = useState<any>(null);
  const [imgs, setImg] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // const noPic = !imgs && require('../assets/download.jpg');

  useEffect(() => {
    if (!imgs.length) {
      getPicture(state.user!.uid);
    }
  }, []);

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
      setData(userData);
      setIsFetching(false);
      return;
    } catch (error) {
      console.log(error);
      setIsFetching(false);
      return;
    }
  };

  const postImage = async () => {
    try {
      if (isFetching) {
        return;
      }
      setIsFetching(true);
      await sendLocalImgToStorage(state.user!.uid);
      setIsFetching(false);
      return getPicture(state.user!.uid);
    } catch (error) {
      console.log(error);
      setIsFetching(false);
      return;
    }
  };

  const btnSubmitStyle = {
    ...styles.btnSubmit,
    ...gStyles.button,
    opacity: isFetching ? 0.5 : 1,
  };

  if (!imgs?.length) {
    return (
      <View style={styles.container}>
        <Text>GalleryScreen</Text>
        <TouchableOpacity
          disabled={isFetching ? true : false}
          style={btnSubmitStyle}
          onPress={() => postImage()}>
          <Text style={styles.btnText}>Send picture to your gallery</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      initialNumToRender={4}
      numColumns={1}
      // horizontal={true}
      data={imgs}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text>GalleryScreen</Text>
          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={btnSubmitStyle}
            onPress={() => postImage()}>
            <Text style={styles.btnText}>Send picture to your gallery</Text>
          </TouchableOpacity>
        </View>
      }
      renderItem={({item, index}) => (
        <View key={index}>
          <TouchableOpacity onPress={() => {}}>
            <ImageBackground
              key={index}
              source={{uri: item}}
              resizeMode="cover"
              style={styles.img}
            />
          </TouchableOpacity>
        </View>
      )}
      // ItemSeparatorComponent={({highlighted}) => (
      //   // <Gap height={20} backgroundColor={colors.white} />
      //   <View style={{backgroundColor: 'white', height: 20}} />
      // )}
      ListFooterComponent={
        <View style={styles.footer}>
          <Text>Footer</Text>
        </View>
      }
    />
  );
};

export default GalleryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'lightblue',
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
  img: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 100,
  },
  footer: {paddingVertical: 100},
});

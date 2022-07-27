import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ImageBackground,
  ScrollView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomInput from '../../components/CustomInput';
import {imgsBg} from '../../data';
import {retrieveLocalImg} from '../../firebase/storage/images';
import {colors, fonts, gStyle} from '../../globals';
import {productSchema} from '../../schema/yup';
import {UserContext} from '../../state/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProductUploadData {
  author: string;
  imgUrl: string[];
  title: string;
  description: string;
  createdAt: Date;
  UpdatedAt: Date;
}

const AddProductScreen: React.FC = () => {
  const {state} = useContext(UserContext);
  const [isFetching, setIsFetching] = useState(false);
  const [localImgs, setLocalImgs] = useState<string[]>([]);
  const [imgError, setImgError] = useState('');

  // Form
  const {
    control,
    handleSubmit,
    clearErrors,
    getValues,
    setValue,
    formState: {errors},
  } = useForm<IProductUploadData>({
    resolver: yupResolver(productSchema),
  });

  useEffect(() => {
    if (!getValues('author')) {
      setValue('author', state.user!.uid);
    }
  }, []);

  const onSubmit = async (data: IProductUploadData) => {
    try {
      if (isFetching) {
        return;
      }
      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      const userUid = state.user!.uid;
      // const response = await sendLocalImgToStorage(userUid, {
      //   uri: localImg.uri,
      //   fileName: localImg.fileName,
      // });
      //     if (!response) {
      //       throw new Error(
      //         'On submitting upload image form: cannot upload image to storage',
      //       );
      //     }

      //     const fetchedUrl = (await response.getDownloadURL()) as string;
      //     const newImg = {
      //       title: data.title,
      //       imgUrl: fetchedUrl,
      //       description: data.description ?? '',
      //       fileName: localImg.fileName,
      //     };

      //     await addFirestoreGalleryUserImage(userUid, newImg);
      //     addNewImgToGallery(newImg);
      //     setUploadImageModal(false);
      //     setIsFetching(false);
      return;
    } catch (error: any) {
      console.log('onSubmitting galleryImg error is:' + error);
      setIsFetching(false);
      return;
    }
  };

  // Image
  const retrieveImg = async () => {
    try {
      setImgError('');
      console.log('in');

      const localImgToUpload: any = await retrieveLocalImg();
      if (!localImgToUpload) {
        throw new Error('Image not available');
      }

      const localImgUri = localImgToUpload.uri as string;
      setLocalImgs(previous => [...previous, localImgUri]);
      setValue('imgUrl', localImgs);
      return;
    } catch (error: any) {
      console.log('retrieveImg error: ' + error);
      setImgError('Image not available');
      return;
    }
  };

  const btnSubmitStyle = {
    ...gStyle.btnContainer,
    opacity: isFetching ? 0.5 : 1,
  };

  // {!!localImgs.length &&
  //   localImgs.map((img, index) => {
  //     <TouchableOpacity key={index} onPress={() => retrieveImg()}>
  //       <ImageBackground
  //         source={{uri: img}}
  //         resizeMode="cover"
  //         style={styles.localImg}
  //       />
  //     </TouchableOpacity>;
  //   })}
  const bgImg = imgsBg[1];

  return (
    <ImageBackground
      source={bgImg}
      resizeMode="cover"
      style={styles.mainContainer}>
      <ScrollView style={styles.container}>
        <View style={styles.containerForm}>
          {!!localImgs.length &&
            localImgs.map((img, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  setLocalImgs(prev =>
                    [...prev].filter(
                      stateImgUrl => stateImgUrl !== prev[index],
                    ),
                  )
                }>
                <ImageBackground
                  source={{uri: img}}
                  resizeMode="cover"
                  style={styles.localImg}
                />
              </TouchableOpacity>
            ))}

          {!localImgs.length && (
            <TouchableOpacity onPress={() => retrieveImg()}>
              <Ionicons
                name={'image-sharp'}
                color={colors.greenblue}
                size={40}
              />
            </TouchableOpacity>
          )}
          <Controller
            control={control}
            rules={{required: true}}
            name={'title'}
            render={({field}) => (
              <CustomInput
                placeholder="Title"
                field={field}
                error={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            rules={{
              maxLength: 400,
            }}
            name={'description'}
            render={({field}) => (
              <CustomInput
                placeholder="Description"
                field={field}
                error={errors.description?.message}
                line={4}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name={'imgUrl'}
            render={({field}) => (
              <View style={styles.containerInputImg}>
                <CustomInput
                  field={field}
                  error={errors.description?.message}
                />
              </View>
            )}
          />

          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={btnSubmitStyle}
            onPress={handleSubmit(onSubmit)}>
            <Text style={gStyle.btnText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default AddProductScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    borderRadius: 6,
    marginTop: 80,
    alignSelf: 'center',
  },
  containerForm: {
    borderRadius: 6,
    paddingHorizontal: 20,
    width: '100%',
  },
  localImg: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginBottom: 40,
  },
  containerUploadIcon: {
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.courgette,
    fontSize: 18,
  },
  btnSubmit: {
    backgroundColor: colors.greenblue,
    alignSelf: 'center',
    marginTop: 40,
  },
  btnLogin: {
    backgroundColor: colors.blue,
    alignSelf: 'center',
    marginTop: 30,
  },
  containerInputImg: {
    backgroundColor: colors.blue,
    display: 'none',
  },
  textConditions: {
    color: colors.blue,
    fontSize: 16,
    fontFamily: fonts.hindi,
    position: 'absolute',
    bottom: -24,
  },
});

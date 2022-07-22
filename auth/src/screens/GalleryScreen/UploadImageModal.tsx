import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {imgUploadSchema} from '../../schema/yup';
import CustomInput from '../../components/CustomInput';
import {fonts} from '../../globals';
import {gStyles} from '../../globals/globalStyles';
import {colors} from '../../globals/colors';
import {
  retrieveLocalImg,
  sendLocalImgToStorage,
} from '../../firebase/storage/images';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../../state/UserContext';
import {addFirestoreGalleryUserImage} from '../../firebase/imagesCollection';
import {IGalleryImg} from '../../ts/interfaces';

interface IImgUploadData {
  title: string;
  image: string;
  description?: string;
}

interface IUploadImageModalProps {
  addNewImgToGallery: (galleryImg: IGalleryImg) => void;
  setUploadImageModal: (aboolean: boolean) => void;
}

// Form
const UploadImageModal = ({
  addNewImgToGallery,
  setUploadImageModal,
}: IUploadImageModalProps) => {
  const {state} = useContext(UserContext);
  const [isFetching, setIsFetching] = useState(false);
  const [localImg, setLocalImg] = useState<any>('');
  const [imgError, setImgError] = useState('');

  // Form
  const {
    control,
    handleSubmit,
    clearErrors,
    setValue,
    formState: {errors},
  } = useForm<IImgUploadData>({
    resolver: yupResolver(imgUploadSchema),
  });

  const onSubmit = async (data: IImgUploadData) => {
    try {
      if (isFetching) {
        return;
      }
      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      const userUid = state.user!.uid;
      const response = await sendLocalImgToStorage(userUid, {
        uri: localImg.uri,
        fileName: localImg.fileName,
      });
      if (!response) {
        throw new Error(
          'On submitting upload image form: cannot upload image to storage',
        );
      }

      const fetchedUrl = (await response.getDownloadURL()) as string;
      const newImg = {
        title: data.title,
        imgUrl: fetchedUrl,
        description: data.description ?? '',
        fileName: localImg.fileName,
      };

      await addFirestoreGalleryUserImage(userUid, newImg);
      addNewImgToGallery(newImg);
      setUploadImageModal(false);
      setIsFetching(false);
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
      const localImgToUpload: any = await retrieveLocalImg();
      if (!localImgToUpload) {
        throw new Error('Image not available');
      }

      setLocalImg(localImgToUpload);
      const localImgUri = localImgToUpload.uri as string;
      setValue('image', localImgUri);
      return;
    } catch (error: any) {
      console.log('retrieveImg error: ' + error);
      setImgError('Image not available');
      return;
    }
  };

  const btnSubmitStyle = {
    ...styles.btnSubmit,
    ...gStyles.button,
    opacity: isFetching ? 0.5 : 1,
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        {!!localImg && (
          <TouchableOpacity onPress={() => retrieveImg()}>
            <ImageBackground
              source={{uri: localImg.uri}}
              resizeMode="cover"
              style={styles.localImg}
            />
          </TouchableOpacity>
        )}
        {!localImg && (
          <View style={styles.containerUploadIcon}>
            <TouchableOpacity onPress={() => retrieveImg()}>
              <Ionicons name="md-images-sharp" size={20} />
            </TouchableOpacity>
            {!!imgError && <Text>{imgError}</Text>}
          </View>
        )}
        <Controller
          control={control}
          rules={{required: true}}
          name={'title'}
          render={({field}) => (
            <CustomInput
              label="Title"
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
              label="Description"
              field={field}
              error={errors.description?.message}
            />
          )}
        />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name={'image'}
          render={({field}) => (
            <View style={styles.containerInputImg}>
              <CustomInput field={field} error={errors.description?.message} />
            </View>
          )}
        />

        <TouchableOpacity
          disabled={isFetching ? true : false}
          style={btnSubmitStyle}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UploadImageModal;

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    width: '90%',
    padding: 30,
    borderRadius: 6,
    marginTop: 80,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: colors.whiteBlue,
  },
  containerForm: {
    borderRadius: 6,
    width: '100%',
    backgroundColor: colors.whiteBlue,
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
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },
  btnSubmit: {
    backgroundColor: colors.lightGreen,
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
    color: colors.darkBlue,
    fontSize: 16,
    fontFamily: fonts.primary,
    position: 'absolute',
    bottom: -24,
  },
});

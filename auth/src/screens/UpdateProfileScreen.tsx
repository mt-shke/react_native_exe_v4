import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import {TUpdateProfileScreenNavigationProp} from '../ts/types/navigation';
import Modal from '../components/UI/Modal';
import CustomInput from '../components/CustomInput';
import {Controller, useForm} from 'react-hook-form';
import {updateProfileSchema} from '../schema/yup';
import {screenWidth} from '../globals';
import {updateUserFirestore} from '../firebase';
import {yupResolver} from '@hookform/resolvers/yup';
import {UserContext} from '../state/UserContext';

interface IUpdateProfileForm {
  username: string;
}

const UpdateProfileScreen = () => {
  const navigation = useNavigation<TUpdateProfileScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IUpdateProfileForm>({
    resolver: yupResolver(updateProfileSchema),
  });
  const {state} = useContext(UserContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const user = state.user;

  const onSubmit = async (data: IUpdateProfileForm) => {
    try {
      if (isFetching) {
        return;
      }

      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      const response = await updateUserFirestore(user!.uid, {
        'profile.username': data.username,
      });
      if (!response.success) {
        throw new Error('Error while updating user');
      }
      setModal(true);
      setTimeout(() => {
        setModal(false);
        setIsFetching(false);
        navigation.navigate('SettingsScreen');
      }, 3000);
      return;
    } catch (error: any) {
      console.log(error);
      setIsFetching(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/bg-settings.png')}
      resizeMode="cover"
      style={styles.bg}>
      <ImageBackground
        source={require('../../assets/img/bg-page-nobg.png')}
        resizeMode="cover"
        style={styles.bg}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerForm}>
              <Controller
                control={control}
                rules={{maxLength: 40}}
                name={'username'}
                render={({field}) => (
                  <CustomInput
                    field={field}
                    error={errors.username?.message}
                    placeholder={'Enter your new username'}
                  />
                )}
              />
              <TouchableOpacity
                disabled={isFetching ? true : false}
                style={styles.btnSubmit}
                onPress={handleSubmit(onSubmit)}>
                <Text>Submit</Text>
              </TouchableOpacity>
            </View>
            {Boolean(modal) && (
              <Modal
                text="Your username has been updated successfully"
                style={styles.modal}
              />
            )}
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'flex-end',
  },
  containerForm: {
    width: screenWidth - 80,
    paddingVertical: 100,
    alignSelf: 'center',
  },
  modal: {
    width: '90%',
    padding: 20,
    top: 240,
    alignSelf: 'center',
  },
  btnSubmit: {
    backgroundColor: 'lightgreen',
    marginTop: 60,
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

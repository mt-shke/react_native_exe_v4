import {yupResolver} from '@hookform/resolvers/yup';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import Modal from '../../components/UI/Modal';
import {imgsBg} from '../../data';
import {getUserData, updateUserFirestore} from '../../firebase';
import {colors, screenWidth} from '../../globals';
import {TAccountStackParamsList} from '../../navigation/AccountStack';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import {updateProfileSchema} from '../../schema/yup';
import {UserContext} from '../../state/UserContext';
import {IUser} from '../../ts/interfaces';

type TUpdateProfileScreen = CompositeNavigationProp<
  NativeStackNavigationProp<TAccountStackParamsList, 'UpdateProfileScreen'>,
  MaterialBottomTabNavigationProp<TAuthenticatedStackParamsList, 'AccountStack'>
>;

const UpdateProfileScreen = () => {
  const navigation = useNavigation<TUpdateProfileScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IUser>({
    resolver: yupResolver(updateProfileSchema),
  });

  const {state} = useContext(UserContext);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [modal, setModal] = useState(false);
  const [fetchedUserData, setFetchedUserData] = useState<IUser | false>(false);
  const user = state.user;

  useEffect(() => {
    // if (!fetchedUserData) {
    //   const userData = getUserData();
    //   setFetchedUserData(userData);
    // }
  }, []);

  const onSubmit = async (data: IUser) => {
    try {
      if (isFetching) {
        return;
      }

      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      // const response = await updateUserFirestore(user!.uid, data);
      // if (!response.success) {
      //   throw new Error('Error while updating user');
      // }
      // setModal(true);
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

  const bgImg = imgsBg[0];

  return (
    <ImageBackground source={bgImg} resizeMode="cover" style={styles.bg}>
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
                  placeholder={'Votre prénom'}
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
    backgroundColor: colors.orange,
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
    backgroundColor: colors.lightgreen,
    marginTop: 60,
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

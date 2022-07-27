import {yupResolver} from '@hookform/resolvers/yup';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, Text, StyleSheet, Keyboard} from 'react-native';
import {TAccountStackParamsList} from '../../navigation/AccountStack';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import {changePasswordSchema} from '../../schema/yup';
import auth from '@react-native-firebase/auth';
import {colors, fonts, gStyle} from '../../globals';
import CustomInput from '../../components/CustomInput';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Modal from '../../components/UI/Modal';

type TChangePasswordScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<TAccountStackParamsList, 'ChangePasswordScreen'>,
  MaterialBottomTabNavigationProp<TAuthenticatedStackParamsList, 'AccountStack'>
>;

interface IChangePassword {
  email: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

const ChangePasswordScreen = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IChangePassword>({
    resolver: yupResolver(changePasswordSchema),
  });

  const navigation = useNavigation<TChangePasswordScreenNavigationProp>();

  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [validationModal, setValidationModal] = useState(false);

  const onSubmit = async (data: IChangePassword) => {
    try {
      if (isFetching) {
        return;
      }
      setEmailAsyncError(null);
      setPasswordAsyncError(null);
      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      const response = await auth().signInWithEmailAndPassword(
        data.email,
        data.oldPassword,
      );

      if (!response) {
        setIsFetching(false);
        return;
      }
      await auth().currentUser?.updatePassword(data.newPasswordConfirmation);

      setValidationModal(true);
      setTimeout(() => {
        navigation.navigate('AccountScreen');
      }, 2000);
      setIsFetching(false);
      return;
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setEmailAsyncError('That email address is invalid');
        setIsFetching(false);
        return;
      }
      emailAsyncError && setEmailAsyncError(null);
      if (error.code === 'auth/wrong-password') {
        setPasswordAsyncError('Password is invalid');
        setIsFetching(false);
        return;
      }
      passwordAsyncError && setEmailAsyncError(null);
      console.error(error);
      setIsFetching(false);
      return;
    }
  };

  const emailError = errors.email?.message
    ? errors.email?.message
    : emailAsyncError
    ? emailAsyncError
    : '';

  const passwordError = errors.oldPassword?.message
    ? errors.oldPassword?.message
    : passwordAsyncError
    ? passwordAsyncError
    : '';

  const btnSubmitStyle = {
    ...styles.btnSubmit,
    ...gStyle.btnContainer,
    opacity: isFetching ? 0.5 : 1,
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <Controller
            control={control}
            rules={{
              maxLength: 40,
            }}
            name={'email'}
            render={({field}) => (
              <CustomInput
                keyboard="email-address"
                placeholder="Email"
                field={field}
                error={emailError}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              maxLength: 40,
            }}
            name={'oldPassword'}
            render={({field}) => (
              <CustomInput
                placeholder="Ancien mot de passe"
                field={field}
                type="password"
                error={passwordError}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              maxLength: 40,
            }}
            name={'newPassword'}
            render={({field}) => (
              <CustomInput
                placeholder="Nouveau mot de passe"
                field={field}
                type="password"
                error={errors.newPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            rules={{
              maxLength: 40,
            }}
            name={'newPasswordConfirmation'}
            render={({field}) => (
              <CustomInput
                placeholder="Nouveau mot de passe confirmation"
                field={field}
                type="password"
                error={errors.newPasswordConfirmation?.message}
              />
            )}
          />
        </View>

        <TouchableOpacity
          disabled={isFetching ? true : false}
          style={btnSubmitStyle}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Modifier</Text>
        </TouchableOpacity>
      </View>
      {Boolean(validationModal) && (
        <Modal
          text="Password has been successfully updated"
          style={styles.modal}
        />
      )}
    </>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    paddingHorizontal: 40,
  },
  containerForm: {
    width: '100%',
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.courgette,
    fontSize: 18,
  },

  btnSubmit: {
    backgroundColor: colors.blue,
    marginTop: 30,
    alignSelf: 'center',
  },

  signBtn: {
    backgroundColor: colors.green,
    alignSelf: 'center',
    marginTop: 30,
  },
  modal: {
    width: '90%',
    padding: 20,
    top: 240,
    alignSelf: 'center',
  },
  btnForgot: {
    backgroundColor: colors.orange,
    position: 'absolute',
    padding: 4,
    borderRadius: 4,
    bottom: 10,
    right: 10,
  },
  btnTextForgot: {
    fontFamily: fonts.courgette,
    fontSize: 14,
  },
});

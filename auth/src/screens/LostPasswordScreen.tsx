import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
  Keyboard,
} from 'react-native';
import CustomInput from '../components/CustomInput';
import Modal from '../components/UI/Modal';
import {colors, fonts, formWidth} from '../globals';
import {gStyles} from '../globals/globalStyles';
import {emailSchema} from '../schema/yup';
import auth from '@react-native-firebase/auth';
import {IEmail} from '../ts/interfaces';
import {TLostPasswordScreenNavigationProp} from '../ts/types/navigation';

const LostPasswordScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IEmail>({
    resolver: yupResolver(emailSchema),
  });

  const navigation = useNavigation<TLostPasswordScreenNavigationProp>();

  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [modal, setModal] = useState(false);

  const onSubmit = async (data: IEmail) => {
    try {
      if (isFetching) {
        return;
      }
      setEmailAsyncError(null);
      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      await auth().sendPasswordResetEmail(data.email);

      setModal(true);
      return setTimeout(() => {
        setModal(false);
        setIsFetching(false);
      }, 4000);
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setEmailAsyncError('That email address is invalid');
        setIsFetching(false);
        return;
      }
      emailAsyncError && setEmailAsyncError(null);
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

  const btnSubmitStyle = {
    ...styles.btnForgot,
    ...gStyles.button,
    opacity: isFetching ? 0.5 : 1,
  };

  return (
    <ImageBackground
      source={require('../../assets/img/bg-login.png')}
      style={styles.bg}>
      <View style={styles.container}>
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
                  label="Email"
                  field={field}
                  error={emailError}
                />
              )}
            />
          </View>

          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={btnSubmitStyle}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>Reset password</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btnLogin, gStyles.button]}
            onPress={() => navigation.replace('LoginScreen')}>
            <Text style={styles.btnText}>Back to login screen</Text>
          </TouchableOpacity>
        </View>
        {Boolean(modal) && (
          <Modal
            text="Please check your email to reset your password"
            style={styles.modal}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default LostPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 94,
  },
  bg: {
    flex: 1,
  },
  containerForm: {
    width: formWidth,
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },

  btnLogin: {
    backgroundColor: colors.blue,
    marginTop: 30,
    alignSelf: 'center',
  },

  btnForgot: {
    backgroundColor: colors.orange,
    marginTop: 30,
    alignSelf: 'center',
  },
  modal: {
    width: '90%',
    padding: 20,
    top: 240,
    alignSelf: 'center',
  },

  btnTextForgot: {
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  btnSettings: {
    backgroundColor: 'orange',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    margin: 20,
    alignSelf: 'flex-end',
  },
});

import {yupResolver} from '@hookform/resolvers/yup';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {credentialsSchema} from '../../schema/yup';
import {ICredentials} from '../../ts/interfaces';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../components/CustomInput';
import {fonts, formWidth} from '../../globals';
import {gStyles} from '../../globals/globalStyles';
import {colors} from '../../globals/colors';
import Modal from '../../components/UI/Modal';
import {TLoginScreenNavigationProp} from '../../ts/types/navigation';
import {signOut} from '../../firebase';
import {storage} from '../../../App';

const LoginForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<ICredentials>({
    resolver: yupResolver(credentialsSchema),
  });

  const navigation = useNavigation<TLoginScreenNavigationProp>();

  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [validationModal, setValidationModal] = useState(false);

  const jsonUser = storage.getString('user');
  const credentials = jsonUser ? JSON.parse(jsonUser) : null;

  useEffect(() => {
    if (credentials) {
      auth().signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
    }
  });

  const onSubmit = async (data: ICredentials) => {
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
        data.password,
      );
      if (response && !response.user.emailVerified) {
        await response.user.sendEmailVerification();
        signOut();
        setValidationModal(true);
        return setTimeout(() => {
          setValidationModal(false);
          setIsFetching(false);
        }, 6000);
      }

      storage.set(
        'user',
        JSON.stringify({email: data.email, password: data.password}),
      );

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

  const passwordError = errors.password?.message
    ? errors.password?.message
    : passwordAsyncError
    ? passwordAsyncError
    : '';

  const btnSubmitStyle = {
    ...styles.btnSubmit,
    ...gStyles.button,
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
                label="Email"
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
            name={'password'}
            render={({field}) => (
              <CustomInput
                label="Password"
                field={field}
                type="password"
                error={passwordError}
              />
            )}
          />
        </View>

        <TouchableOpacity
          disabled={isFetching ? true : false}
          style={btnSubmitStyle}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signBtn, gStyles.button]}
          onPress={() => navigation.replace('SignUpScreen')}>
          <Text style={styles.btnText}>Sign up a new account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnForgot}
          onPress={() => navigation.replace('LostPasswordScreen')}>
          <Text style={styles.btnTextForgot}>Lost password</Text>
        </TouchableOpacity>
      </View>
      {Boolean(validationModal) && (
        <Modal
          text="Please check your email and activate your account before login"
          style={styles.modal}
        />
      )}
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
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

  btnSubmit: {
    backgroundColor: colors.blue,
    marginTop: 30,
    alignSelf: 'center',
  },

  signBtn: {
    backgroundColor: colors.lightGreen,
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
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
});

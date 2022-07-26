import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {credentialsSchema} from '../../../schema/yup';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../../components/CustomInput';
import {colors} from '../../../globals/colors';
import {signOut} from '../../../firebase';
import {ICredentials} from '../../../ts/interfaces';
import {fonts, gStyle, screenWidth} from '../../../globals';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';

type TLoginScreenNavigationProp = NativeStackNavigationProp<
  TUnauthenticatedStackParamsList,
  'LoginScreen'
>;

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
  // const [validationModal, setValidationModal] = useState(false);
  // const [credentialsChecked, setCredentialsChecked] = useState(false);

  // const jsonUser = storage.getString('user');
  // const credentials = jsonUser ? JSON.parse(jsonUser) : null;

  const onSubmit = async (data: ICredentials) => {
    try {
      if (isFetching) {
        return;
      }
      console.log(data);

      setEmailAsyncError(null);
      setPasswordAsyncError(null);
      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      const response = await auth().signInWithEmailAndPassword(
        data.email,
        data.password,
      );
      // if (response && !response.user.emailVerified) {
      //   await response.user.sendEmailVerification();
      //   signOut();
      //   // setValidationModal(true);
      //   return setTimeout(() => {
      //     // setValidationModal(false);
      //     setIsFetching(false);
      //   }, 6000);
      // }

      // storage.set(
      //   'user',
      //   JSON.stringify({email: data.email, password: data.password}),
      // );
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
      console.error('Login error: ' + error);
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
    ...gStyle.btnContainer,
    opacity: isFetching ? 0.5 : 1,
  };

  // if (credentials && !credentialsChecked) {
  //   signIn({email: credentials.email, password: credentials.password});
  //   setTimeout(() => {
  //     setCredentialsChecked(true);
  //   }, 3000);

  //   return <ActivityIndicator size={'large'} />;
  // }

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
            name={'password'}
            render={({field}) => (
              <CustomInput
                placeholder="Password"
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
          <Text style={gStyle.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={gStyle.btnContainer}
          onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={gStyle.btnText}>Sign up a new account</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.btnForgot}
          onPress={() => navigation.replace('LostPasswordScreen')}>
          <Text style={styles.btnTextForgot}>Lost password</Text>
        </TouchableOpacity> */}
      </View>
      {/* {Boolean(validationModal) && (
        <Modal
          text="Please check your email and activate your account before login"
          style={styles.modal}
        />
      )} */}
    </>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerForm: {
    width: screenWidth,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  modal: {
    width: '90%',
    padding: 20,
    top: 240,
    alignSelf: 'center',
  },

  // Button

  signBtn: {
    backgroundColor: colors.grey,
    alignSelf: 'center',
    marginTop: 30,
  },
  btnForgot: {
    backgroundColor: colors.grey,
    position: 'absolute',
    padding: 4,
    borderRadius: 4,
    bottom: 10,
    right: 10,
  },
  btnTextForgot: {
    fontFamily: fonts.hindi,
    fontSize: 14,
  },
});

import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
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
import {signIn, signOut} from '../../firebase';
import {storage} from '../../../App';
import ReactNativeBiometrics from 'react-native-biometrics';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Keychain from 'react-native-keychain';

const LoginForm: React.FC = () => {
  const navigation = useNavigation<TLoginScreenNavigationProp>();
  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [credentialsChecked, setCredentialsChecked] = useState(false);
  const [validationModal, setValidationModal] = useState(false);
  const [touchModal, setTouchModal] = useState(false);

  // Local stored user
  const jsonUser = storage.getString('user');
  const credentials = jsonUser ? JSON.parse(jsonUser) : null;

  // Biometrics
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });

  const touchHandler = async () => {
    try {
      let {success, error} = await rnBiometrics.simplePrompt({
        promptMessage: 'Sign in with Touch ID',
        cancelButtonText: 'Close',
      });
      if (!success) {
        console.log('Login user');
        return;
      }

      await loginWithLocalKeychainCredentials();
      return;
    } catch (error: any) {
      return;
    }
  };

  // Login with keyChain Credentials
  const loginWithLocalKeychainCredentials = async () => {
    try {
      const localKeychainCredentials = await Keychain.getGenericPassword(
        credentials,
      );
      if (!localKeychainCredentials) {
        throw new Error('Keychain password not found');
      }
      const response = await signIn({
        email: localKeychainCredentials.username,
        password: localKeychainCredentials.password,
      });
      if (!response) {
        throw new Error('Invalid credentials while login with Touch');
      }
      return;
    } catch (error) {
      setTouchModal(true);
      setTimeout(() => {
        setTouchModal(false);
      }, 3000);
      return;
    }
  };

  // Form
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<ICredentials>({
    resolver: yupResolver(credentialsSchema),
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

      const keyChainCredentials = await Keychain.setGenericPassword(
        data.email,
        data.password,
      );
      if (!keyChainCredentials) {
        console.log('Credentials has not been encrypted!');
        setIsFetching(false);
        return;
      }
      storage.set('user', JSON.stringify(keyChainCredentials));
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

  if (credentials && !credentialsChecked) {
    loginWithLocalKeychainCredentials();
    setTimeout(() => {
      setCredentialsChecked(true);
    }, 5000);

    return <ActivityIndicator size={'large'} />;
  }

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
        <View style={styles.containerBtnLogin}>
          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={btnSubmitStyle}
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={styles.btnTouch}
            onPress={() => touchHandler()}>
            <Ionicons name="finger-print-sharp" size={20} />

            {/* <Text style={styles.btnText}>Touch Login</Text> */}
          </TouchableOpacity>
        </View>

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
          text={
            'Please check your email and activate your account before login'
          }
          style={styles.modal}
        />
      )}
      {Boolean(touchModal) && (
        <Modal
          text={'Touch is unavailable, please login with email and password'}
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

  containerBtnLogin: {
    position: 'relative',
  },

  btnTouch: {
    position: 'absolute',
    right: 20,
    backgroundColor: colors.blue,
    marginTop: 30,
    alignSelf: 'center',
    borderRadius: 12,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 16,
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

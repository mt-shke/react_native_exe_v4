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
import {credentialsSchema} from '../../../schema/yup';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../../components/CustomInput';
import {colors} from '../../../globals/colors';
import {signIn, signOut} from '../../../firebase';
import {ICredentials} from '../../../ts/interfaces';
import {fonts, gStyle, screenHeight, screenWidth} from '../../../globals';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';
import {storage} from '../../../../App';
import Modal from '../../../components/UI/Modal';
import * as Keychain from 'react-native-keychain';
import ReactNativeBiometrics from 'react-native-biometrics';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const [credentialsChecked, setCredentialsChecked] = useState<boolean>(false);
  const [validationModal, setValidationModal] = useState<boolean>(false);
  const [touchModal, setTouchModal] = useState<boolean>(false);

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
        console.log('Biometrics invalid');
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

      console.log('response auth is ' + response);

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

  if (credentials && !credentialsChecked) {
    signIn({email: credentials.email, password: credentials.password});
    setTimeout(() => {
      setCredentialsChecked(true);
    }, 3000);

    return (
      <View style={styles.container}>
        <ActivityIndicator size={'large'} style={styles.spinner} />
      </View>
    );
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
                placeholder="Mot de passe"
                field={field}
                type="password"
                error={passwordError}
              />
            )}
          />
        </View>

        <View style={styles.containerBtn}>
          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={btnSubmitStyle}
            onPress={handleSubmit(onSubmit)}>
            <Text style={gStyle.btnText}>Connection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={gStyle.btnContainer}
            onPress={() => navigation.replace('RegisterScreen')}>
            <Text style={gStyle.btnText}>Créer un compte</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isFetching ? true : false}
            style={styles.btnTouch}
            onPress={() => touchHandler()}>
            <Ionicons name="finger-print-sharp" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnForgot}
          onPress={() => navigation.replace('LostPasswordScreen')}>
          <Text style={styles.btnTextForgot}>Mot de passe perdu ?</Text>
        </TouchableOpacity>
      </View>
      {Boolean(validationModal) && (
        <Modal
          text="Veuillez activer votre compte en cliquant sur lien envoyé à votre email avant de vous connecter."
          style={styles.modal}
        />
      )}
      {Boolean(touchModal) && (
        <Modal
          text={
            'Touch indisponible, veuillez vous connecter en entrant vos identifiants'
          }
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
    width: screenWidth,
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginTop: 60,
  },
  modal: {
    width: '90%',
    padding: 20,
    top: 240,
    alignSelf: 'center',
  },
  containerBtn: {
    position: 'relative',
  },

  // Button
  signBtn: {
    backgroundColor: colors.grey,
    alignSelf: 'center',
    marginTop: 30,
  },
  btnForgot: {
    backgroundColor: colors.orange,
    position: 'absolute',
    padding: 4,
    borderRadius: 4,
    bottom: 20,
    right: 20,
  },
  btnTextForgot: {
    fontFamily: fonts.hindi,
    fontSize: 14,
  },
  btnTouch: {
    position: 'absolute',
    right: 4,
    marginRight: 10,
    backgroundColor: colors.green,
    marginTop: 20,
    alignSelf: 'center',
    borderRadius: 12,
    elevation: 10,
    borderWidth: 0.5,
    borderColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  spinner: {
    alignSelf: 'center',
  },
});

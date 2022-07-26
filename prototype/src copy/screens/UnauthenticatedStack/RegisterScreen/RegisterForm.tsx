import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {signUpSchema} from '../../../schema/yup';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {setUserToFirestore} from '../../../firebase';
import CustomInput from '../../../components/CustomInput';
import {colors, fonts, screenWidth} from '../../../globals';
import {TRegisterScreenProps} from '.';

interface IRegisterForm {
  email: string;
  password: string;
  conditionsCheck: boolean;
}

// type TRegisterFormNavigation = NativeStackNavigationProp<TRegisterScreenProps>;

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IRegisterForm>({
    resolver: yupResolver(signUpSchema),
  });

  const {navigation} = useNavigation<TRegisterScreenProps>();

  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  // const [validationModal, setValidationModal] = useState(false);

  const onSubmit = async (data: IRegisterForm) => {
    try {
      if (isFetching) {
        return;
      }
      setEmailAsyncError(null);
      setPasswordAsyncError(null);
      clearErrors();
      Keyboard.dismiss();
      setIsFetching(true);
      const createResponse = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );

      if (!createResponse) {
        throw new Error('Cannot create new user');
      }
      const allResponse = await Promise.all([
        setUserToFirestore(createResponse.user.uid, data.email),
        createResponse.user.sendEmailVerification(),
      ]);

      if (!allResponse) {
        throw new Error(
          'User firestore update, or send verification email failed',
        );
      }

      const promiseResponse = await Promise.all([
        setUserToFirestore(createResponse.user.uid, data.email),
        createResponse.user.sendEmailVerification(),
      ]);
      if (!promiseResponse) {
        throw new Error(
          'Setting user to firestore, or sending email verification failed',
        );
      }
      // await setUserToFirestore(createResponse.user.uid, data.email);
      // await createResponse.user.sendEmailVerification();
      // await sendSignInEmailLink(data.email);
      // setValidationModal(true);
      return await setTimeout(() => {
        // setValidationModal(false);
        navigation.replace('LoginScreen');
        setIsFetching(false);
      }, 5000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailAsyncError('Email is already in use');
        setIsFetching(false);
        return;
      }
      if (error.code === 'auth/user-not-found') {
        setEmailAsyncError('Email is invalid');
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
      console.error('RegisterForm error: ' + error);
      setIsFetching(false);
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
    opacity: isFetching ? 0.5 : 1,
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerForm}>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
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
              maxLength: 100,
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
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name={'conditionsCheck'}
            render={({field}) => (
              <View style={styles.containerTerms}>
                <Text>
                  <BouncyCheckbox
                    size={18}
                    fillColor={colors.red}
                    unfillColor={colors.red}
                    text="J'ai lu et j'accepte les conditions générales d'utilisation"
                    textStyle={styles.textCheckbox}
                    iconStyle={styles.checkbox}
                    onPress={(isChecked: boolean) => field.onChange(isChecked)}
                  />
                </Text>

                {!!errors.conditionsCheck?.message && (
                  <Text style={styles.textConditions}>
                    {errors.conditionsCheck?.message}
                  </Text>
                )}
              </View>
            )}
          />
        </View>

        <TouchableOpacity
          disabled={isFetching ? true : false}
          style={btnSubmitStyle}
          onPress={handleSubmit(onSubmit)}>
          <Text style={styles.btnText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isFetching ? true : false}
          style={[styles.btnLogin]}
          onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.btnText}>Back to login screen</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    alignSelf: 'center',
  },
  containerForm: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },
  containerTerms: {
    marginTop: 20,
    alignSelf: 'center',
  },
  checkbox: {
    color: colors.red,
    backgroundColor: colors.darkgrey,
    borderColor: colors.grey,
    borderRadius: 6,
  },
  textCheckbox: {
    fontSize: 17,
    fontFamily: fonts.source,
    textDecorationLine: 'none',
    color: colors.grey,
  },
  btnText: {
    fontFamily: fonts.source,
    fontSize: 18,
  },
  btnSubmit: {
    backgroundColor: colors.green,
    alignSelf: 'center',
    marginTop: 40,
  },
  btnLogin: {
    backgroundColor: colors.blue,
    alignSelf: 'center',
    marginTop: 30,
  },
  textConditions: {
    color: colors.darkgrey,
    fontSize: 16,
    fontFamily: fonts.source,
    position: 'absolute',
    bottom: -24,
  },
});

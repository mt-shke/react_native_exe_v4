import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {signUpSchema} from '../../schema/yup';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../components/CustomInput';
import {fonts, formWidth} from '../../globals';
import {gStyles} from '../../globals/globalStyles';
import {colors} from '../../globals/colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import ValidationModal from './ValidationModal';
import {TSignUpScreenNavigationProp} from '../../ts/types/navigation';
import {setUserFirestoreCredentials, setUserToFirestore} from '../../firebase';

interface ISignUpForm {
  email: string;
  password: string;
  conditionsCheck: boolean;
}

const SignUpForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<ISignUpForm>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation<TSignUpScreenNavigationProp>();

  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [validationModal, setValidationModal] = useState(false);

  const onSubmit = async (data: ISignUpForm) => {
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
        console.log('no createResponse');
        return;
      }
      await setUserToFirestore(createResponse.user.uid, data.email);
      await setUserFirestoreCredentials(createResponse.user.uid, data.email);
      await createResponse.user.sendEmailVerification();
      // await sendSignInEmailLink(data.email);
      setValidationModal(true);
      return await setTimeout(() => {
        setValidationModal(false);
        setIsFetching(false);
      }, 10000);
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
      console.error(error);
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
    ...gStyles.button,
    opacity: isFetching ? 0.5 : 1,
  };

  return (
    <>
      <View>
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
                    text="I agree to terms and conditions"
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
          style={[styles.btnLogin, gStyles.button]}
          onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.btnText}>Back to login screen</Text>
        </TouchableOpacity>
      </View>
      {Boolean(validationModal) && <ValidationModal />}
    </>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  containerForm: {
    width: formWidth,
    alignSelf: 'center',
  },
  containerTerms: {
    marginTop: 20,
    alignSelf: 'center',
  },
  checkbox: {
    color: colors.red,
    backgroundColor: colors.whiteBlue,
    borderColor: colors.grey,
    borderRadius: 6,
  },
  textCheckbox: {
    fontSize: 17,
    fontFamily: fonts.medium,
    textDecorationLine: 'none',
    color: colors.darkGrey,
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
  textConditions: {
    color: colors.darkBlue,
    fontSize: 16,
    fontFamily: fonts.primary,
    position: 'absolute',
    bottom: -24,
  },
});

// const sendSignInEmailLink = async (email: string) => {
//   try {
//     const BUNDLE_ID = 'com.auth';
//     const actionCodeSettings = {
//       handleCodeInApp: true,
//       url: 'https://authexappshke.page.link/mVFa',
//       iOS: {
//         bundleId: BUNDLE_ID,
//       },
//       android: {
//         packageName: BUNDLE_ID,
//         installApp: true,
//         minimumVersion: '12',
//       },
//     };
//     // Save the email for latter usage
//     // await AsyncStorage.setItem('emailForSignIn', email);
//     console.log(email);

//     await auth().sendSignInLinkToEmail(email, actionCodeSettings);

//     // Alert.alert(`Login link sent to ${email}`);
//     /* You can also show a prompt to open the user's mailbox using 'react-native-email-link'
//      * await openInbox({ title: `Login link sent to ${email}`, message: 'Open my mailbox' }); */

//     // https://authexappshke.page.link/mVFa
//   } catch (error) {
//     console.error('Error while sending email sign in link');
//     return;
//   }
// };

// export type TLoginScreenProps = NativeStackScreenProps<
//   TUnAuthenticatedStackParamsList,
//   'SignUpScreen'
// >;

// type TSignUpData = {
//   email: string;
//   password: string;
//   passwordConfirmation: string;
// };

// const LoginScreen = ({navigation}: TLoginScreenProps) => {
//   const {
//     control,
//     handleSubmit,
//     formState: {errors},
//   } = useForm<TSignUpData>({
//     resolver: yupResolver(signUpSchema),
//   });

//   const [emailError, setEmailError] = useState<null | string>(null);
//   const [passwordError, setPasswordError] = useState<null | string>(null);
//   const [isFetching, setIsFetching] = useState(false);

//   const onSubmit = async (data: TSignUpData) => {
//     if (isFetching) {
//       return;
//     }
//     setIsFetching(true);

//     // Handled by yup
//     // if (errors.email || errors.password || errors.passwordConfirmation) {
//     //   console.log('In SignupScreen', errors);
//     //   setIsFetching(false);
//     //   return;
//     // }

//     // Handled by yup
//     if (data.password !== data.passwordConfirmation) {
//       setPasswordError('Passwords do not match');
//       setIsFetching(false);
//       return;
//     }

//     const newUser = await createNewAuthUser(data, setEmailError);
//     if (!newUser) {
//       setIsFetching(false);
//       return;
//     }
//     const savedUserInFirestore = await setUserToFirestore(newUser.user);
//     if (!savedUserInFirestore) {
//       setIsFetching(false);
//       // need to reDelete user
//       return;
//     }
//     navigation.navigate('LoginScreen');
//   };

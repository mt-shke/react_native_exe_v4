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
import {
  colors,
  fonts,
  gStyle,
  screenHeight,
  screenWidth,
  vStyle,
} from '../../../globals';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TUnauthenticatedStackParamsList} from '../../../navigation/UnauthenticatedStack';
import {BlurView} from '@react-native-community/blur';
import Modal from '../../../components/UI/Modal';

interface IRegisterForm {
  email: string;
  password: string;
  conditionsCheck: boolean;
}

// type TRegisterFormNavigation = NativeStackNavigationProp<TRegisterScreenProps>;

type TRegisterScreenNavigationProp = NativeStackNavigationProp<
  TUnauthenticatedStackParamsList,
  'RegisterScreen'
>;

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IRegisterForm>({
    resolver: yupResolver(signUpSchema),
  });

  const navigation = useNavigation<TRegisterScreenNavigationProp>();

  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [validationModal, setValidationModal] = useState(false);

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

      setValidationModal(true);
      return await setTimeout(() => {
        setValidationModal(false);
        navigation.replace('LoginScreen');
        setIsFetching(false);
      }, 5000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailAsyncError('Email déjà utilisé');
        setIsFetching(false);
        return;
      }
      if (error.code === 'auth/user-not-found') {
        setEmailAsyncError('Email invalide');
        setIsFetching(false);
        return;
      }
      emailAsyncError && setEmailAsyncError(null);
      if (error.code === 'auth/wrong-password') {
        setPasswordAsyncError('Mot de passe invalide');
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
    ...gStyle.btnContainer,
    opacity: isFetching ? 0.5 : 1,
  };

  return (
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
              placeholder="Email"
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
              placeholder="Mot de passe"
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
              <BlurView
                style={styles.blur}
                blurType="light"
                blurAmount={14}
                reducedTransparencyFallbackColor="white"
              />
              <Text>
                <BouncyCheckbox
                  size={18}
                  fillColor={colors.red}
                  unfillColor={colors.red}
                  text="Accepter les CGU/CGV"
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
      {!!validationModal && (
        <Modal text="Compte crée avec succès. Veuillez valider votre compte en cliquant sur lien reçu par email." />
      )}

      <TouchableOpacity
        disabled={isFetching ? true : false}
        style={btnSubmitStyle}
        onPress={handleSubmit(onSubmit)}>
        <Text style={gStyle.btnText}>Créer un compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isFetching ? true : false}
        style={gStyle.btnContainer}
        onPress={() => navigation.replace('LoginScreen')}>
        <Text style={gStyle.btnText}>Retour</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    alignSelf: 'center',
    marginTop: 60,
  },
  containerForm: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    width: '100%',
  },

  // Checkbox
  containerTerms: {
    marginTop: 20,
    position: 'relative',
    alignSelf: 'center',
    padding: 10,
    borderRadius: vStyle.borderRadius,
    // backgroundColor: 'red',
    overflow: 'hidden',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
    color: colors.whitesecondary,
  },
  textConditions: {
    color: colors.whitesecondary,
    fontSize: 16,
    fontFamily: fonts.hindi,
    marginTop: 10,
  },
});

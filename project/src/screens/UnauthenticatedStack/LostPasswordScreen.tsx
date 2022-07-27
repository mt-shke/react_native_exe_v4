import {yupResolver} from '@hookform/resolvers/yup';
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
import CustomInput from '../../components/CustomInput';
import Modal from '../../components/UI/Modal';
import {colors, fonts, gStyle, screenWidth} from '../../globals';
import {emailSchema} from '../../schema/yup';
import auth from '@react-native-firebase/auth';
import {bgs} from '../../data';
import {IEmail} from '../../ts/interfaces';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TUnauthenticatedStackParamsList} from '../../navigation/UnauthenticatedStack';

type TLostPasswordScreenProps = NativeStackScreenProps<
  TUnauthenticatedStackParamsList,
  'LostPasswordScreen'
>;

const LostPasswordScreen = (props: TLostPasswordScreenProps) => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<IEmail>({
    resolver: yupResolver(emailSchema),
  });

  const {navigation} = props;

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
    ...gStyle.btnContainer,
    opacity: isFetching ? 0.5 : 1,
  };

  const imgBg = bgs[0];

  return (
    <ImageBackground source={imgBg} style={styles.bg}>
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
                placeholder="Veuillez entrer votre email"
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
          <Text style={gStyle.btnText}>Valider</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btnLogin, gStyle.btnContainer]}
          onPress={() => navigation.replace('LoginScreen')}>
          <Text style={gStyle.btnText}>Retour</Text>
        </TouchableOpacity>
      </View>
      {Boolean(modal) && (
        <Modal
          text="Nous vous avons envoyé un email pour modifier votre mot de passe"
          style={styles.modal}
        />
      )}
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
    width: screenWidth - 40,
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.courgette,
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
    fontFamily: fonts.courgette,
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

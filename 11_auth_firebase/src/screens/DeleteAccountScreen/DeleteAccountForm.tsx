import {yupResolver} from '@hookform/resolvers/yup';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, Text, TouchableOpacity, Keyboard} from 'react-native';
import {credentialsSchema} from '../../schema/yup';
import {ICredentials} from '../../ts/interfaces';
import auth from '@react-native-firebase/auth';
import CustomInput from '../../components/CustomInput';
import {fonts} from '../../globals';
import {gStyles} from '../../globals/globalStyles';
import {colors} from '../../globals/colors';
import Modal from '../../components/UI/Modal';
import {deleteAccount, deleteUserData} from '../../firebase';
import {UserContext} from '../../state/UserContext';
import TextStylised from '../../components/UI/TextStylised';

const DeleteAccountForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<ICredentials>({
    resolver: yupResolver(credentialsSchema),
  });
  const {state, dispatch} = useContext(UserContext);
  const [emailAsyncError, setEmailAsyncError] = useState<null | string>(null);
  const [passwordAsyncError, setPasswordAsyncError] = useState<null | string>(
    null,
  );
  const [isFetching, setIsFetching] = useState(false);
  const [modal, setModal] = useState(false);

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
      if (!response) {
        setIsFetching(false);
        return;
      }
      await deleteUserData(state.user!.uid);
      setModal(true);
      setTimeout(() => {
        dispatch({type: 'LOGOUT_USER'});
        deleteAccount();
        setIsFetching(false);
      }, 3000);
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
          <View style={styles.containerText}>
            <TextStylised
              align="center"
              content="Enter your credentials to delete your account"
            />
          </View>
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
          <Text style={styles.btnText}>Delete account</Text>
        </TouchableOpacity>
      </View>
      {Boolean(modal) && (
        <Modal
          text="Your account has been successfully deleted. You will be disconnected in a moment."
          style={styles.modal}
        />
      )}
    </>
  );
};

export default DeleteAccountForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  containerForm: {
    alignSelf: 'center',
  },
  containerText: {
    backgroundColor: colors.darkGrey,
    borderRadius: 6,
    marginVertical: 20,
    marginHorizontal: 6,
    alignSelf: 'center',
  },
  btnText: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
  },

  btnSubmit: {
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
});

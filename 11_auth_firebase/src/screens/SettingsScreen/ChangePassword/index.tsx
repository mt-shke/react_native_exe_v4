import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, StyleSheet, Pressable, Text} from 'react-native';
import Input from '../../../components/Input';
import {signIn, updatePassword} from '../../../firebase';
import {screenWidth} from '../../../globals';
import {TAuthenticatedStackParamsList} from '../../../navigation/AuthenticatedStack';
import {changePasswordSchema} from '../../../schema/yup';

interface IChangePasswordData {
  email: string;
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}

type TSettingsScreenNavigationProp = NativeStackNavigationProp<
  TAuthenticatedStackParamsList,
  'SettingsScreen'
>;

const ChangePasswordModal: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
  });

  const navigation = useNavigation<TSettingsScreenNavigationProp>();

  const [emailError, setEmailError] = useState<null | string>(null);
  const [oldPasswordError, setOldPasswordError] = useState<null | string>(null);
  const [isFetching, setIsFetching] = useState(false);
  const onSubmit = async (data: IChangePasswordData) => {
    try {
      if (isFetching) {
        return;
      }
      setIsFetching(true);
      const signedInUser = await signIn(
        {
          email: data.email,
          password: data.oldPassword,
        },
        setEmailError,
        setOldPasswordError,
      );

      const updatedPassword = await updatePassword(
        data.newPasswordConfirmation,
      );

      if (!updatePassword) {
        console.log(
          'in settingsScree, something wrong happened while updating password to firebase:',
          updatedPassword,
        );
        setIsFetching(false);
        navigation.navigate('HomeScreen');
        return;
      }
      console.log('Password updated');
      setIsFetching(false);
      navigation.navigate('HomeScreen');
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Input
          control={control}
          name="email"
          error={errors.email}
          key="email"
          label={'Email'}
          keyboard="email-address"
          errorMessage={emailError}
        />
        <Input
          control={control}
          name="oldPassword"
          error={errors.oldPassword}
          key="oldPassword"
          label={'Old password'}
          type="password"
          errorMessage={oldPasswordError}
        />
        <Input
          control={control}
          name="newPassword"
          error={errors.newPassword}
          key="newPassword"
          label={'New password'}
          type="password"
        />
        <Input
          control={control}
          name="newPasswordConfirmation"
          error={errors.newPasswordConfirmation}
          key="newPasswordConfirmation"
          label={'Confirm new password'}
          type="password"
        />

        <Pressable style={styles.btnSubmit} onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ChangePasswordModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  containerForm: {
    width: screenWidth - 80,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: 'grey',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    marginBottom: 10,
  },
  containerErrorMessage: {
    backgroundColor: 'red',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -40,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  btnSubmit: {
    backgroundColor: 'lightgreen',
    marginTop: 60,
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
});

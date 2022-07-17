import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {credentialsSchema} from '../../../schema/yup';
import Input from '../../../components/Input';
import {screenWidth} from '../../../globals';
import {ICredentials} from '../../../ts/interfaces';
import {deleteAccount, deleteDocument, signIn} from '../../../firebase';

const FormDelete: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(credentialsSchema),
  });

  const [emailError, setEmailError] = useState<null | string>(null);
  const [passwordError, setPasswordError] = useState<null | string>(null);
  const [isFetching, setIsFetching] = useState(false);

  const onSubmit = async (data: ICredentials) => {
    try {
      if (isFetching) {
        return;
      }
      setIsFetching(true);
      const response = await signIn(data, setEmailError, setPasswordError);
      if (!response) {
        setIsFetching(false);
        throw new Error('Error no response, while trying to delete account');
      }
      const firestoreDocDeleted = await deleteDocument('Users');
      const deleteResponse = await deleteAccount();

      console.log(deleteResponse);

      // handle delete
      setIsFetching(false);
    } catch (error) {
      console.error('Error while trying to delete account');
      setIsFetching(false);
      return;
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
          name="password"
          error={errors.password}
          key="password"
          label={'Password'}
          type="password"
          errorMessage={passwordError}
        />
      </View>
      <TouchableOpacity
        style={styles.btnSubmit}
        onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormDelete;

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: 'orange',
    alignSelf: 'center',
    position: 'absolute',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  errorMessage: {
    color: 'red',
    alignSelf: 'center',
  },
  btnSubmit: {
    backgroundColor: 'lightblue',
    marginTop: 60,
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  signBtn: {
    backgroundColor: 'lightgreen',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 200,
  },
});

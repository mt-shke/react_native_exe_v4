import {yupResolver} from '@hookform/resolvers/yup';
import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Input from '../../../components/Input';
import {updateUserFirestore} from '../../../firebase';
import {screenWidth} from '../../../globals';
import {updateProfileSchema} from '../../../schema/yup';
// import {ICurrentUser} from '../../../ts/interfaces';

const UpdateProfileModal: React.FC<{currentUser: any}> = ({currentUser}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(updateProfileSchema),
  });
  const user = currentUser;
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // const user = auth().currentUser;

  const onSubmit = async (data: any) => {
    try {
      if (isFetching) {
        return;
      }
      setIsFetching(true);
      const response = await updateUserFirestore(user.uid, data);
      if (!response.success) {
        throw new Error('Error while updating user');
      }
      setIsFetching(false);
      // navigation.navigate('HomeScreen');
    } catch (error: any) {
      console.log(error);
      setIsFetching(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerForm}>
        <Input
          control={control}
          name="firstname"
          error={errors.firstname}
          key="firstname"
          label={'Firstname'}
          // errorMessage={emailError}
        />

        <Pressable style={styles.btnSubmit} onPress={handleSubmit(onSubmit)}>
          <Text>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UpdateProfileModal;

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

import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import {jobs, jobsImg} from '../../data';
import {updateUserFirestore} from '../../firebase';

import {fonts} from '../../globals';
import {colors} from '../../globals/colors';
import {gStyles} from '../../globals/globalStyles';
import {userProfileSchema} from '../../schema/yup';
import {UserContext} from '../../state/UserContext';
import {TNewUserScreenNavigationProp} from '../../ts/types/navigation';

interface IUserProfile {
  username: string;
  job: string;
}

const NewUserForm = () => {
  const navigation = useNavigation<TNewUserScreenNavigationProp>();
  const {
    control,
    watch,
    clearErrors,
    handleSubmit,
    formState: {errors},
  } = useForm<IUserProfile>({
    resolver: yupResolver(userProfileSchema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {state, dispatch} = useContext(UserContext);

  const submit = async (data: IUserProfile) => {
    try {
      if (isSubmitting) {
        return;
      }
      setIsSubmitting(true);
      clearErrors();
      Keyboard.dismiss();
      const userProfile = {username: data.username, job: data.job};

      const response = await updateUserFirestore(state.user!.uid, {
        newUser: false,
        profile: userProfile,
      });
      if (!response) {
        console.log('No response while updating New user');
        setIsSubmitting(false);
        return;
      }

      dispatch({
        type: 'UPDATE_USER',
        payload: {
          email: state.user!.email,
          uid: state.user!.uid,
          newUser: false,
          profile: userProfile,
        },
      });
      navigation.replace('HomeScreen');
      setIsSubmitting(false);
      return;
    } catch (error) {
      console.error('In NewUserFormSubmit, an error occured:', error);
      setIsSubmitting(false);
      return;
    }
  };

  const usernameError = errors.username?.message;
  const selectedjob = watch('job');

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerText}>
          <Text style={styles.text}>Welcome adventurer</Text>
        </View>

        <View style={styles.formContainer}>
          <Controller
            control={control}
            rules={{maxLength: 40}}
            name={'username'}
            render={({field}) => (
              <CustomInput
                field={field}
                error={usernameError}
                placeholder={'Enter your name'}
              />
            )}
          />
          <Text style={styles.text}>Choose your path</Text>
        </View>

        <ScrollView
          style={styles.sv}
          horizontal
          showsHorizontalScrollIndicator={false}>
          <Controller
            control={control}
            rules={{required: true}}
            name={'job'}
            render={({field}) => (
              <View style={styles.containerjob}>
                {jobsImg.map((jobImg, index) => (
                  <TouchableOpacity
                    onPress={() => field.onChange(jobs[index])}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      ...styles.containerImg,
                      borderColor:
                        selectedjob === jobs[index]
                          ? colors.orange
                          : 'transparent',
                    }}
                    key={index}>
                    <ImageBackground
                      style={styles.img}
                      source={jobImg}
                      resizeMode="cover">
                      <Text style={styles.textjob}>{jobs[index]}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          />
        </ScrollView>

        <TouchableOpacity
          style={[styles.btnStart, gStyles.button]}
          onPress={handleSubmit(submit)}>
          <Text style={styles.btnText}>START</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default NewUserForm;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 80,
  },
  containerText: {
    padding: 20,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 24,
    marginTop: 10,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  sv: {
    marginTop: 40,
  },
  containerjob: {flexDirection: 'row'},
  containerImg: {
    width: 274,
    height: 274,
    borderWidth: 3,
    borderColor: 'transparent',
    marginHorizontal: 50,
    borderRadius: 8,
    overflow: 'hidden',
  },
  img: {
    width: 280,
    height: 280,
    borderRadius: 8,
  },
  textjob: {
    position: 'absolute',
    left: 14,
    bottom: 20,
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: colors.black,
    color: colors.whiteBlue,
    fontSize: 18,
  },
  btnStart: {
    color: colors.darkBlue,
    backgroundColor: colors.lightGreen,
    width: 200,
    alignSelf: 'center',
    marginVertical: 50,
  },
  btnText: {
    alignSelf: 'center',
    fontFamily: fonts.medium,
    fontSize: 20,
  },
});

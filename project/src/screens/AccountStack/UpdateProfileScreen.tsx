import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TAccountStackParamsList} from '../../navigation/AccountStack';

type TUpdateProfileScreen = NativeStackScreenProps<
  TAccountStackParamsList,
  'UpdateProfileScreen'
>;

const UpdateProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text>UpdateProfileScreen</Text>
    </View>
  );
};

export default UpdateProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

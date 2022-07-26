import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TAccountStackParamsList} from '../../navigation/AccountStack';

type TDeleteAccountScreen = NativeStackScreenProps<
  TAccountStackParamsList,
  'DeleteAccountScreen'
>;

const DeleteAccountScreen = () => {
  return (
    <View style={styles.container}>
      <Text>DeleteAccountScreen</Text>
    </View>
  );
};

export default DeleteAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

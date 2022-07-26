import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';

type THomeScreenProps = NativeStackScreenProps<
  TAuthenticatedStackParamsList,
  'HomeScreen'
>;

const HomeScreen = (props: THomeScreenProps) => {
  // All the user content
  // Products viewed
  // Commands

  // if no user discover topics

  const navigation = {props};

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      {/* <TouchableOpacity onPress={() => {}
      }>

      <Text>Go to Market</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

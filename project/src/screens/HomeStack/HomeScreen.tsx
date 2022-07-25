import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {THomeStackParamsList} from '../../navigation/subStack/HomeStack';
import {THomeStackScreenProps} from '../../ts/types';

type THomeScreenProps = NativeStackScreenProps<
  THomeStackParamsList,
  'HomeScreen'
>;

const HomeScreen = () => {
  // All the user content
  // Products viewed
  // Commands

  // if no user discover topics

  // const navigation = {props};

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

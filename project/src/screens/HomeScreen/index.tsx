import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import {UserContext} from '../../state/UserContext';

type THomeScreenProps = MaterialBottomTabScreenProps<
  TAuthenticatedStackParamsList,
  'HomeScreen'
>;

const HomeScreen = (props: THomeScreenProps) => {
  // All the user content
  // Products viewed
  // Commands

  // if no user discover topics
  const {navigation} = props;
  const {state, dispatch} = useContext(UserContext);
  // const navigation = useNavigation<THomeScreenProps>();

  const id = state.user?.firstname || state.user!.email;

  return (
    <View style={styles.container}>
      <Text>Welcome {id}</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

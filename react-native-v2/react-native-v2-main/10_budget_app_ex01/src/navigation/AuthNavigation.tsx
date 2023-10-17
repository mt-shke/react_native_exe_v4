import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useQuery, useRealm} from '../../App';
import RootStack from './RootStack';
import allUsers from '../../tpData.json';
import {setUserJsonToDB} from '../realm';

const AuthNavigation: React.FC = () => {
  const realm = useRealm();
  const users = useQuery('User');

  useEffect(() => {
    // if (!users.length) {
    //   realm.write(() => {
    //     realm.create('Task', Task.generate('A first automated task'));
    //   });
    // }
  }, []);

  const oneUser = allUsers[0];

  if (!users.length) {
    return (
      <View>
        <Text>Loading a random user...</Text>
        <TouchableOpacity
          onPress={() =>
            realm.write(() => realm.create('User', setUserJsonToDB(oneUser)))
          }>
          <View style={styles.button}>
            <Text>Set One user to Database</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return <RootStack />;
};

export default AuthNavigation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    padding: 20,
    backgroundColor: 'green',
  },
});

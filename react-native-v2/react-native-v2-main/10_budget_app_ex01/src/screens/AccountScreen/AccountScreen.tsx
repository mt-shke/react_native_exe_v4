import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useRealm} from '../../../App';
import Gap from '../../components/UI/Gap';
import {getRandomUserData} from '../../utils';
import Header from '../HomeStack/HomeScreen/header/Header';
import BankCard from './cards/BankCard';
import CustomCarousel from './cards/CustomCarousel';
import Settings from './profileSettings/Settings';

const AccountScreen: React.FC = () => {
  // const users = useRealm('User');
  // const user = users[0];

  return (
    <View style={styles.container}>
      {/* <Header user={user} key={user._id} />
      <ScrollView>
        <View style={styles.containerView}>
          <CustomCarousel />
          <Gap height={20} />
          <Settings />
        </View>
      </ScrollView> */}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
  },
  containerView: {
    marginTop: 10,
    marginBottom: 160,
  },
});

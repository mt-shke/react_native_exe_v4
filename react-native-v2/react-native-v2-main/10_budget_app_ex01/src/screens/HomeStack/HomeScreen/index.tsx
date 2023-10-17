import {View, StyleSheet, FlatList} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Header from './header/Header';
import LandingView from './components/LandingView';
import {colors} from '../../../globals';
import Transactions from './components/Transactions';
import ContainerButton from './components/ContainerButton';
import Gap from '../../../components/UI/Gap';
import PaymentItem from './components/payment/PaymentItem';
import {IUser, IUserData} from '../../../ts/interfaces/user';
import {getOrderedPayments} from '../../../utils';
import UsersList from './components/UsersList';
import {useQuery, useRealm} from '../../../../App';

const HomeScreen: React.FC = () => {
  const users = useQuery('User');
  const firstUser = users[0] as unknown;
  const user = firstUser as IUserData;

  return (
    <View style={styles.container}>
      <Header user={user} />
      <FlatList
        style={styles.containerFL}
        initialNumToRender={10}
        numColumns={1}
        // horizontal={true}
        data={getOrderedPayments({user: user})}
        ListHeaderComponent={
          <>
            <View style={styles.containerContent}>
              <LandingView user={user} />
              <UsersList />
              <ContainerButton user={user} />
            </View>
            <Gap height={30} />
            <Transactions />
            <Gap height={10} />
            <View style={styles.itemsTop} />
          </>
        }
        renderItem={({item}) => (
          <View style={styles.containerItem}>
            <PaymentItem payment={item} />
          </View>
        )}
        // ItemSeparatorComponent={({highlighted}) => (
        //   // <Gap height={20} backgroundColor={colors.white} />
        //   <View style={{backgroundColor: 'white', height: 20}} />
        // )}
        ListFooterComponent={<View style={styles.itemsBottom} />}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  containerContent: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
  containerFL: {
    backgroundColor: colors.transparent,
  },
  containerItem: {
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 20,
  },
  itemsTop: {
    height: 20,
    backgroundColor: colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginHorizontal: 20,
  },
  itemsBottom: {
    height: 20,
    backgroundColor: colors.white,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginHorizontal: 20,
    marginBottom: 60,
  },
});

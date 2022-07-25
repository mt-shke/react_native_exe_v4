import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {TMainStackParamsList} from '../../../navigation/MainStack';
import {TMarketStackParamsList} from '../../../navigation/subStack/MarketStack';
import {TMarketStackScreenProps} from '../../../ts/types';

type TMarketScreenProps = NativeStackScreenProps<
  TMarketStackParamsList,
  'MarketScreen'
>;

type TMarketStackProps = NativeStackScreenProps<
  TMainStackParamsList,
  'MarketStack'
>;

const MarketScreen = (props: TMarketStackProps) => {
  // list of local producter/seller
  //   Their Products
  //   list of marketPlaces where producters sell their product

  //   Seller
  // List of remaining goods close to be perished - good price

  // Maybe a custom market for each producter to sells their own product and deliver via transporter

  // Transporter
  // list of gpsPoint where transporter stops and delivers goods

  const {navigation} = props;

  const {navigation: screenNavigation} = useNavigation<TMarketScreenProps>();

  return (
    <View style={styles.container}>
      <Text>MarketScreen</Text>
      <TouchableOpacity onPress={() => navigation.replace('HomeStack')}>
        <Text>To Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => screenNavigation.replace('ProductsScreen')}>
        <Text>To Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

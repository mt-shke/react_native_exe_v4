import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import SearchInput from './SearchInput';
import ProductCard from '../../../components/product/ProductCard';
import {bgs, imgsBg} from '../../../data';
import {CompositeNavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {TMarketStackParamsList} from '../../../navigation/MarketStack';
import {TAuthenticatedStackParamsList} from '../../../navigation/AuthenticatedStack';
import {MaterialBottomTabNavigationProp} from '@react-navigation/material-bottom-tabs';
import {colors} from '../../../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MarketScreen = () => {
  // list of local producter/seller/maker
  //   Their Products
  //   list of goods and services / maps

  // Maybe a custom market for each producter to sells their own product and deliver via transporter

  // Transporter stops and delivers goods
  // const {navigation: screenNavigation} = useNavigation<TMarketScreenProps>();

  const navigation =
    useNavigation<
      CompositeNavigationProp<
        NativeStackNavigationProp<TMarketStackParamsList, 'MarketScreen'>,
        MaterialBottomTabNavigationProp<
          TAuthenticatedStackParamsList,
          'MarketStack'
        >
      >
    >();

  const bgImg = imgsBg[0];

  return (
    <ImageBackground source={bgImg} resizeMode="cover" style={styles.container}>
      <ScrollView>
        <View>
          <SearchInput />
          <ProductCard />
          <ProductCard size="sm" />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.btnAdd}
        onPress={() => navigation.replace('AddProductScreen')}>
        <Ionicons name={'add-circle-sharp'} color={colors.orange} size={40} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  bg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  btnAdd: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

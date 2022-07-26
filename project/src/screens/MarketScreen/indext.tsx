import {MaterialBottomTabScreenProps} from '@react-navigation/material-bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ImageBackground,
} from 'react-native';
import CustomInput from '../../components/CustomInput';
import {TAuthenticatedStackParamsList} from '../../navigation/AuthenticatedStack';
import SearchInput from './SearchInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../globals';
import {addProduct} from '../../firebase/productsCollection';

type TMarketScreenProps = MaterialBottomTabScreenProps<
  TAuthenticatedStackParamsList,
  'MarketScreen'
>;

const MarketScreen = (props: TMarketScreenProps) => {
  // list of local producter/seller
  //   Their Products
  //   list of marketPlaces where producters sell their product

  //   Seller
  // List of remaining goods close to be perished - good price

  // Maybe a custom market for each producter to sells their own product and deliver via transporter

  // Transporter
  // list of gpsPoint where transporter stops and delivers goods
  const {navigation} = props;
  // const {navigation: screenNavigation} = useNavigation<TMarketScreenProps>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/img/bg/black/tomatoblack.jpg')}
        resizeMode="cover"
        style={styles.bg}>
        <ScrollView>
          <View>
            <SearchInput />

            <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
              <Ionicons
                name={'add-circle-sharp'}
                color={colors.orange}
                size={36}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default MarketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
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
});

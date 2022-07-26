import React from 'react';
import {View, Text, StyleSheet, Image, ImageBackground} from 'react-native';

const ProductCard = () => {
  return (
    <View style={styles.container}>
      {/* <ImageBackground source={} /> */}
      <Text>ProductCard</Text>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

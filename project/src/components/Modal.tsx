import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Modal = () => {
  return (
    <View style={styles.container}>
      <Text>Modal</Text>
    </View>
  );
};

export default Modal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

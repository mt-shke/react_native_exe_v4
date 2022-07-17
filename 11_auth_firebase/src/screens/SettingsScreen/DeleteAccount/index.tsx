import React from 'react';
import {View, StyleSheet} from 'react-native';
import FormDelete from './FormDelete';

const DeleteAccountModal: React.FC = () => {
  return (
    <View style={styles.container}>
      <FormDelete />
    </View>
  );
};

export default DeleteAccountModal;

const styles = StyleSheet.create({
  container: {},
});

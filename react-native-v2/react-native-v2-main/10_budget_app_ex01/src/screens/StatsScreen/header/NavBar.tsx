import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomButton from '../../../components/UI/CustomButton';
import SelectMonth from './SelectMonth';
import Gap from '../../../components/UI/Gap';

const NavBar: React.FC = () => {
  return (
    <View style={styles.container}>
      <SelectMonth />
      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <CustomButton color="yellow" textContent="24H" />
        </TouchableOpacity>
        <Gap width={8} />
        <TouchableOpacity onPress={() => {}}>
          <CustomButton color="yellow" textContent="1W" />
        </TouchableOpacity>
        <Gap width={8} />
        <TouchableOpacity onPress={() => {}}>
          <CustomButton color="yellow" textContent="1M" />
        </TouchableOpacity>
        <Gap width={8} />
        <TouchableOpacity onPress={() => {}}>
          <CustomButton color="yellow" textContent="1Y" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
    // backgroundColor: 'red',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'green',
  },
  button: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
  },
});

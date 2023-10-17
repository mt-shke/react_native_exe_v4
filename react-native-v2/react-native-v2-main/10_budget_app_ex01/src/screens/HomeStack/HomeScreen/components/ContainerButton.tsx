import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomButton from '../../../../components/UI/CustomButton';
import {colors} from '../../../../globals';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack/lib/typescript/src/types';
import {THomeStackScreenParamList} from '../../../../navigation/HomeStack';
import {IUser} from '../../../../ts/interfaces/user';

const ContainerButton: React.FC<IUser> = ({user}) => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<THomeStackScreenParamList, 'HomeScreen'>
    >();

  return (
    <View style={styles.containerButton}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('IncomeScreen')}>
        <CustomButton subTextContent="Add income">
          <AntDesign
            // style={styles.arrow}
            name={'plus'}
            color={colors.blue}
            size={20}
          />
        </CustomButton>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ExpenseScreen')}>
        <CustomButton subTextContent="Add expense" color="orange">
          <AntDesign
            // style={styles.arrow}
            name={'plus'}
            color={colors.orange}
            size={20}
          />
        </CustomButton>
      </TouchableOpacity>
    </View>
  );
};

export default ContainerButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {},
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 14,
    overflow: 'hidden',
  },
});

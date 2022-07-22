import React, {useEffect, useState} from 'react';
import {ControllerRenderProps} from 'react-hook-form';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fonts} from '../globals';
import {colors} from '../globals/colors';

interface ICustomInput {
  label?: string;
  keyboard?: 'email-address' | 'numeric';
  type?: 'password';
  placeholder?: string;
  error: string | undefined;
  field: ControllerRenderProps<any, any>;
}

const CustomInput: React.FC<ICustomInput> = ({
  label,
  keyboard,
  type,
  placeholder,
  error,
  field,
}) => {
  const [isValueVisible, setIsValueVisible] = useState<boolean>(true);

  useEffect(() => {
    if (type === 'password') {
      setIsValueVisible(false);
    }
  }, []);

  const {onChange, onBlur, value} = field;

  return (
    <View style={styles.container}>
      <View style={styles.containerLabel}>
        <Text style={styles.label}>{label}</Text>
        {!!error && (
          <View>
            <LinearGradient
              style={styles.overlay}
              start={{x: 0.1, y: 0.1}}
              end={{x: 0.1, y: 1}}
              colors={[
                'transparent',
                colors.darkBlue,
                colors.darkBlue,
                'transparent',
              ]}
              locations={[0, 0.1, 0.5, 1]}
            />
            <Text style={styles.error}>{`${error}`}</Text>
          </View>
        )}
      </View>
      <View style={styles.containerInput}>
        <TextInput
          secureTextEntry={!isValueVisible}
          style={styles.input}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboard ?? 'default'}
          placeholder={placeholder}
        />
        {type === 'password' && (
          <Ionicons
            onPress={() => setIsValueVisible(p => !p)}
            name={isValueVisible ? 'eye-off' : 'eye'}
            color={'black'}
            size={24}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  containerLabel: {
    display: 'flex',
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 22,
  },
  containerInput: {
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 0,
    borderBottomWidth: 0.4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: fonts.medium,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  error: {
    color: colors.whiteBlue,
    fontSize: 16,
    fontFamily: fonts.medium,
    letterSpacing: 0.4,
  },
});

import {BlurView} from '@react-native-community/blur';
import React, {useEffect, useState} from 'react';
import {ControllerRenderProps} from 'react-hook-form';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {vStyle} from '../globals';
import {colors} from '../globals/colors';
import {fonts} from '../globals/fonts';
// import LinearGradient from 'react-native-linear-gradient';

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
          <View style={styles.containerError}>
            <BlurView
              style={styles.blur}
              blurType="light"
              blurAmount={14}
              reducedTransparencyFallbackColor="white"
            />
            <Text style={styles.error}>{`${error}`}</Text>
          </View>
        )}
      </View>
      <View style={styles.containerInput}>
        <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={14}
          reducedTransparencyFallbackColor="white"
        />
        <TextInput
          secureTextEntry={!isValueVisible}
          style={styles.input}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          keyboardType={keyboard ?? 'default'}
          placeholder={placeholder}
          placeholderTextColor={colors.lightgrey}
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
    fontFamily: fonts.source,
    fontSize: 22,
  },
  containerInput: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: vStyle.borderRadius,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  blur: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  input: {
    width: '90%',
    height: '100%',
    paddingHorizontal: 10,
    fontSize: 18,
    fontFamily: fonts.source,
    borderRadius: vStyle.borderRadius,
    color: colors.lightgrey,
  },
  overlay: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    opacity: 0.3,
  },
  containerError: {
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
    paddingHorizontal: 8,
    borderRadius: vStyle.borderRadius,
  },
  error: {
    color: colors.whitesecondary,
    fontSize: 16,
    fontFamily: fonts.source,
    letterSpacing: 0.4,
  },
});

import React, {useEffect, useState} from 'react';
import {
  Control,
  Controller,
  DeepRequired,
  FieldError,
  FieldErrorsImpl,
  Merge,
} from 'react-hook-form';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface IInputProps {
  name: string;
  label?: string;
  error: Merge<FieldError, FieldErrorsImpl<DeepRequired<any>>> | undefined;
  // error:
  //   | {
  //       message: string | undefined;
  //       ref: string | undefined;
  //       type: 'required';
  //     }
  //   | undefined;
  control: Control;
  keyboard?: 'email-address' | 'numeric';
  type?: 'password';
  errorMessage?: string | null;
}

const Input: React.FC<IInputProps> = ({
  name,
  label,
  error,
  control,
  keyboard,
  type,
  errorMessage,
}) => {
  const [isValueVisible, setIsValueVisible] = useState<boolean>(true);
  useEffect(() => {
    if (type === 'password') {
      setIsValueVisible(false);
    }
  }, []);

  return (
    <View>
      <Text>{label}</Text>
      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <TextInput
              secureTextEntry={!isValueVisible}
              style={styles.input}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType={keyboard ?? 'default'}
            />
            {type === 'password' && (
              <Ionicons
                onPress={() => setIsValueVisible(p => !p)}
                name={isValueVisible ? 'eye-off' : 'eye'}
                color={'black'}
                size={24}
                style={styles.eye}
              />
            )}
          </View>
        )}
        name={name}
      />
      {error && <Text style={styles.error}>{`${error.message}`}</Text>}
      {!error && errorMessage && (
        <Text style={styles.error}>{`${errorMessage}`}</Text>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  input: {
    backgroundColor: 'lightgrey',
    borderWidth: 0.4,
    borderColor: 'darkgrey',
    borderRadius: 2,
    marginBottom: 20,
    elevation: 2,
  },
  eye: {
    position: 'absolute',
    right: 0,
    padding: 12,
  },
  error: {
    color: 'red',
    fontSize: 12,
    position: 'absolute',
    right: 0,
    fontStyle: 'italic',
  },
});

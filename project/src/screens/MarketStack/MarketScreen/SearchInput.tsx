import {BlurView} from '@react-native-community/blur';
import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {colors, fonts, screenWidth, vStyle} from '../../../globals';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchInput = () => {
  const [inputField, setInputField] = useState('');

  return (
    <View style={styles.containerInput}>
      <BlurView
        style={styles.blur}
        blurType="light"
        blurAmount={14}
        reducedTransparencyFallbackColor="white"
      />
      <TextInput
        style={styles.input}
        // onBlur={}
        onChangeText={value => setInputField(value)}
        value={inputField}
        keyboardType={'default'}
        placeholder={'Search'}
        placeholderTextColor={colors.lightgrey}
      />
      <Ionicons
        name={'md-search-sharp'}
        color={colors.whitesecondary}
        size={24}
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  containerInput: {
    position: 'relative',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: vStyle.borderRadius,
    borderWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    width: screenWidth - 20,
    alignSelf: 'center',
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
});

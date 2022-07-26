import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fonts} from '../../../globals';

interface ISettingsItemProps {
  icon: React.ReactNode;
  text: string;
  unavailable?: boolean;
}

const SettingsItem = ({icon, text, unavailable}: ISettingsItemProps) => {
  const containerStyle = {...styles.container, opacity: unavailable ? 0.6 : 1};

  return (
    <View style={containerStyle}>
      {icon}
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    opacity: 0.7,
  },
  text: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: fonts.source,
  },
});

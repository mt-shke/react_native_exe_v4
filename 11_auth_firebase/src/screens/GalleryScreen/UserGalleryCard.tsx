import React from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {screenWidth} from '../../globals';
import {IGalleryImg} from '../../ts/interfaces';

interface IProps {
  data: IGalleryImg;
  children: React.ReactNode;
}

const UserGalleryCard: React.FC<IProps> = ({data, children}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: data.imgUrl}}
        resizeMode="cover"
        style={styles.bg}
      />
      <Text style={styles.text}>{data.title}</Text>
      <Text style={styles.text}>{data.description}</Text>
      {children}
    </View>
  );
};

export default UserGalleryCard;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    padding: 10,
    marginBottom: 40,
    position: 'relative',
    display: 'flex',
    backgroundColor: 'red',
  },
  bg: {
    width: screenWidth - 20,
    height: 300,
    paddingHorizontal: 10,
  },
  text: {
    marginTop: 10,
  },
});

import {BlurView} from '@react-native-community/blur';
import React from 'react';
import {Text, StyleSheet, ImageBackground, View} from 'react-native';
import {imgsBg} from '../../data';
import {fonts, screenWidth} from '../../globals';

interface IProductCardProps {
  size?: 'sm';
}

const ProductCard = ({size}: IProductCardProps) => {
  let cardStyle = {...styles.container};
  let textStyle = {...styles.title};

  if (size === 'sm') {
    cardStyle = {...cardStyle, width: screenWidth / 3};
    textStyle = {...textStyle, fontSize: 14};
  }

  const bgImg = imgsBg[2];

  return (
    <ImageBackground style={cardStyle} source={bgImg} resizeMode="cover">
      <View style={styles.containerText}>
        <BlurView
          style={styles.blur}
          blurType="light"
          blurAmount={30}
          reducedTransparencyFallbackColor="white"
        />
        <Text style={textStyle}>Title</Text>
      </View>
    </ImageBackground>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: screenWidth / 1.2,
    aspectRatio: 4 / 3,
    alignSelf: 'center',
    borderRadius: 18,
    overflow: 'hidden',
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  containerText: {position: 'relative', overflow: 'hidden'},
  title: {
    bottom: 0,
    left: 0,
    margin: 10,
    fontFamily: fonts.courgette,
    fontSize: 18,
  },
  blur: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

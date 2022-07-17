import React from 'react';
import {View} from 'react-native';

interface IGapProps {
  height?: number;
  width?: number;
  backgroundColor?: string;
  opacity?: number;
}

const Gap: React.FC<IGapProps> = ({
  height,
  width,
  backgroundColor,
  opacity,
}) => {
  let style = {};
  if (height) {
    style = {height: height};
  }
  if (width) {
    style = {...style, width: width};
  }
  if (backgroundColor) {
    style = {...style, backgroundColor: backgroundColor};
  }
  if (opacity) {
    style = {...style, opacity: opacity};
  }

  return <View style={style} />;
};

export default Gap;

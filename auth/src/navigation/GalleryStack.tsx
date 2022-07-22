import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';

export type TGalleryStackParamsList = {
  GalleryScreen: undefined;
  DetailedGalleryImageScreen: {image: any};
};

const Stack = createNativeStackNavigator<TGalleryStackParamsList>();

const GalleryStack = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="GalleryScreen" />
        <Stack.Screen name="DetailedGalleryImageScreen" /> */}
    </Stack.Navigator>
  );
};

export default GalleryStack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

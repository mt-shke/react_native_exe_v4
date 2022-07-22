import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

const DetailedGalleryImageScreen = () => {
  const array = new Array(20).fill('something');

  //   Testing
  return (
    <FlatList
      style={styles.flatList}
      initialNumToRender={12}
      numColumns={1}
      data={array}
      renderItem={({item, index}) => (
        <View style={styles.item}>
          <Text>{`This is block ${index}`}</Text>
        </View>
      )}
    />
  );
};

export default DetailedGalleryImageScreen;

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  item: {
    backgroundColor: 'red',
    height: 200,
    marginVertical: 20,
  },
});

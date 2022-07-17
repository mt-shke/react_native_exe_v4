import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Gap from '../../components/UI/Gap';
import {
  getSpecificDoc,
  setNewCollection,
  updateFirestoreData,
} from '../../firebase';

const ItemsList: React.FC = () => {
  const [incomes, setIncomes] = useState<number[]>([]);

  useEffect(() => {}, []);

  const getDoc = async () => {
    const fetchedIncomes = await getSpecificDoc('Incomes');
    const newData = fetchedIncomes?.data();
    return newData;
  };

  const refreshList = async () => {
    const data = await getDoc();
    setIncomes(data?.payment);
  };

  const addIncomes = async () => {
    try {
      const response = await setNewCollection('Incomes', {
        payment: [2, 45, 345, 32, 1, 21],
      });
    } catch (error) {
      console.log('No resp');
    }
  };

  const updateIncome = async (num: number) => {
    try {
      const newIncomes = await getDoc();
      console.log('in');
      console.log('newInc', newIncomes);

      const payment = newIncomes?.payment;
      console.log('in2');
      const response = await updateFirestoreData('Incomes', {
        payment: [...payment, num],
      });
      console.log('in3');
      if (!response.success) {
        throw new Error('Cannot update');
      }
      await refreshList();
    } catch (error) {
      console.log('No response');
    }
  };

  const deleteList = async () => {
    try {
      const resp = await updateFirestoreData('Incomes', {
        payment: [],
      });
      if (!resp.success) {
        throw new Error('Cannot update');
      }

      await refreshList();
      //   const response = await updateFirestoreData('Incomes', {
      //     payment: firestore.FieldValue.arrayRemove(num),
      //     // payment: firestore.FieldValue.arrayUnion(num),
      //   });
      //   console.log(response);
    } catch (error) {
      console.log('No resp');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.containerFL}
        initialNumToRender={10}
        numColumns={1}
        // horizontal={true}
        data={incomes}
        // ListHeaderComponent={}
        renderItem={({item, index}) => (
          <View style={styles.containerItem}>
            <Text>
              {item} {index}
            </Text>
          </View>
        )}
        ItemSeparatorComponent={({}) => (
          <Gap height={4} backgroundColor={'transparent'} />
          //   <View style={{backgroundColor: 'white', height: 20}} />
        )}
        ListFooterComponent={
          <View style={styles.itemsBottom}>
            <TouchableOpacity
              style={styles.display}
              onPress={() => {
                addIncomes();
              }}>
              <View>
                <Text>Set payment to fixed amounts</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.display}
              onPress={() => {
                updateIncome(25);
              }}>
              <View>
                <Text>Add another payment of 25</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.display}
              onPress={() => {
                refreshList();
              }}>
              <View>
                <Text>Refresh List</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                deleteList();
              }}>
              <View>
                <Text>Delete list</Text>
              </View>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

export default ItemsList;

const styles = StyleSheet.create({
  container: {},
  containerFL: {
    backgroundColor: 'lightgreen',
  },
  containerItem: {
    // backgroundColor: 'green',
  },
  itemsBottom: {
    // backgroundColor: 'green',
    marginBottom: 200,
  },
  display: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
  delete: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    alignSelf: 'center',
  },
});

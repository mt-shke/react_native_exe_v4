TaskView

```js
// TaskView

// <View style={styles.container}>
// <TouchableOpacity
//   onPress={() => {
//     realm.write(() => {
//       realm.create('Task', Task.generate('Task created by button'));
//     });
//   }}>
//   <View style={styles.button}>
//     <Text>Add new task ➕</Text>
//   </View>
// </TouchableOpacity>
// {/* {ids.map((id, index) => {
//   <View key={index}>
//     <Text>{id}</Text>
//   </View>;
// })} */}
// <FlatList
//   data={tasks.sorted('createdAt')}
//   // keyExtractor={item => (item._id.)toString()}
//   renderItem={({item}) => {
//     return (
//       <View
//         style={{
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignSelf: 'center',
//           margin: 10,
//         }}>
//         <Text style={{paddingHorizontal: 10}}>{item.description}</Text>
//         <Text style={{paddingHorizontal: 10}}>
//           isComplete ? :{item.isComplete ? 'True' : 'False'}
//         </Text>
//         <TouchableOpacity
//           onPress={() => {
//             realm.write(() => {
//               realm.create(
//                 Task,
//                 {
//                   ...item,
//                   _id: item._id,
//                   isComplete: true,
//                   description: `Task ${item._id} is now complete`,
//                 },
//                 'modified',
//               );
//             });
//           }}>
//           <Text>{'Update status: ➕'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             realm.write(() => {
//               realm.delete(item);
//             });
//           }}>
//           <Text>{'🗑️'}</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }}></FlatList>
// </View>
```

<details>
<summary>Firebase Firestore</summary>

```js
// npm i @react-native-firebase/firestore
```

<details>
<summary>Simple read</summary>

Import

```js
import firestore from '@react-native-firebase/firestore';
const usersCollection = firestore().collection('Users');
```

Get specific doc

```js
import firestore from '@react-native-firebase/firestore';
// Get user document with an ID of ABC
const userDocument = firestore().collection('Users').doc('ABC');
// The doc method returns a DocumentReference.
```

One-time read

```js
import firestore from '@react-native-firebase/firestore';
const users = await firestore().collection('Users').get();
const user = await firestore().collection('Users').doc('ABC').get();
```

<details>
<summary>Realtimes changes</summary>

Realtimes changes - listener

```js
import firestore from '@react-native-firebase/firestore';

function onResult(QuerySnapshot) {
  console.log('Got Users collection result.');
}

function onError(error) {
  console.error(error);
}

firestore().collection('Users').onSnapshot(onResult, onError);
```

unsuscribe listener

```js
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

function User({userId}) {
  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [userId]);
}
```

</details>

</details>

<details>
<summary>QuerySnapshot</summary>

access data with forEach

```js
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });
```

</details>

<details>
<summary>Write - Update</summary>

Write

```js
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .add({
    name: 'Ada Lovelace',
    age: 30,
  })
  .then(() => {
    console.log('User added!');
  });
```

Update

```js
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    age: 31,
  })
  .then(() => {
    console.log('User updated!');
  });
```

Update nested

```js
import firestore from '@react-native-firebase/firestore';

firestore()
  .collection('Users')
  .doc('ABC')
  .update({
    'info.address.zipcode': 94040,
  })
  .then(() => {
    console.log('User updated!');
  });
```

Array push

```js
firestore()
  .doc('users/ABC')
  .update({
    fcmTokens: firestore.FieldValue.arrayUnion('ABCDE123456'),
  });
```

Array remove

```js
firestore()
  .doc('users/ABC')
  .update({
    fcmTokens: firestore.FieldValue.arrayRemove('ABCDE123456'),
  });
```

Delete

```js
firestore()
  .collection('Users')
  .doc('ABC')
  .delete()
  .then(() => {
    console.log('User deleted!');
  });
```

Delete specific prop in a document

```js
firestore().collection('Users').doc('ABC').update({
  fcmTokens: firestore.FieldValue.delete(),
});
```

</details>

<details>
<summary>Transactions</summary>

Run transaction method

```js
import firestore from '@react-native-firebase/firestore';

function onPostLike(postId) {
  // Create a reference to the post
  const postReference = firestore().doc(`posts/${postId}`);

  return firestore().runTransaction(async transaction => {
    // Get post data first
    const postSnapshot = await transaction.get(postReference);

    if (!postSnapshot.exists) {
      throw 'Post does not exist!';
    }

    transaction.update(postReference, {
      likes: postSnapshot.data().likes + 1,
    });
  });
}

onPostLike('ABC')
  .then(() => console.log('Post likes incremented via a transaction'))
  .catch(error => console.error(error));
```

</details>

<details>
<summary>Batch</summary>

```js
import firestore from '@react-native-firebase/firestore';

async function massDeleteUsers() {
  // Get all users
  const usersQuerySnapshot = await firestore().collection('Users').get();

  // Create a new batch instance
  const batch = firestore().batch();

  usersQuerySnapshot.forEach(documentSnapshot => {
    batch.delete(documentSnapshot.ref);
  });

  return batch.commit();
}

massDeleteUsers().then(() =>
  console.log('All users deleted in a single batch operation.'),
);
```

</details>

  </details>

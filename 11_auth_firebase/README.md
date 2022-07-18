```js
// Le but de ces exercices est de créer une application de gestion de mot de passe.

// Exercice 1 :
// Créer un nouveau projet react native

// Exercice 2 :
// S’inscrire sur https://firebase.google.com/ , puis créer un projet. Activer l’authentification par mail et mot de passe.

// Exercice 3 :
// Dans l’application mobile, faire deux formulaires dans deux écrans séparés : • La page d’inscription. Elle permet de s’inscrire sur l’application. Les données devront être stockées dans la partie Authentification de Firebase. • La page connexion. Elle permet de se connecter à l’application. La vérification devra se faire via Firebase. Si la connexion réussi rediriger vers une troisième pas qui affichera « Bonjour adresseMail ».
// Pour utiliser firebase dans une application Reactnative utiliser https://rnfirebase.io/

// Exercice 4 :
// Avec Firestore Database, enregistrer un premier mot de passe avec les informations suivantes :
// • Login : string (identifiant)
// • Password : string (mot de passe)
// • Name : string (nom du site ou de l’application)
// • Type : String (Appli mobile ou site web) Ceci est la structure minimale. Elle peut être améliorer si besoin.

// Exercice 5 :
// Faire les différents écrans permettant d’afficher, de créer, de modifier et de supprimer les mots de passe enregistrés.
// Pour l’affichage, les mots de passes devront être caché par défaut.

// Exercice 6 :
// En utilisant https://rnmmkv.vercel.app/#/ , Faire en sorte que quand un utilisateur se connecte, cela enregistre ses identifiants de connexion pour qu’il puisse se loguer automatiquement les prochaines fois.
// A la déconnexion, supprimer ses identifiants de connexion.

// Exercice 7:
// Permettre à l'utilisateur d'utiliser la biométrie pour pouvoir s'authentifier.
// Exercice 8 :
// Permettre à l'utilisateur de pouvoir enregistrer des photos dans l'application via Firebase Storage.
```

<h2>Firebase</h2>

<details>
<summary>Firebase Config</summary>

```js
// https://rnfirebase.io/
// npm install --save @react-native-firebase/app

// - On the firebase console: set android package name to the same as applicationId found in: android/app/build.gradle

//   defaultConfig {
//         applicationId "com.auth"

// - Download google-services.json and add it to android/app/google-services.json

// - Setup SDK Dependencies and plugin
```

<details>
<summary>Firebase Firestore</summary>

```js
// npm i @react-native-firebase/firestore
```

<details>
<summary>Rules</summary>

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
   // Allow only authenticated content owners access
    match /Users/{userId}/{documents=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId
    }
  }
}
```

</details>

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
<summary>Transactions </summary>

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

</details>

<h2>Eslint</h2>

<details>
<summary>Eslint fix</summary>

single/double quote

```js
// in Eslint
  'prettier/prettier': ['error', {singleQuote: true}],

// in Prettier
  singleQuote: true,
```

useEffect missing dependencies

```js
// npm install eslint-plugin-react-hooks@next

 "react-hooks/rules-of-hooks": 'error',
    "react-hooks/exhaustive-deps": 'warn' // <--- THIS IS THE NEW RULE
```

</details>

<details>
<summary>Fonts</summary>

```js
   assets:['./assets/fonts/'],
```

</details>

<details>
<summary>Linear gradient</summary>

```js
// npm install react-native-linear-gradient --save
```

</details>

<details>
<summary>signInWithEmailLink</summary>

```js
// npm i @react-native-firebase/dynamic-links

// https://stackoverflow.com/questions/61564203/how-to-setup-sendsigninlinktoemail-from-firebase-in-react-native
```

```js
// Firebase > Dynamic Links
```

iOs Config

```js
// <key>FirebaseDynamicLinksCustomDomains</key>
// <array>
//   <string>https://example.com/link</string>
//   <string>https://example.com/promos</string>
// </array>
```

</details>

<details>
<summary>React hook form</summary>

Methods

```js
const {
  control,
  watch,
  getValues,
  handleSubmit,
  formState: {errors},
} = useForm <
IUserProfile >
{
  resolver: yupResolver(userProfileSchema),
};

// Get actual value
const watchClass = watch('class');

// Get value without trigger re-renders, do not listen input changes
const getValuesClass = getValues('class');
```

</details>

<details>
<summary>Drawer</summary>

```js
// npm install @react-navigation/drawer
// npm i install react-native-gesture-handler react-native-reanimated
// https://reactnavigation.org/docs/drawer-navigator/
```

babel.config.js

```js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: ['react-native-reanimated/plugin'],
};
```

App.tsx

```js
import 'react-native-gesture-handler';
```

</details>

```js
// npm start -- --reset-cache
```

export * from './auth';
export * from './collections';
export * from './usersCollection';

// AUTH - Props

// app
// currentUser
// languageCode
// settings
// tenantId

// AUTH - Methods

// applyActionCode
// checkActionCode
// confirmPasswordReset
// createUserWithEmailAndPassword
// fetchSignInMethodsForEmail
// isSignInWithEmailLink
// onAuthStateChanged
// onIdTokenChanged
// onUserChanged
// sendPasswordResetEmail
// sendSignInLinkToEmail
// setLanguageCode
// setTenantId
// signInAnonymously
// signInWithCredential
// signInWithCustomToken
// signInWithEmailAndPassword
// signInWithEmailLink
// signInWithPhoneNumber
// signOut
// useEmulator
// useUserAccessGroup
// verifyPasswordResetCode
// verifyPhoneNumber

// USER - Props

// displayName
// email
// emailVerified
// isAnonymous
// metadata
// phoneNumber
// photoURL
// providerData
// providerId
// uid

// USER Method

// delete
// getIdToken
// getIdTokenResult
// linkWithCredential
// reauthenticateWithCredential
// reload
// sendEmailVerification
// toJSON
// unlink
// updateEmail
// updatePassword
// updatePhoneNumber
// updateProfile
// verifyBeforeUpdateEmail

// new password

// import { getAuth, updatePassword } from "firebase/auth";

// const auth = getAuth();

// const user = auth.currentUser;
// const newPassword = getASecureRandomPassword();

// updatePassword(user, newPassword).then(() => {
//   // Update successful.
// }).catch((error) => {
//   // An error ocurred
//   // ...
// });

// Add method - user in db
// const createUserInDb = async () => {
//   if (user) {
//     firestore()
//       .collection('Users')
//       .add({
//         email: user.email,
//         password: '',
//         name: '',
//         type: 'app',
//       })
//       .then(() => {
//         console.log('User added!');
//       });
//   }
// };

//  AUTH - VERIFY PHONE NUMBER

// Handle the verify phone button press
//   async function verifyPhoneNumber(phoneNumber) {
//     const confirmation = await auth().verifyPhoneNumber(phoneNumber);
//     setConfirm(confirmation);
//   }

//   // Handle confirm code button press
//   async function confirmCode() {
//     try {
//       const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, code);
//       let userData = await auth().currentUser.linkWithCredential(credential);
//       setUser(userData.user);
//     } catch (error) {
//       if (error.code == 'auth/invalid-verification-code') {
//         console.log('Invalid code.');
//       } else {
//         console.log('Account linking error');
//       }
//     }
//   }

//   if (initializing) return null;

//   if (!user) {
//     return <Button title="Login" onPress={() => createAccount()} />;
//   } else if (!user.phoneNumber) {
//     if (!confirm) {
//       return (
//         <Button
//           title="Verify Phone Number"
//           onPress={() => verifyPhoneNumber('ENTER A VALID TESTING OR REAL PHONE NUMBER HERE')}
//         />
//       );
//     }
//     return (
//       <>
//         <TextInput value={code} onChangeText={text => setCode(text)} />
//         <Button title="Confirm Code" onPress={() => confirmCode()} />
//       </>
//     );
//   } else {
//     return (
//       <Text>
//         Welcome! {user.phoneNumber} linked with {user.email}
//       </Text>
//     );
//   }
// }

<details>
<summary>Todo</summary>

```js
// FieldValues in Form.tsx
```

</details>

<details>
<summary>Install chocolatey jdk11 - Run android</summary>

```js
// -https://chocolatey.org/install

// In powershell:
// Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

// choco install -y nodejs-lts openjdk11

// -Configure the ANDROID_HOME environment variable
// -Test in powershell:
// Get-ChildItem -Path Env:\

// -Connect usb
// adb devices

// npx react-native init budgetApp --template react-native-template-typescript
// npx react-native run-android
```

</details>

<details>
<summary>Setup</summary>

yupResolver

```js
// npm i @hookform/resolvers
```

React native chart kit

```js
// npm i react-native-chart-kit
// npm install --save react-native-svg
```

reanimated carousel

```js
// npm i react-native-reanimated-carousel
// npm i react-native-reanimated
// npx react-native start --reset-cache
// npx react-native run-android
```

</details>

<details>
<summary>Prettier Fix</summary>

```js
//   endOfLine: 'auto',
```

</details>

<details>
<summary>Vector Icons</summary>

android/app/build.gradle

```js
project.ext.vectoricons = [
    iconFontNames: [ 'Ionicons.ttf', 'AntDesign.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

```js
// import Ionicons from 'react-native-vector-icons/Ionicons';

<Ionicons name={'home'} color={'black'} size={18} style={styles.icon} />
```

</details>

<details>
<summary>Realm</summary>

```js
// npm install realm
// npm i @realm/react

// Create MongoDB account and new cluster
//  npm i -g mongodb-realm-cli

// Cluster config
// https://www.youtube.com/watch?v=lqo0Yf7lnyg&t=130s
```

</details>

<details>
<summary>Improve</summary>

```js
// Yup.Schema
// Refac
// https://www.npmjs.com/package/react-native-get-random-values.
// BSON: For React Native please polyfill crypto.getRandomValues, e.g. using: https://www.npmjs.com/package/react-native-get-random-values.
```

</details>

<details>
<summary>uuid</summary>

```js
// npm install react-native-get-random-values
// import 'react-native-get-random-values'
// npm i --save-dev @types/uuid
```

</details>

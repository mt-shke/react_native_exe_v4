<h1>React Native: Main packages, Installation, Pattern</h1>

<details>
<summary style='font-size: 20px'>Chocolatey jdk11</summary>

Setup

```js
// -https://chocolatey.org/install

// In powershell:
// Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

// choco install -y nodejs-lts openjdk11

// -Install Android SDK
// -Configure the ANDROID_HOME environment variable
// https://reactnative.dev/docs/environment-setup
// -Test in powershell:
// Get-ChildItem -Path Env:\

// npx react-native

// -Connect usb
// -Give developpers options and set Files share mode
// adb devices

// npx react-native init budgetApp --template react-native-template-typescript
// npx react-native run-android
```

</details>

<details>
<summary style='font-size: 20px'>Main packages - setup</summary>

<div style='margin-left: 2rem'>

```js
// npx react-native init MyApp --template react-native-template-typescript
// npx --ignore-existing react-native init MyApp --template react-native-template-typescript
```

<details>
<summary>Vector Icons</summary>

```js
// import Ionicons from 'react-native-vector-icons/Ionicons';
<Ionicons name={"home-sharp"} color={"black"} size={18} style={styles.icon} />
```

android/app/build.gradle

```js
project.ext.vectoricons = [
    iconFontNames: [ 'Ionicons.ttf', 'AntDesign.ttf' ] // Name of the font files you want to copy
]

apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
```

</details>

<details>
<summary>React Native Chart Kit</summary>

```js
// npm i react-native-chart-kit
// npm install --save react-native-svg
```

</details>

<details>
<summary>Reanimated carousel</summary>

```js
// npm i react-native-reanimated-carousel
// npm i react-native-reanimated
// npx react-native start --reset-cache
// npx react-native run-android
```

</details>

<details>
<summary>Linear Gradient</summary>

```js
// expo install expo-linear-gradient

<LinearGradient
    style={styles.overlay}
    // where the gradient starts and ends
    start={{ x: 0.05, y: 0 }}
    end={{ x: 0.7, y: 0 }}
    //    set the array of colors of the gradient
    colors={[colors.black, "transparent"]}
    // where each colors start
    locations={[0, 1]}
/>
```

</details>

</div>

</details>

<details>
<summary style='font-size: 20px'>React Navigation</summary>
<div style='margin-left: 2rem'>

React navigation - Setup

```js
// npm install @react-navigation/native
// expo install react-native-screens react-native-safe-area-context

// Optionnal but required for tabs
// npm install --save react-native-vector-icons
```

Native stack

```js
// npm i @react-navigation/native-stack
```

<details>
<summary>Tabs</summary>
Bottom-tabs

```js
// npm install @react-navigation/bottom-tabs
// npm install --save react-native-vector-icons
```

Material Bottom-tabs

```js
// npm install @react-navigation/material-bottom-tabs
```

Material Top-tabs

```js
// npm install @react-navigation/material-top-tabs react-native-tab-view
// npm install react-native-pager-view ??
```

</details>

<details>
<summary>Drawer</summary>

```js
// npm install @react-navigation/native @react-navigation/native-stack react-native-screens react-native-safe-area-context
// npm install @react-navigation/drawer
// expo install react-native-gesture-handler react-native-reanimated

//  - At the top of the app: App.js =>
// import "react-native-gesture-handler";

// expo start --clear
```

babel.config.js

```js
// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ['react-native-reanimated/plugin'],
//   };
// };
```

</details>

</details>

</div>

</details>

<details>
<summary style='font-size: 20px'>Realm</summary>

<div style='margin-left: 2rem'>

Setup

```js
// npm install realm
// npm i @realm/react

// Create MongoDB account and new cluster

//  npm i -g mongodb-realm-cli // Optionnal?
// Cluster config
// https://www.youtube.com/watch?v=lqo0Yf7lnyg&t=130s
```

</div>

</details>

<details>
<summary style='font-size: 20px'>React Hook Form - Yup</summary>
<div style='margin-left: 2rem'>

```js
// npm install react-hook-form
```

```js
// npm i yup
// npm i @hookform/resolvers
```

</div>

</details>

<details>
<summary style='font-size: 20px'>Fixes & tips</summary>
<div style='margin-left: 2rem'>

<details>
<summary>Android keyboard fix</summary>

app.json

```json
{
    "expo": {
        "android": {
            "softwareKeyboardLayoutMode": "pan"
        }
    }
}
```

</details>

<details>
<summary>Input keyboard type</summary>

```js
//   <TextInput
//   keyboardType={type === "email" ? "email-address" : "default"}
```

```js
// default
// number-pad
// decimal-pad
// numeric
// email-address
// phone-pad
// url
```

iOs only

```js
// ascii-capable
// numbers-and-punctuation
// name-phone-pad
// twitter
// web-search
```

</details>

</div>

</details>

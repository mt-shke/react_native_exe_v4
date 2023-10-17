<details>
<summary>setup</summary>

```js
// expo init "projet"
// npm install react-native-safe-area-context
// npm install @rneui/themed @rneui/base
// npm install --save react-native-vector-icons
```

App.js

```js
export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider style={styles.container}>
                <CustomHeader />
                <CustomSearchBar />
                <CustomListItem />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}
```

</details>

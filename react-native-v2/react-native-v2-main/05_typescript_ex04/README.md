<details>
<summary>Text ellipsis in react native</summary>

```js
// <Text numberOfLines={1} style={styles.text}>
//     Mail: {elem.mail}
// </Text>

// <Text numberOfLines={1}  ellipsizeMode='head' style={styles.text}>
```

</details>

<details>
<summary>Horizontal Scrollview</summary>

```js
<ScrollView horizontal={true} style={styles.sv}>
    <Text numberOfLines={1} style={styles.text}>
        Mail: {elem.mail}
    </Text>
</ScrollView>

// Style
//  sv: {
//         flex: 1,
//     },
//     text: {
//         flex: 1,
```

</details>

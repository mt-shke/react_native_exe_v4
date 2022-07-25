stack nav

```js
<Stack.Navigator
  initialRouteName={'HomeScreen'}
  defaultScreenOptions={screenOptions}>
  <Stack.Screen
    name="HomeScreen"
    component={HomeScreen}
    options={screenOptions}
  />
  <Stack.Screen
    name="SettingsScreen"
    options={screenOptions}
    component={SettingsScreen}
  />
</Stack.Navigator>
```

screen with props

```js
<Stack.Screen
  name="HomeScreen"
  // component={HomeScreen}
  options={screenOptions}>
  {props => <HomeScreen {...props} />}
</Stack.Screen>
```

```js
<Stack.Screen
  name="SettingsDrawer"
  component={SettingsDrawer}
  options={({navigation}) => ({
    headerRight: () => (
      <TouchableOpacity
        style={styles.btnSettings}
        onPress={() => {
          navigation.dispatch(DrawerActions.toggleDrawer());
        }}>
        <Ionicons name="book" size={20} />
        {/* <Ionicons name="settings-sharp" size={20} /> */}
      </TouchableOpacity>
    ),
    headerTransparent: true,
    headerTitle: '',
  })}
/>
```

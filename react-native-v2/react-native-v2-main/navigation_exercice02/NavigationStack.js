import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdaLovelaceScreen from "./screens/AdaLovelaceScreen";
import HomeScreen from "./screens/HomeScreen";
import BiographieScreen from "./screens/BiographieScreen";
import PersonnageScreen from "./screens/PersonnageScreen";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Ada Lovelace"
            screenOptions={drawerScreenOptions}
        >
            <Drawer.Screen name="Ada Lovelace" component={AdaLovelaceScreen} />
            <Drawer.Screen name="Personnage" component={PersonnageScreen} />
            <Drawer.Screen name="Biographie" component={BiographieScreen} />
        </Drawer.Navigator>
    );
};

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Drawer"
                screenOptions={screenOptions}
            >
                <Stack.Screen name="Accueil" component={HomeScreen} />
                <Stack.Screen name="Drawer" component={DrawerStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;

const screenOptions = {
    headerShown: false,
};

const drawerScreenOptions = {
    // Header
    // headerShown: false,
    headerStyle: {
        backgroundColor: "lightgrey",
        height: 70,
    },
    // headerTitleAlign: "center",
    headerTitleStyle: {
        fontWeight: "bold",
    },
    headerTintColor: "black",

    // drawer
    drawerStyle: {
        backgroundColor: "white",
        width: 240,
    },
    drawerActiveTintColor: "black",
    drawerInactiveTintColor: "grey",
    // overlayColor: "#4444",
};

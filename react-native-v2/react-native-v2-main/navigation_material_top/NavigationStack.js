import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ArticleScreen from "./screens/ArticleScreen";
import ContactScreen from "./screens/ContactScreen";
import HomeScreen from "./screens/HomeScreen";
import ImageScreen from "./screens/ImageScreen";
import ShopScreen from "./screens/ShopScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const TabStack = () => {
    return (
        <Tab.Navigator initialRouteName="Article" screenOptions={screenOptions}>
            <Tab.Screen name="Article" component={ArticleScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
            <Tab.Screen name="Shop" component={ShopScreen} />
        </Tab.Navigator>
    );
};

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={screenOptions}
                />
                <Stack.Screen name="Tab" component={TabStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;

const screenOptions = {
    headerShow: false,
};

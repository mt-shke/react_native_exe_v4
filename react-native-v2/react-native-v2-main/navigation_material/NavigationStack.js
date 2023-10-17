import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import GalleryScreen from "./screens/GalleryScreen";
import BasketScreen from "./screens/BasketScreen";
import ContactScreen from "./screens/ContactScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createMaterialBottomTabNavigator();

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="HomeScreen"
                activeColor="#f0edf6"
                inactiveColor="#3e2465"
                barStyle={{ backgroundColor: "#0091ea" }}
            >
                <Tab.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="home"
                                color={"white"}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="GalleryScreen"
                    component={GalleryScreen}
                    options={{
                        tabBarLabel: "Gallery",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="image-outline"
                                color={"white"}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="BasketScreen"
                    component={BasketScreen}
                    options={{
                        tabBarLabel: "Basket",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="basket-outline"
                                color={"white"}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="ContactScreen"
                    component={ContactScreen}
                    options={{
                        tabBarLabel: "Contact",
                        tabBarIcon: ({ color }) => (
                            <MaterialCommunityIcons
                                name="account-box-outline"
                                color={"white"}
                                size={24}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;

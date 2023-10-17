import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ImgScreen from "./screens/ImgScreen";
import TextScreen from "./screens/TextScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Platform } from "react-native";

const screenOptions = {
    headerShown: false,
};

const Tab = createBottomTabNavigator();

const NavigationStack = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="ImgScreen"
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        Platform.OS === "ios"
                            ? (iconName = "ios-")
                            : (iconName = "");

                        if (route.name === "ImgScreen") {
                            // iconName = focused
                            //     ? iconName + "image"
                            //     : iconName + "image";
                            iconName += "image";
                        } else if (route.name === "TextScreen") {
                            iconName += "list";
                        }

                        return (
                            <Ionicons name={iconName} size={24} color={color} />
                        );
                    },
                    tabBarActiveTintColor: "darkgreen",
                    tabBarInactiveTintColor: "lightgray",
                })}
            >
                <Tab.Screen
                    name="ImgScreen"
                    component={ImgScreen}
                    options={screenOptions}
                />
                <Tab.Screen
                    name="TextScreen"
                    component={TextScreen}
                    options={screenOptions}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default NavigationStack;

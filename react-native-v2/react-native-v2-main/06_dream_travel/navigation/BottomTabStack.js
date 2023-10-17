import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Platform } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../global/colors";
import ContactScreen from "../screens/ContactScreen";
import ServicesScreen from "../screens/ServicesScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Tab = createMaterialBottomTabNavigator();

const BottomTabStack = (props) => {
    const osIcon = Platform.OS === "ios" ? "ios-" : "";

    return (
        <SafeAreaProvider style={styles.container}>
            <Tab.Navigator
                initialRouteName="CircuitScreenStack"
                activeColor={colors.blue}
                inactiveColor={colors.bgGrey}
                barStyle={{ backgroundColor: colors.black }}
                screenOptions={{ headerShow: false }}
            >
                <Tab.Screen
                    name="ServicesScreen"
                    component={ServicesScreen}
                    options={{
                        tabBarLabel: "Services",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={osIcon + "apps"}
                                color={focused ? colors.blue : colors.bgGrey}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="CircuitScreenStack"
                    component={CircuitsScreenStack}
                    options={{
                        tabBarLabel: "Circuits",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name={osIcon + "airplane"}
                                color={focused ? colors.blue : colors.bgGrey}
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
                        tabBarIcon: ({ focused }) => (
                            <AntDesign
                                name={osIcon + "customerservice"}
                                color={focused ? colors.blue : colors.bgGrey}
                                size={24}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </SafeAreaProvider>
    );
};

export default BottomTabStack;

import { StyleSheet } from "react-native";
import CircuitsScreenStack from "../screens/CircuitsScreen";

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        paddingTop: 30,
    },
});

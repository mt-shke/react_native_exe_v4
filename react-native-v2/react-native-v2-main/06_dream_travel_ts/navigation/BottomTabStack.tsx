import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Platform, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../global/colors";
import ContactScreen from "../screens/ContactScreen";
import ServicesScreen from "../screens/ServicesScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CircuitStack from "./CircuitStack";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { BottomTabStackParamList } from "../types";

const Tab = createMaterialBottomTabNavigator<BottomTabStackParamList>();

const BottomTabStack: React.FC<BottomTabStackParamList> = () => {
    // const osIcon = Platform.OS === "ios" ? "ios-" : "";

    return (
        <SafeAreaProvider style={styles.container}>
            <Tab.Navigator
                initialRouteName="CircuitsStack"
                activeColor={colors.blue}
                inactiveColor={colors.bgGrey}
                barStyle={{ backgroundColor: colors.black }}
                screenOptions={screenOptions}
            >
                <Tab.Screen
                    name="ServicesScreen"
                    component={ServicesScreen}
                    options={{
                        tabBarLabel: "Services",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                // name={osIcon + "apps"}
                                name={"apps"}
                                color={focused ? colors.blue : colors.bgGrey}
                                size={24}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="CircuitsStack"
                    component={CircuitStack}
                    options={{
                        tabBarLabel: "Circuits",
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                // name={osIcon + "airplane"}
                                name={"airplane"}
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
                                // name={osIcon + "customerservice"}
                                name={"customerservice"}
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

const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        paddingTop: 50,
    },
});

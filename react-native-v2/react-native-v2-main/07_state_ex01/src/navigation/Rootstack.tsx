import {
    createMaterialBottomTabNavigator,
    MaterialBottomTabNavigationOptions,
} from "@react-navigation/material-bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClockScreen from "../screens/ClockScreen";
import HomeScreen from "../screens/HomeScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

export type RoostackParamList = {
    HomeScreen: undefined;
    ClockScreen: { pressTime: number };
};

const Stack = createNativeStackNavigator<RoostackParamList>();
const Tab = createMaterialBottomTabNavigator<RoostackParamList>();

const IoniconsIcon: any = Ionicons as any;

const Rootstack: React.FC = () => {
    // Using Native stack
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ClockScreen">
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen name="ClockScreen" component={ClockScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

    // Using Material bottom tabs
    // return (
    //     <NavigationContainer>
    //         <Tab.Navigator>
    //             <Tab.Screen
    //                 name="HomeScreen"
    //                 component={HomeScreen}
    //                 options={{
    //                     tabBarLabel: "Circuits",
    //                     tabBarIcon: ({ focused }) => (
    //                         <Ionicons
    //                             // name={osIcon + "airplane"}
    //                             name={"home"}
    //                             color={focused ? "black" : "grey"}
    //                             size={24}
    //                         />
    //                     ),
    //                 }}
    //             />
    //             <Tab.Screen
    //                 name="ClockScreen"
    //                 component={ClockScreen}
    //                 options={{
    //                     tabBarLabel: "Circuits",
    //                     tabBarIcon: ({ focused }) => (
    //                         <Ionicons
    //                             // name={osIcon + "airplane"}
    //                             name={"watch"}
    //                             color={focused ? "black" : "lightgrey"}
    //                             size={24}
    //                         />
    //                     ),
    //                 }}
    //             />
    //         </Tab.Navigator>
    //     </NavigationContainer>
    // );
};

export default Rootstack;

// const screenOptions: MaterialBottomTabNavigationOptions = {
//     headerShow: `false`,
// };

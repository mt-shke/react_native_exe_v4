import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { MainStackParamList } from "../types";
import BottomTabStack from "./BottomTabStack";

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="HomeScreen" component={HomeScreen} />
                <Stack.Screen
                    name="BottomTabStack"
                    component={BottomTabStack}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainStack;

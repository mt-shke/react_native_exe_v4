import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../globals";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SuccessScreen from "../screens/SuccessScreen/SuccessScreen";
import { RootstackParamList } from "../ts/types";
import SignUpStack from "./SignUpStack";

const Stack = createNativeStackNavigator<RootstackParamList>();

const Rootstack: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomeScreen"
                screenOptions={screenOptions}
            >
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="SignUpStack"
                    component={SignUpStack}
                    options={screenOptions}
                />
                <Stack.Screen
                    name="SuccessScreen"
                    component={SuccessScreen}
                    options={screenOptions}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Rootstack;

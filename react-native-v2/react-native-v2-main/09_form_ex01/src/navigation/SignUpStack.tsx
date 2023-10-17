import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { screenOptions } from "../globals";
import SignUpEndScreen from "../screens/SignUpEndScreen/SignUpEndScreen";
import SignUpScreen from "../screens/SignUpScreen/SignUpScreen";
import { SignUpStackParamList } from "../ts/types";

const Stack = createNativeStackNavigator<SignUpStackParamList>();

const SignUpStack: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="SignUpScreen"
            screenOptions={screenOptions}
        >
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="SignUpEndScreen" component={SignUpEndScreen} />
        </Stack.Navigator>
    );
};

export default SignUpStack;

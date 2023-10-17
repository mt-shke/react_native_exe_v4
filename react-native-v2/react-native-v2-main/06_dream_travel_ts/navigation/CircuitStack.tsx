import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CircuitsScreen from "../screens/CircuitsScreen";
import DetailedCircuitScreen from "../screens/DetailedCircuitScreen";
import { CircuitsStackParamList } from "../types";

const Stack = createNativeStackNavigator<CircuitsStackParamList>();

const CircuitStack: React.FC<CircuitsStackParamList> = () => {
    return (
        <Stack.Navigator
            initialRouteName="CircuitsScreen"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="CircuitsScreen" component={CircuitsScreen} />
            <Stack.Screen
                name="DetailedCircuitScreen"
                component={DetailedCircuitScreen}
            />
        </Stack.Navigator>
    );
};

export default CircuitStack;

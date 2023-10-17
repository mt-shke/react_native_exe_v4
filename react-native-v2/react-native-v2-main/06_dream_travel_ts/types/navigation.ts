import { RouteProp } from "@react-navigation/native";
import {
    NativeStackNavigationProp,
    NativeStackScreenProps,
} from "@react-navigation/native-stack";

// STACKS

export type MainStackParamList = {
    HomeScreen: undefined;
    BottomTabStack: undefined;
};

export type BottomTabStackParamList = {
    ServicesScreen: undefined;
    CircuitsStack: undefined;
    ContactScreen: undefined;
};

export type CircuitsStackParamList = {
    CircuitsScreen: undefined;
    DetailedCircuitScreen: { circuitId: number };
};

// SCREENS
// - from Mainstack

export type HomeScreenProps = NativeStackScreenProps<
    MainStackParamList,
    "HomeScreen"
>;

// - from BottomTabStack

export type ServicesScreenProps = NativeStackScreenProps<
    BottomTabStackParamList,
    "ServicesScreen"
>;

export type ContactScreenProps = NativeStackScreenProps<
    BottomTabStackParamList,
    "ContactScreen"
>;

// - from CircuitsStack

export type CircuitsScreenProps = NativeStackScreenProps<
    CircuitsStackParamList,
    "CircuitsScreen"
>;

export type DetailedCircuitScreenProps = NativeStackScreenProps<
    CircuitsStackParamList,
    "DetailedCircuitScreen"
>;

// NAVIGATION

export type BottomTabStackNavigationProp = NativeStackNavigationProp<
    MainStackParamList,
    "BottomTabStack"
>;

export type DetailedCircuitScreenNavigationProp = NativeStackNavigationProp<
    CircuitsStackParamList,
    "DetailedCircuitScreen"
>;

// ROUTE
export type DetailedCircuitScreenRouteProp = RouteProp<
    CircuitsStackParamList,
    "DetailedCircuitScreen"
>;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends MainStackParamList {}
    }
}

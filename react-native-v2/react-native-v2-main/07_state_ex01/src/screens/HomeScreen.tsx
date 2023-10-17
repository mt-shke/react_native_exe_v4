import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { timeNow } from "../helper";
import { RoostackParamList } from "../navigation/Rootstack";

type IHomeScreenProps = NativeStackScreenProps<RoostackParamList, "HomeScreen">;

const HomeScreen: React.FC<IHomeScreenProps> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>HomeScreen</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                    navigation.navigate("ClockScreen", {
                        pressTime: timeNow(),
                    })
                }
            >
                <Text>Go to ClockScreen</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        padding: 20,
        backgroundColor: "orange",
    },
});

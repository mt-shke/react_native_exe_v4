import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { timeNow } from "../helper";
import { RoostackParamList } from "../navigation/Rootstack";

type IClockScreenProps = NativeStackScreenProps<
    RoostackParamList,
    "ClockScreen"
>;

const ClockScreen: React.FC<IClockScreenProps> = ({ navigation, route }) => {
    const [isMount, setIsMount] = useState(true);

    const setMount = () => {
        if (!isMount && route.params) {
            const { pressTime } = route.params;
            if (pressTime) {
                const now = timeNow();
                console.log(pressTime);
                console.log(now);
                const result = now - pressTime;
                console.log(result);
                if (result <= 100) {
                    setTimeout(() => {
                        setIsMount(true);
                    }, 100);
                }
            }
        }
    };
    setMount();

    const navigateHandler = () => {
        setIsMount(false);
        navigation.navigate("HomeScreen");
        return;
    };

    return (
        <View style={styles.container}>
            {isMount && <Cloc />}
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigateHandler()}
            >
                <Text>To Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ClockScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 180,
        backgroundColor: "lightblue",
        width: "100%",
    },
    text: {
        fontWeight: "bold",
        fontSize: 24,
        alignSelf: "center",
    },
    btn: {
        marginTop: 200,
        padding: 20,
        backgroundColor: "orange",
    },
});

const Cloc = (props) => {
    const [date, setDate] = useState<null | string>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate: string = new Date().toLocaleTimeString("fr-FR");
            setDate(newDate);
            console.log(newDate);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return <Text style={styles.text}>{`${date ?? ""}`}</Text>;
};

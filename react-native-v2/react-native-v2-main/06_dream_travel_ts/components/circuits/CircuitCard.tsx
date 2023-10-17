import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { colors, globalStyles } from "../../global";
import { ICircuitProps } from "../../interface";
import { DetailedCircuitScreenNavigationProp } from "../../types";

const CircuitCard: React.FC<ICircuitProps> = ({ circuit }) => {
    const imgUrl =
        "https://source.unsplash.com/random/900×700/?" + circuit.country;

    const navigation = useNavigation<DetailedCircuitScreenNavigationProp>();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate("DetailedCircuitScreen", {
                    circuitId: circuit.id - 1,
                })
            }
        >
            <View style={styles.container}>
                <Image source={{ uri: imgUrl }} style={styles.img} />

                <View style={styles.titleContainer}>
                    <Text
                        style={{
                            ...globalStyles.title,
                            ...styles.country,
                            fontFamily: "Raleway-SemiBold",
                        }}
                    >
                        {circuit.country}
                    </Text>
                    <LinearGradient
                        style={styles.overlay}
                        // where the gradient starts and ends
                        start={{ x: 0.05, y: 0 }}
                        end={{ x: 0.7, y: 0 }}
                        //    set the array of colors of the gradient
                        colors={[colors.black, "transparent"]}
                        // where each colors start
                        locations={[0, 1]}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CircuitCard;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 5 / 3,
        marginBottom: 50,
        flex: 1,
        elevation: 5,
        opacity: 1,
    },
    img: {
        height: "100%",
        width: "100%",
        resizeMode: "cover",
    },
    titleContainer: {
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
    },
    country: {
        padding: 8,
        zIndex: 2,
    },
});

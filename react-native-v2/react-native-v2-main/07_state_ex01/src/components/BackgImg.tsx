import { useRef } from "react";
import {
    View,
    Text,
    ImageBackground,
    Animated,
    SafeAreaView,
} from "react-native";

// Testing ImageBackground component
const BackImg: React.FC = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    };

    const imgUrl =
        "https://source.unsplash.com/random/900×700/?" + "grand canyon";
    return (
        <SafeAreaView style={styles.container}>
            <Animated.View>
                <View style={[styles.fadingContainer, { opacity: fadeAnim }]}>
                    <ImageBackground
                        source={{ uri: imgUrl }}
                        resizeMode="cover"
                        style={styles.image}
                    ></ImageBackground>
                    <Text style={styles.text}>BackImg</Text>
                </View>
            </Animated.View>
            <View style={styles.vi}></View>
        </SafeAreaView>
    );
};

export default BackImg;

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { flex: 1, width: "100%" },
    image: {
        height: "100%",
        position: "relative",
        backgroundColor: "blue",
        // resizeMode: "cover",
    },
    text: {
        fontSize: 60,
        backgroundColor: "transparent",
        fontWeight: "bold",
        bottom: 0,
        position: "absolute",
        color: "white",
        padding: 30,
    },
    fadingContainer: {
        padding: 20,
        backgroundColor: "green",
    },
    vi: {
        flex: 1,
    },
});

import { useFonts } from "expo-font";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./src/globals";
import Rootstack from "./src/navigation/Rootstack";

export default function App() {
    let [loaded] = useFonts({
        "grodbold-regular": require("./assets/fonts/grodbold-regular.ttf"),
        "just-buble-regular": require("./assets/fonts/just-buble-regular.ttf"),
        "like-eat-regular": require("./assets/fonts/like-eat-regular.ttf"),
        "Bangers-Regular": require("./assets/fonts/Bangers-Regular.ttf"),
        "lemon-friday-regular": require("./assets/fonts/lemon-friday-regular.ttf"),
    });

    if (!loaded) {
        return (
            <SafeAreaProvider style={styles.container}>
                <View style={styles.container}></View>
            </SafeAreaProvider>
        );
    }

    return (
        <SafeAreaProvider>
            {/* <SafeAreaView style={styles.container}> */}
            <Rootstack />
            {/* </SafeAreaView> */}
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});

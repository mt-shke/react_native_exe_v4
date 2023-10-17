import { StyleSheet, View, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./global/colors";
import useCustomFont from "./hooks/useCustomFonts";
import MainStack from "./navigation/MainStack";

export default function App() {
    let fontsLoaded = useCustomFont();
    if (!fontsLoaded) {
        return <View style={styles.container}></View>;
    }

    return (
        <SafeAreaProvider style={styles.container}>
            <MainStack />
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
    },
});

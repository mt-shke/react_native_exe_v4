import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./global/colors";
import MainStack from "./navigation/MainStack";

export default function App() {
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

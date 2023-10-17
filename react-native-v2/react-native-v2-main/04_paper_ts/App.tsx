import { StyleSheet } from "react-native";
import { Appbar, DefaultTheme, Provider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomNav from "./components/BottomNav";

export default function App() {
    return (
        <Provider theme={theme}>
            <SafeAreaProvider style={styles.container}>
                <Appbar.Header>
                    <Appbar.Content title="Title" />
                </Appbar.Header>
                <BottomNav />
            </SafeAreaProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: "#fff",
        accent: "black",
    },
};

import { StyleSheet } from "react-native";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import BottomNav from "./components/BottomTab";
import Header from "./components/Header";

export default function App() {
    return (
        <PaperProvider theme={theme}>
            <SafeAreaProvider style={styles.container}>
                <Header />
                <BottomNav />
            </SafeAreaProvider>
        </PaperProvider>
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
        primary: "#6f00f8",
        accent: "yellow",
    },
};

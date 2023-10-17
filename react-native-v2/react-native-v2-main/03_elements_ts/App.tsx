import { createTheme, Header, ThemeProvider } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider style={styles.container}>
                <Header containerStyle={styles.header}> </Header>
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    header: {
        backgroundColor: "white",
    },
    heading: {
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
});

const theme = createTheme({
    lightColors: {
        primary: "white",
    },
    darkColors: {
        primary: "black",
    },
});

import { StyleSheet } from "react-native";
import { ThemeProvider, createTheme } from "@rneui/themed";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CustomHeader from "./components/CustomHeader";
import CustomListItem from "./components/CustomListItem";
import CustomSearchBar from "./components/CustomSearchBar";
import { useState } from "react";

export default function App() {
    const [research, setResearch] = useState("");

    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider style={styles.container}>
                <CustomHeader />
                <CustomSearchBar setResearch={setResearch} />
                <CustomListItem research={research} />
            </SafeAreaProvider>
        </ThemeProvider>
    );
}

const theme = createTheme({
    lightColors: {
        primary: "white",
    },
    // darkColors: {
    //     primary: "grey",
    // },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
});

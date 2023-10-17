import { StyleSheet, Text, View } from "react-native";

export default function App() {
    const Name: string = "John";
    const Age: number = 30;

    const message: string = `Hello, my name is ${Name}, I am ${Age} years old.`;

    return (
        <View style={styles.container}>
            <Text>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

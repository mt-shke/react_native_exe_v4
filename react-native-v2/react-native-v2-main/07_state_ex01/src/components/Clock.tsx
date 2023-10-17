import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

const Clock: React.FC = ({}) => {
    const [date, setDate] = useState<null | string>(null);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const newDate: string = new Date().toLocaleTimeString("fr-FR");
            setDate(newDate);
            console.log(newDate);
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`${date ?? ""}`}</Text>
        </View>
    );
};

export default Clock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 180,
        backgroundColor: "lightblue",
        width: "100%",
    },
    text: {
        fontWeight: "bold",
        fontSize: 24,
        alignSelf: "center",
    },
});

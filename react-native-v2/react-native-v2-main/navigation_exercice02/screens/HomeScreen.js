import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.main}>
            <Text style={styles.title}>Bienvenue</Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Drawer")}
            >
                <Text>Portrait d'Ada Lovelace</Text>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 50,
    },
    title: {
        fontSize: 28,
        alignSelf: "center",
        marginVertical: 30,
    },
    btn: {
        padding: 10,
        backgroundColor: "grey",
        alignSelf: "center",
        borderRadius: 4,
    },
});

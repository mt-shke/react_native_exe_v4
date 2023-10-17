import { SafeAreaView, Text, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={{ marginTop: 50 }}>
            <Text style={{ alignSelf: "center", margin: 20 }}>HomeScreen</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Tab")}
                style={{
                    padding: 20,
                    alignSelf: "center",
                    backgroundColor: "lightblue",
                    borderRadius: 8,
                }}
            >
                <Text>Click to go to Tab</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default HomeScreen;

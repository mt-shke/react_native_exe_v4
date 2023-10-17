import {
    StyleSheet,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
// import imgPortrait from "../assets/portrait.jpg";

const AdaLovelaceScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.main}>
            <Image
                style={styles.img}
                source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Ada_Byron_daguerreotype_by_Antoine_Claudet_1843_or_1850_-_cropped.png/260px-Ada_Byron_daguerreotype_by_Antoine_Claudet_1843_or_1850_-_cropped.png",
                }}
            />
            <Text style={styles.text}>Ada LOVELACE</Text>

            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Accueil")}
            >
                <Text>Accueil</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default AdaLovelaceScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    img: {
        width: 300,
        height: 360,
        alignSelf: "center",
        margin: 50,
        resizeMode: "contain",
    },
    text: {
        alignSelf: "center",
        fontWeight: "bold",
        fontSize: 24,
    },
    btn: {
        alignSelf: "center",
        fontSize: 24,
        margin: 20,
        backgroundColor: "grey",
        padding: 12,
        borderRadius: 8,
    },
});

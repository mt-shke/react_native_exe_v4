import {
    View,
    Text,
    Image,
    StyleSheet,
    Pressable,
    ScrollView,
} from "react-native";
import { colors, globalStyles } from "../../../global";
import data from "../../../data.json";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const DetailedCircuit = ({ route }) => {
    const navigation = useNavigation();
    const { circuitId } = route.params;
    const circuit = data[0].circuits[circuitId];

    const imgUrl =
        "https://source.unsplash.com/random/900×700/?" + circuit.country;
    const imgUrlNature =
        "https://source.unsplash.com/random/900×700/?" +
        circuit.country +
        " nature";
    const ImgUrlMonument =
        "https://source.unsplash.com/random/900×700/?" +
        circuit.country +
        " monument";
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} style={styles.containerImg}>
                <Image source={{ uri: imgUrl }} style={styles.img} />
                <Image source={{ uri: imgUrlNature }} style={styles.img} />
                <Image source={{ uri: ImgUrlMonument }} style={styles.img} />
            </ScrollView>
            <Pressable
                style={styles.iconBackContainer}
                onPress={() => navigation.goBack()}
            >
                <AntDesign
                    name="leftcircle"
                    color={colors.black}
                    size={32}
                    style={styles.iconBack}
                />
            </Pressable>
            <View style={styles.dataContainer}>
                <View style={styles.titleContainer}>
                    <Text style={[globalStyles.title, styles.title]}>
                        {circuit.country}
                    </Text>
                    <View style={styles.containerPrice}>
                        <Text
                            style={styles.price}
                        >{`from ${circuit.price}€`}</Text>
                        <Text
                            style={styles.date}
                        >{`Departure date: ${circuit.date}`}</Text>
                    </View>
                </View>
                <Text style={globalStyles.paragraph}>
                    {circuit.description}
                </Text>
            </View>
        </View>
    );
};

export default DetailedCircuit;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
    },
    iconBackContainer: {
        position: "absolute",
        top: 30,
        left: 20,
    },
    iconBack: {
        backgroundColor: colors.white,
        borderRadius: 50,
    },
    containerImg: {
        height: 400,
        width: "100%",
        flexDirection: "row",
    },
    img: {
        height: 400,
        width: 500,
        resizeMode: "cover",
    },
    dataContainer: {
        paddingHorizontal: 14,
        marginBottom: 20,
    },
    titleContainer: {
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "flex-end",
        marginVertical: 40,
        marginHorizontal: 20,
    },
    containerPrice: {
        alignItems: "flex-end",
        justifyContent: "space-between",
    },
    price: {
        color: colors.white,
        fontWeight: "bold",
    },
    date: {
        color: colors.lightGrey,
    },
});

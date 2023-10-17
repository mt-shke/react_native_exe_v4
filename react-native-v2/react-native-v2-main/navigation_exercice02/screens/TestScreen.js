import { StyleSheet, Text, SafeAreaView, TouchableOpacity } from "react-native";

const TestScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim in
                maxime possimus libero tenetur consectetur, assumenda nihil quae
                sed iure, nobis sint architecto itaque fugiat provident quo
                voluptatem veritatis impedit. Nostrum autem, cum voluptatum
                assumenda sequi ab ratione, dolorem quod hic nihil, sit maiores
                deserunt! Eligendi perspiciatis corrupti provident molestiae ut!
                Corporis dicta suscipit possimus eos odio at eligendi provident?
                recusandae aspernatur deleniti fugiat! Minus exercitationem, sed
                perferendis quod obcaecati voluptates ab, officia quidem
                incidunt neque rem fuga accusantium soluta debitis accusamus
                recusandae amet fugit nulla illum adipisci. Iste labore et id
                dolores repellat.
            </Text>
            <TouchableOpacity
                style={styles.btn}
                onPress={() => navigation.navigate("Accueil")}
            >
                <Text>Accueil</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default TestScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    text: {
        alignSelf: "center",
        fontSize: 18,
        margin: 16,
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

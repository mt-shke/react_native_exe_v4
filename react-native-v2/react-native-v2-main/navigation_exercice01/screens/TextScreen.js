import { View, SafeAreaView, StyleSheet, Text, ScrollView } from "react-native";

const TextScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.main}>
            <ScrollView style={styles.screenContainer}>
                <Text style={styles.title}>Text screen </Text>
                <Text style={styles.paragraph}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore quisquam maxime, dolorum quasi sapiente doloribus
                    tempora voluptatum asperiores, velit sunt, dolorem sed.
                    Harum provident adipisci nam! Hic a optio doloremque?
                    Tempore hic exercitationem cumque debitis! Deleniti iure quo
                    quis velit eum culpa, inventore ipsa quos facilis, placeat
                    quibusdam voluptatum a in id labore saepe reiciendis sed!
                    Corporis at quas iusto? Obcaecati voluptatem enim labore
                    quas est quisquam, eius suscipit ullam animi delectus
                    dolorem pariatur magni ea dicta odit voluptates! Nesciunt
                    rem alias exercitationem in dolorem delectus qui porro rerum
                    similique? Nulla fuga magnam ducimus beatae. Neque at ipsa
                    eveniet, vel ea incidunt. Nostrum dicta minus totam sequi
                    quam? At animi unde sed perspiciatis fugiat neque qui
                    officia quo voluptas molestias! Odit error culpa dolorem
                    corporis obcaecati. Reprehenderit cumque dicta eos atque
                    deserunt obcaecati, velit, dolore deleniti earum, laudantium
                    rerum natus. Alias praesentium, natus nihil consequuntur
                    rerum incidunt voluptatibus quasi enim?
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default TextScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    screenContainer: {
        flex: 1,
        marginTop: 50,
    },
    title: {
        alignSelf: "center",
        margin: 20,
        fontSize: 20,
        fontWeight: "bold",
    },
    paragraph: {
        marginHorizontal: 20,
        fontSize: 18,
    },
});

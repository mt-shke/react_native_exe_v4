import { StyleSheet, Text, SafeAreaView } from "react-native";

const PersonnageScreen = (props) => {
    return (
        <SafeAreaView style={styles.main}>
            <Text style={styles.text}>
                Ada Lovelace, de son nom complet Augusta Ada King, comtesse de
                Lovelace, née Ada Byron le 10 décembre 1815 à Londres et morte
                le 27 novembre 1852 à Marylebone dans la même ville, est une
                pionnière de la science informatique.
            </Text>
        </SafeAreaView>
    );
};

export default PersonnageScreen;

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    text: {
        alignSelf: "center",
        fontSize: 18,
        margin: 16,
    },
});

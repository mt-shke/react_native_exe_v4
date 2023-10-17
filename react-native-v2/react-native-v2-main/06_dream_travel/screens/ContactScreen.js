import { useNavigation } from "@react-navigation/native";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import ContactHeader from "../components/contact/ContactHeader";
import ContactIds from "../components/contact/ContactIds";
import Form from "../components/contact/Form";
import { colors } from "../global/colors";
import { globalStyles } from "../global/globalStyles";

const ContactScreen = (props) => {
    const navigation = useNavigation();

    return (
        <ScrollView style={styles.container}>
            <ContactHeader />
            <Form />
            <ContactIds />
        </ScrollView>
    );
};

export default ContactScreen;

const styles = StyleSheet.create({
    container: { backgroundColor: colors.black, flex: 1 },
    img: {
        width: "100%",
    },
});

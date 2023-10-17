import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../global";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const ContactIds = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.contact}>
                <AntDesign name="calendar" color={colors.lightGrey} size={24} />
                <Text
                    style={styles.text}
                >{`Monday - Friday 8:30 a.m. - 5:30 p.m.\nor by appointment`}</Text>
            </View>
            <View style={styles.contact}>
                <MaterialCommunityIcons
                    name="phone"
                    color={colors.lightGrey}
                    size={24}
                />
                <Text style={styles.text}>{`1.630.927.2200`}</Text>
            </View>
            <View style={styles.contact}>
                <AntDesign name="mail" color={colors.lightGrey} size={24} />
                <Text
                    style={styles.text}
                >{`info@dreamtravelinternational.com`}</Text>
            </View>
            <View style={styles.contact}>
                <MaterialIcons
                    name="location-pin"
                    color={colors.lightGrey}
                    size={24}
                />
                <Text
                    style={styles.text}
                >{`Monday - Friday 8:30 a.m. - 5:30 p.m.\nor by appointment`}</Text>
            </View>
        </View>
    );
};

export default ContactIds;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 80,
    },
    contact: {
        paddingHorizontal: 30,
        flexDirection: "row",
        marginBottom: 50,
    },
    text: {
        color: colors.lightGrey,
        marginLeft: 20,
        fontSize: 16,
    },
});

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CustomButton from "../../../components/UI/CustomButton";
import { globalStyles } from "../../../globals";
import { RootstackParamList } from "../../../ts/types";

const Footer: React.FC = (props) => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootstackParamList, "HomeScreen">
        >();

    return (
        <View style={styles.container}>
            <Text style={styles.welcome} numberOfLines={1}>
                Welcome friend
            </Text>
            <View style={styles.containerBtn}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignInScreen")}
                >
                    <CustomButton textContent="Connection" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("SignUpStack")}
                >
                    <CustomButton color="white" textContent="Nous rejoindre!" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Footer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    containerBtn: {
        marginTop: 30,
        width: 280,
        alignSelf: "center",
    },
    welcome: {
        marginBottom: 50,
        fontFamily: globalStyles.fontBangers,
        fontSize: 32,
        letterSpacing: 8,
        alignSelf: "center",
    },
});

import { RouteProp, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { colors, globalStyles } from "../../globals";
import { RootstackParamList } from "../../ts/types";

const SuccessScreen: React.FC = ({}) => {
    const route = useRoute<RouteProp<RootstackParamList, "SuccessScreen">>();
    const { firstname, lastname, birthDate, civility, email } =
        route.params.formData;
    console.log(firstname, lastname, birthDate, civility, email);

    return (
        <View style={styles.container}>
            <CustomHeader image={require("../../../assets/img/hello.webp")} />

            <View style={styles.containerText}>
                <Text style={styles.text}>{`Welcome ${
                    civility + " " + firstname + " " + lastname
                }`}</Text>
                <Text
                    style={styles.text}
                >{`Your birth date is ${birthDate}`}</Text>
                <Text style={styles.text}>{`Your email is ${email}`}</Text>
            </View>
        </View>
    );
};

export default SuccessScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    bg: {
        flex: 1,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    containerText: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    text: {
        fontFamily: globalStyles.fontBangers,
        fontSize: globalStyles.fontSizeTitle,
        letterSpacing: 1,
        color: colors.orange,
    },
});

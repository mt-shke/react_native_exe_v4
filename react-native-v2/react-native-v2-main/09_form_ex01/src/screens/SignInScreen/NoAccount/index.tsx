import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors, globalStyles } from "../../../globals";
import { RootstackParamList } from "../../../ts/types";

const NoAccount: React.FC = (props) => {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootstackParamList, "SignInScreen">
        >();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Pas encore de compte? </Text>
            <Pressable onPress={() => navigation.navigate("SignUpStack")}>
                <Text style={[styles.text, styles.link]}>
                    Créer un nouveau compte
                </Text>
            </Pressable>
        </View>
    );
};

export default NoAccount;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
    },
    text: {
        fontFamily: globalStyles.fontBangers,
        fontSize: globalStyles.fontSize,
        letterSpacing: 0.7,
    },
    link: {
        color: colors.brown,
    },
});

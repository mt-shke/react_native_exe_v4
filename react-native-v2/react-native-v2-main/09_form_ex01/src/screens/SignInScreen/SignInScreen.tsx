import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { colors } from "../../globals";
import SignInForm from "./Form";
import NoAccount from "./NoAccount";

const SignInScreen: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/img/bg-yellow.jpg")}
                resizeMode="cover"
                style={styles.bgContainer}
            >
                <SignInForm />
                <NoAccount />
            </ImageBackground>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.background,
        backgroundColor: "grey",
        justifyContent: "flex-start",
    },
    bgContainer: {
        flex: 1,
        justifyContent: "center",
    },
});

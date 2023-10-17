import { View, Text, StyleSheet, ImageBackground } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../globals";
import SignUpForm from "./Form";

const SignUpScreen: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <CustomHeader image={require("../../../assets/img/cloud.webp")} />
            <SignUpForm />
        </View>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
});

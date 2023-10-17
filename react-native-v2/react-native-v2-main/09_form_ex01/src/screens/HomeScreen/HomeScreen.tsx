import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { colors } from "../../globals";
import Footer from "./Footer";
import Header from "./Header";

const HomeScreen: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../../../assets/img/bg-orange.jpg")}
                resizeMode="cover"
                style={styles.bg}
            >
                <Header />
                <Footer />
            </ImageBackground>
        </View>
    );
};

export default HomeScreen;

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
});

import { View, Image, StyleSheet } from "react-native";

const Header: React.FC = (props) => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../../../assets/img/logot2.png")}
                style={styles.logo}
            />
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-end",
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: "contain",
    },
});

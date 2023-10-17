import { Header, Icon, HeaderProps } from "@rneui/themed";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const CustomHeader = (props) => {
    return (
        <Header
            containerStyle={styles.containerStyle}
            leftComponent={{
                icon: "menu",
                color: "#fff",
            }}
            centerComponent={{
                text: "Apprenants de La Manu",
                style: styles.heading,
            }}
        />
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: "#152196",
        justifyContent: "flex-start",
        alignItems: "center",
        height: 110,
    },
    heading: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    subheaderText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
    paragraph: {
        color: colors.lightGrey,
        fontSize: 16,
        lineHeight: 30,
        marginBottom: 50,
        fontFamily: "Readex-Pro",
    },
    title: {
        color: colors.white,
        fontSize: 26,
        // fontWeight: "bold",
        fontFamily: "Playfair-Display",
    },
    bigTitle: {
        color: colors.white,
        fontSize: 32,
        // fontWeight: "bold",
        marginBottom: 70,
        fontFamily: "Playfair-Display-Bold",
    },
});

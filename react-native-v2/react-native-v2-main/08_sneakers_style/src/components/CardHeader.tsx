import { View, Text, StyleSheet } from "react-native";
import { IProductProps } from "../interfaces";

const CardHeader: React.FC<IProductProps> = ({ product }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{`${product.price}€`}</Text>
        </View>
    );
};

export default CardHeader;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: 10,
    },
    text: {
        alignSelf: "flex-end",
        fontWeight: "bold",
        fontSize: 18,
    },
});

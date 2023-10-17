import { View, StyleSheet } from "react-native";
import { colors } from "../globals";
import { IProductProps } from "../interfaces";
import CardBody from "./CardBody";
import CardFooter from "./CardFooter";
import CardHeader from "./CardHeader";

const Card: React.FC<IProductProps> = ({ product }) => {
    return (
        <View style={styles.container}>
            <CardHeader product={product} />
            <CardBody product={product} />
            <CardFooter product={product} />
        </View>
    );
};

export default Card;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        width: "48%",
        marginBottom: 14,
        aspectRatio: 3 / 5,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 6,
    },
});

import { View, Text, StyleSheet, Image } from "react-native";
import { IProductProps } from "../interfaces";

const CardBody: React.FC<IProductProps> = ({ product }) => {
    return (
        <View style={styles.container}>
            <Image source={product.photo} style={styles.img} />
            <View style={styles.containerText}>
                <Text
                    numberOfLines={1}
                    style={styles.title}
                >{`${product.title}`}</Text>
                <Text
                    style={styles.desc}
                    ellipsizeMode={"tail"}
                    numberOfLines={3}
                >{`${product.desc}`}</Text>
            </View>
        </View>
    );
};

export default CardBody;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "80%",
        overflow: "hidden",
    },
    containerText: {
        width: "100%",
        alignItems: "flex-start",
        paddingHorizontal: 4,
    },
    img: {
        resizeMode: "contain",
        width: "100%",
        height: "55%",
        // position: "relative",
        // left: -40
    },
    title: {
        fontSize: 14,
        fontWeight: "bold",
        marginBottom: 5,
    },
    desc: {
        fontSize: 14,
    },
});

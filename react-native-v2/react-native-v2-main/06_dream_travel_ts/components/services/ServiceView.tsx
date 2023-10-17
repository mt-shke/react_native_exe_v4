import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, Text, StyleSheet, Image, View } from "react-native";
import { colors } from "../../global/colors";
import { globalStyles } from "../../global/globalStyles";
import { IService } from "../../interface";

const ServiceView: React.FC<IService> = ({ name, img, content }) => {
    return (
        <ScrollView style={styles.container}>
            <Image source={img} style={styles.img} />
            <LinearGradient
                colors={["transparent", "transparent", colors.black]}
                start={{ x: 0.4, y: 0 }}
                end={{ x: 0.5, y: 0.95 }}
                locations={[0, 0.55, 1]}
                style={styles.overlay}
            />
            <View style={styles.containerText}>
                <Text style={globalStyles.bigTitle}>{`${name} Travel`}</Text>
                <Text style={globalStyles.paragraph}>{`${content}`}</Text>
            </View>
        </ScrollView>
    );
};

export default ServiceView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.black,
        position: "relative",
    },

    img: {
        position: "absolute",
        width: "100%",
        height: 620,
        top: 0,
        zIndex: 9,
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: 620,
        top: 0,
        zIndex: 10,
    },
    containerText: {
        paddingTop: 400,
        paddingBottom: 50,
        paddingHorizontal: 10,
        zIndex: 11,
    },
});

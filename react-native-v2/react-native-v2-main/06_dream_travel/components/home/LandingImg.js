import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Image } from "react-native";
import { colors } from "../../global/colors";

const LandingImg = (props) => {
    return (
        <>
            <Image
                source={require("../../assets/home.jpg")}
                PlaceholderContent={"cruise"}
                style={styles.img}
            />
            <LinearGradient
                colors={["transparent", "#18181836", "#181818D9", colors.black]}
                start={{ x: 0.4, y: 0.25 }}
                end={{ x: 0.5, y: 0.9 }}
                locations={[0, 0.65, 0.85, 1]}
                style={styles.overlay}
            />
        </>
    );
};

export default LandingImg;

const styles = StyleSheet.create({
    img: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 9,
        resizeMode: "cover",
    },
    overlay: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 10,
    },
});

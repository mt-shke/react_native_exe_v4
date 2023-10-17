import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, ImageBackground } from "react-native";
import { colors } from "../globals";

interface ICustomHeaderProps {
    image: any;
}

const CustomHeader: React.FC<ICustomHeaderProps> = ({ image }) => {
    return (
        <ImageBackground source={image} resizeMode="cover" style={styles.bg}>
            <LinearGradient
                style={styles.overlay}
                start={{ x: 0, y: 0.65 }}
                end={{ x: 0, y: 1 }}
                colors={[colors.transparent, colors.background]}
                locations={[0, 1]}
            />
        </ImageBackground>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    bg: {
        height: 300,
        width: "100%",
    },
    overlay: {
        height: "100%",
        width: "100%",
    },
});

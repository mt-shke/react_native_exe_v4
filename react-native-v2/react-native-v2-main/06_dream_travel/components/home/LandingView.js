import { View, StyleSheet } from "react-native";
import { screenHeight } from "../../global/helper";
import LandingImg from "./LandingImg";
import LandingTextContainer from "./LandingTextContainer";

const LandingView = ({ navigation, aboutRef }) => {
    return (
        <View style={styles.container}>
            <LandingImg />
            <LandingTextContainer navigation={navigation} aboutRef={aboutRef} />
        </View>
    );
};

export default LandingView;

const styles = StyleSheet.create({
    container: {
        height: screenHeight - 30,
        position: "relative",
    },
});

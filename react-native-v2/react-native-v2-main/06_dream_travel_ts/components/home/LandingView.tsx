import { View, StyleSheet } from "react-native";
import { screenHeight } from "../../global/helper";
import LandingImg from "./LandingImg";
import LandingTextContainer from "./LandingTextContainer";

const LandingView: React.FC = () => {
    return (
        <View style={styles.container}>
            <LandingImg />
            <LandingTextContainer />
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

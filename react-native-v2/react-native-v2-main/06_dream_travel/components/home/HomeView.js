import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import AboutUsContainer from "./AboutUsContainer";
import { useRef } from "react";
import LandingView from "./LandingView";

const HomeView = ({ navigation }) => {
    const aboutRef = useRef();

    return (
        <ScrollView style={styles.container}>
            <LandingView navigation={navigation} aboutRef={aboutRef} />
            <AboutUsContainer aboutRef={aboutRef} />
        </ScrollView>
    );
};

export default HomeView;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        position: "relative",
    },
});

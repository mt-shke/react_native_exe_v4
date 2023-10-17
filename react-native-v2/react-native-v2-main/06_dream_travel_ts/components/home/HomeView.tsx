import { ScrollView, StyleSheet } from "react-native";
import { colors } from "../../global/colors";
import { HomeScreenProps } from "../../types";
import AboutUsContainer from "./AboutUsContainer";
import LandingView from "./LandingView";

const HomeView: React.FC<HomeScreenProps> = ({ navigation, route }) => {
    const { navigate } = navigation;
    return (
        <ScrollView style={styles.container}>
            <LandingView />
            <AboutUsContainer />
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

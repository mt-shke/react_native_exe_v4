import { useNavigation } from "@react-navigation/native";
import { Icon } from "@rneui/themed";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../global/colors";
import { globalStyles } from "../../global/globalStyles";
import { BottomTabStackNavigationProp } from "../../types";

const LandingTextContainer: React.FC = () => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();

    return (
        <View style={styles.containerTextLanding}>
            <View style={styles.containerSlogan}>
                <Text
                    style={[globalStyles.title, styles.marginBottom]}
                >{`We do it all`}</Text>
                <Text style={[globalStyles.title]}>
                    {"If you can dream it,\nwe can do it!"}
                </Text>
            </View>

            {/* bottom container  */}
            <View style={styles.containerButtons}>
                {/* button start  */}
                <TouchableOpacity
                    style={[styles.buttonStart, styles.marginBottom]}
                    onPress={() => navigation.navigate("BottomTabStack")}
                >
                    <Text style={styles.start}>
                        {`Start Your Dream Travel`}
                    </Text>
                </TouchableOpacity>

                {/* button about us  */}
                <TouchableOpacity
                    // onPress={scrollToAbout}
                    style={{
                        height: 80,
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={[globalStyles.title, styles.aboutTitle]}
                    >{`About us`}</Text>
                    <Icon
                        name="arrow-drop-down"
                        color={colors.white}
                        size={32}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LandingTextContainer;

const styles = StyleSheet.create({
    containerTextLanding: {
        flex: 1,
        zIndex: 11,
        paddingVertical: 30,
        justifyContent: "space-between",
    },
    containerSlogan: {
        paddingTop: 90,
        paddingHorizontal: 20,
    },
    containerButtons: {
        justifyContent: "flex-end",
    },
    buttonStart: {
        backgroundColor: colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 40,
        marginVertical: 20,
        borderRadius: 20,
        alignSelf: "center",
    },
    start: {
        color: colors.white,
        fontSize: 22,
        fontFamily: "Playfair-Display",
    },
    marginBottom: {
        marginBottom: 50,
    },
    aboutTitle: {
        textAlign: "center",
        width: "100%",
        justifyContent: "center",
    },
});

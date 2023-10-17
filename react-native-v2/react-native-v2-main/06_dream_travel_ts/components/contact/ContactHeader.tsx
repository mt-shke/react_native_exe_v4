import { View, Text, Image, StyleSheet } from "react-native";
import { colors, globalStyles } from "../../global";

const ContactHeader: React.FC = () => {
    return (
        <>
            <View>
                <Image
                    style={styles.img}
                    source={require("../../assets/contact-island.jpg")}
                />
            </View>

            <View style={styles.headerContainer}>
                <Text
                    style={[globalStyles.title, styles.title]}
                >{`Let's Get You\nOn Your Way!`}</Text>
                <Text
                    style={styles.subTitle}
                >{`TELL US ABOUT YOUR DREAM VACATION\nAND WE CAN HELP YOU MAKE IT HAPPEN!
                `}</Text>
            </View>
        </>
    );
};

export default ContactHeader;

const styles = StyleSheet.create({
    img: {
        width: "100%",
    },
    headerContainer: {
        alignItems: "center",
        marginVertical: 50,
    },
    title: {
        marginBottom: 30,
    },
    subTitle: {
        color: colors.lightGrey,
        fontSize: 16,
    },
});

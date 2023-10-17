import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../global";

interface ICustomButtonProps {
    content: string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({ content }) => {
    return (
        <View style={styles.btn}>
            <Text style={styles.btnText}>{`${content}`}</Text>
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: colors.blue,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 14,
        alignSelf: "center",
    },
    btnText: {
        color: colors.white,
        fontSize: 20,
        fontWeight: "bold",
    },
});

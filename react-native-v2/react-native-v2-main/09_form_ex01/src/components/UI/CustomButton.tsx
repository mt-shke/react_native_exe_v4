import { ReactNode } from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../../globals";
import { globalStyles } from "../../globals/globalStyles";

interface ICustomButtonProps {
    color?: "white";
    children?: ReactNode | string;
    textContent: string;
}

const CustomButton: React.FC<ICustomButtonProps> = ({
    color,
    textContent,
    children,
}) => {
    if (color === "white") {
        return (
            <View
                style={{
                    ...styles.container,
                    backgroundColor: colors.background,
                }}
            >
                <Text style={{ ...styles.text, color: colors.black }}>
                    {textContent}
                </Text>
                {children}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{textContent}</Text>
            {children}
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: colors.orange,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 26,
        width: "100%",
        borderWidth: 2,
        borderColor: colors.black,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: colors.black,
        fontSize: globalStyles.fontSizeTitle,
        fontFamily: globalStyles.fontBangers,
        letterSpacing: 6,
        paddingHorizontal: 10,
    },
});

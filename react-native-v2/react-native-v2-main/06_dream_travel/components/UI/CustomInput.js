import { Input } from "@rneui/themed";
import { StyleSheet } from "react-native";
import { colors } from "../../global";

const CustomInput = ({ inputId, label, textarea }) => {
    return (
        <Input
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={{ ...styles.inputStyle, height: textarea ? 200 : 44 }}
            label={label}
            renderErrorMessage={false}
        />
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0,
        marginBottom: 10,
    },
    inputStyle: {
        paddingHorizontal: 14,
    },

    inputContainerStyle: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.bgGrey,
        backgroundColor: colors.black,
        borderBottomWidth: 1,
        marginVertical: 10,
        marginHorizontal: 6,
        zIndex: 10,
    },
});

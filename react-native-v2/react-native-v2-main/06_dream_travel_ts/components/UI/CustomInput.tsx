import { Input } from "@rneui/themed";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../global";
import { createRef } from "react";

interface ICustomInputProps {
    inputId: string;
    label?: string;
    textarea?: boolean;
}

const CustomInput: React.FC<ICustomInputProps> = ({
    inputId,
    label,
    textarea,
}) => {
    // const inputRef = createRef<TextInput>();

    if (textarea) {
        return (
            <View style={{ paddingHorizontal: 12, marginBottom: 20 }}>
                <Text
                    style={{
                        fontWeight: "bold",
                        color: "#86939e",
                        // color: colors.lightGrey,
                        fontSize: 16,
                    }}
                >
                    {label}
                </Text>
                <TextInput
                    style={{
                        ...styles.inputContainerStyle,
                        paddingHorizontal: 14,
                        borderRadius: 14,
                        fontSize: 18,
                    }}
                    multiline
                    numberOfLines={8}
                    // onChangeText={(text) => text}
                    // value={value}
                />
            </View>
        );
    }

    return (
        <Input
            // ref={inputRef}
            containerStyle={styles.container}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            label={label}
            renderErrorMessage={false}
            maxLength={40}
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
        color: colors.white,
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
        color: colors.white,
    },
});

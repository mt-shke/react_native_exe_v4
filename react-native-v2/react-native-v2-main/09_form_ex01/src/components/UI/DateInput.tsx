import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { colors, globalStyles } from "../../globals";
import { IData } from "../../ts/interfaces";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";

interface IDateInputProps {
    inputId: string;
    label: string;
    value: string;
    updateData: (val: IData) => void;
}

const DateInput: React.FC<IDateInputProps> = ({
    inputId,
    label,
    value,
    updateData,
}) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    useEffect(() => {
        if (value.length) {
            setInputValue(value);
        }
    }, []);

    // Set State
    const setValueHandler = (val: string) => {
        setInputValue(val);
        updateData({ [inputId]: val });
    };

    // Date Modal
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // On confirm date
    const handleConfirm = (date: Date) => {
        const dateFr = date.toLocaleDateString("fr-FR");
        setValueHandler(dateFr);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <Pressable onPress={showDatePicker}>
                <View style={styles.containerInput}>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={"tail"}
                        style={styles.input}
                    >
                        {inputValue}
                    </Text>
                    <View style={styles.containerDate}>
                        <Ionicons
                            name={"md-calendar-outline"}
                            color={colors.black}
                            size={globalStyles.fontSize}
                            style={styles.icon}
                        />
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                </View>
            </Pressable>
        </View>
    );
};

export default DateInput;

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    label: {
        fontSize: globalStyles.fontSize,
        marginBottom: 8,
        fontFamily: globalStyles.fontGrobold,
    },
    containerInput: {
        position: "relative",
    },
    input: {
        borderWidth: 2,
        borderColor: colors.black,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 12,
        fontFamily: globalStyles.fontBangers,
        letterSpacing: 1,
    },
    icon: {
        position: "absolute",
        right: 0,
        padding: 12,
    },
    containerDate: {
        position: "absolute",
        right: 0,
        padding: 10,
    },
});

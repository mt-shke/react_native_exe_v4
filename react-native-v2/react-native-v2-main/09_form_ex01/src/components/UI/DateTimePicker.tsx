import { useState } from "react";
import { View, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors, globalStyles } from "../../globals";

interface IDateTimePickerProps {
    setValue: (value: string) => void;
    onPressHandler: () => void;
}

const DateTimePicker: React.FC<IDateTimePickerProps> = ({ setValue }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: Date) => {
        // const options = {
        //     weekday: "long",
        //     year: "numeric",
        //     month: "long",
        //     day: "numeric",
        // };

        const dateFr = date.toLocaleDateString("fr-FR");
        // const dateFr = date.toLocaleDateString("fr-FR", options);
        // const dateFr = new Intl.DateTimeFormat("fr-FR", {
        //     month: "long",
        //     day: "numeric",
        // }).format(date);

        setValue(dateFr);
        hideDatePicker();
    };

    return (
        <View style={styles.containerDate}>
            <Ionicons
                onPress={showDatePicker}
                name={"md-calendar-outline"}
                color={colors.black}
                size={globalStyles.fontSize}
                // size={32}
                style={styles.icon}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
};

export default DateTimePicker;

const styles = StyleSheet.create({
    containerDate: {
        position: "absolute",
        right: 0,
        padding: 10,
    },
    label: {
        fontSize: globalStyles.fontSize,
        marginBottom: 8,
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
    },
    icon: {
        // right: 0,
        // padding: 12,
    },
});

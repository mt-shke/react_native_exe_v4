import { SearchBar } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { colors } from "../globals";

interface ISearchBarProps {
    setSearch: (value: string) => void;
}

const Searchbar: React.FC<ISearchBarProps> = ({ setSearch }) => {
    const [value, setValue] = useState<string>("");

    const searchHandler = (val: string) => {
        setValue(val);
        setSearch(val);
    };

    return (
        <SearchBar
            containerStyle={styles.containerSearch}
            inputContainerStyle={styles.inputContainerStyle}
            onChangeText={(v) => searchHandler(v)}
            value={value}
            inputStyle={styles.input}
            leftIconContainerStyle={styles.iconContainer}
            clearIcon={false}
            cancelIcon={false}
            placeholder="Rechercher"
        />
    );
};

export default Searchbar;

const styles = StyleSheet.create({
    containerSearch: {
        backgroundColor: colors.lightgrey,
        borderTopWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.grey,
        paddingHorizontal: 14,
        paddingBottom: 20,
    },
    inputContainerStyle: {
        backgroundColor: colors.lightgrey,
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRadius: 10,
        borderColor: colors.grey,
    },
    input: {
        color: colors.darkgrey,
    },
    iconContainer: {
        position: "absolute",
        right: 8,
    },
});

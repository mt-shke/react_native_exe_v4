import { Divider, SearchBar } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomSearchBar = ({ setResearch }) => {
    const [inputValue, setInputValue] = useState("");

    const searchHandler = (value) => {
        setInputValue(value);
        setResearch(value);
    };

    return (
        <SearchBar
            value={inputValue}
            onChangeText={searchHandler}
            placeholder={"John Doe"}
            containerStyle={styles.searchBar}
            inputContainerStyle={styles.inputContainerStyle}
            leftIconContainerStyle={styles.leftIconContainerStyle}
            searchIcon={SearchIcon}
            cancelIcon={false}
            clearIcon={false}
        />
    );
};

export default CustomSearchBar;

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: "#ffffff",
    },
    inputContainerStyle: {
        backgroundColor: "#e1e1e1",
        paddingRight: 50,
    },
    leftIconContainerStyle: {
        position: "absolute",
        right: 0,
    },
    containerSearchIcon: {
        flexDirection: "row",
        height: 40,
    },
    icon: {
        marginHorizontal: 10,
        alignSelf: "center",
    },
});

const SearchIcon = (props) => {
    return (
        <View style={styles.containerSearchIcon}>
            <Divider color="black" orientation="vertical" width={1} />
            <Ionicons
                style={styles.icon}
                name={"search"}
                size={24}
                color={"black"}
            />
        </View>
    );
};

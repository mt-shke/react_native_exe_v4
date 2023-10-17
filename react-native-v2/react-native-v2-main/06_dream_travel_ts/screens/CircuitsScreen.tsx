import { StyleSheet, ScrollView } from "react-native";
import { colors, randomArray } from "../global";
import CircuitCard from "../components/circuits/CircuitCard";
import { SearchBar } from "@rneui/themed";
import { ICircuit } from "../interface";
import { data } from "../data";
import { useState } from "react";

const CircuitsScreen: React.FC = (props) => {
    const [value, setValue] = useState<string>("");
    const circuitsData: ICircuit[] = data.circuits;
    const newEntries: number[] = randomArray();
    const filteredData: ICircuit[] = circuitsData.filter(
        (circuit) =>
            value.trim() !== "" &&
            circuit.country.toLowerCase().includes(value.toLowerCase().trim())
    );

    return (
        <ScrollView style={styles.container}>
            <SearchBar
                containerStyle={styles.containerSearchBar}
                inputContainerStyle={styles.inputContainerStyle}
                inputStyle={styles.inputStyle}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                placeholder="Destination"
                clearIcon={false}
                value={value}
                onChangeText={(val) => setValue(val)}
            />
            {!value &&
                newEntries.map((entry, index) => (
                    <CircuitCard
                        key={`${circuitsData[entry].country}${index}`}
                        circuit={circuitsData[entry]}
                    />
                ))}
            {filteredData &&
                filteredData.map((circuit, index) => (
                    <CircuitCard
                        key={`${circuit.country}${index}`}
                        circuit={circuit}
                    />
                ))}
        </ScrollView>
    );
};

export default CircuitsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        borderWidth: 0,
    },
    containerSearchBar: {
        backgroundColor: colors.black,
        marginBottom: 6,
        borderTopColor: "transparent",
        borderBottomWidth: 0,
    },
    inputStyle: {
        paddingHorizontal: 14,
    },
    leftIconContainerStyle: {
        position: "absolute",
        right: 12,
    },
    inputContainerStyle: {
        borderRadius: 14,
        borderWidth: 1,
        borderColor: colors.bgGrey,
        backgroundColor: colors.black,
        borderBottomWidth: 1,
        marginVertical: 10,
        zIndex: 10,
    },
});

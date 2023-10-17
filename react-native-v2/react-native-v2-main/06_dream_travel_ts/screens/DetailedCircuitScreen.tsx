// export type

import { ScrollView, StyleSheet } from "react-native";
import DetailedCircuit from "../components/circuits/detailedCircuit/DetailedCircuit";
import { colors } from "../global";

const DetailedCircuitScreen: React.FC = () => {
    return (
        <ScrollView style={styles.container}>
            <DetailedCircuit />
        </ScrollView>
    );
};

export default DetailedCircuitScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.black,
        borderWidth: 0,
    },
});

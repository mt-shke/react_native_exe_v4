import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, ScrollView } from "react-native";
import { colors, randomArray } from "../global";
import CircuitCard from "../components/circuits/CircuitCard";
import DetailedCircuit from "../components/circuits/detailedCircuit/DetailedCircuit";
import { SearchBar } from "@rneui/themed";
import { useState } from "react";
const data = require("../data.json");
// import data from "../data.json";

const Stack = createNativeStackNavigator();

const CircuitsScreenStack = () => {
   return (
      <Stack.Navigator
         initialRouteName="circuits"
         screenOptions={{ headerShown: false }}
      >
         <Stack.Screen name="circuits" component={CircuitsScreen} />
         <Stack.Screen
            name="detailed-circuit"
            component={DetailedCircuitScreen}
         />
      </Stack.Navigator>
   );
};

export default CircuitsScreenStack;

const CircuitsScreen = (props) => {
   const [value, setValue] = useState("");
   const circuitsData = data[0].circuits;
   const newEntries = randomArray();
   const filteredData = circuitsData.filter(
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

const DetailedCircuitScreen = ({ route }) => {
   return (
      <ScrollView style={styles.container}>
         <DetailedCircuit route={route} />
      </ScrollView>
   );
};

const styles = StyleSheet.create({
   container: {
      backgroundColor: colors.black,
      borderWidth: 0,
   },
   containerSearchBar: {
      backgroundColor: colors.black,
      marginBottom: 6,
      borderTopColor: "transparent",
   },
   inputStyle: {
      paddingHorizontal: 14,
   },
   leftIconContainerStyle: {
      position: "absolute",
      right: 12,
   },
   inputContainerStyle: {
      borderRadius: 20,
      borderWidth: 1,
      borderColor: colors.bgGrey,
      backgroundColor: colors.black,
      borderBottomWidth: 1,
      marginVertical: 10,
      zIndex: 10,
   },
});

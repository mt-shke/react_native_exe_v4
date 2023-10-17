import { Dimensions } from "react-native";

export const screenHeight: number = Math.floor(Dimensions.get("screen").height);
export const randomNumber: () => number = () => Math.floor(Math.random() * 39);

export const randomArray: () => number[] = () => {
    let uniqueEntries: number[] = [];
    while (uniqueEntries.length <= 10) {
        const newNumber = randomNumber();
        uniqueEntries = Array.from(new Set([...uniqueEntries, newNumber]));
    }
    return uniqueEntries;
};

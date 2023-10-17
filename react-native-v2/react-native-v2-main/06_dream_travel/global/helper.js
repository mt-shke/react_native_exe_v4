import { Dimensions } from "react-native";

export const screenHeight = Math.floor(Dimensions.get("screen").height);
export const randomNumber = () => Math.floor(Math.random() * 39);

export const randomArray = () => {
    let unique = [];
    while (unique.length <= 15) {
        let newNumber = randomNumber();
        unique = [...unique, newNumber];
    }
    return unique;
};

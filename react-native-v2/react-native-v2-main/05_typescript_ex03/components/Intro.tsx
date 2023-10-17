import React from "react";
import { View, Text } from "react-native";

export type Props = {
    title: string;
    text: string;
};

const Intro: React.FC<Props> = ({ title, text }) => {
    return (
        <View>
            <Text>{title}</Text>
            <Text>{text}</Text>
        </View>
    );
};

export default Intro;

import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../globals";

interface ILikeBtnProps {
    likes?: number | undefined;
}

const LikeBtn: React.FC<ILikeBtnProps> = ({ likes }) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    let numOfLikes: number = 0;

    if (likes) {
        numOfLikes = isLiked ? likes + 1 : likes;
    }
    if (!likes && isLiked) {
        numOfLikes = 1;
    }

    return (
        <TouchableOpacity onPress={() => setIsLiked((p) => !p)}>
            <View>
                <Text>
                    {`${numOfLikes ? numOfLikes : ""} `}
                    <AntDesign
                        name={isLiked ? "heart" : "hearto"}
                        color={colors.blue}
                        size={12}
                    />
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default LikeBtn;

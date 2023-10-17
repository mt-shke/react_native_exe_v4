import { ListItem, Avatar } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { list } from "../data";

const CustomListItem = ({ research }) => {
    // const [filteredList, setFilteredList] = useState("");
    let filteredList = [];
    if (research) {
        filteredList = list.filter(
            (elem) =>
                elem.firstName.toLowerCase().includes(research.toLowerCase()) ||
                elem.lastName.toLowerCase().includes(research.toLowerCase())
        );
        // setFilteredList(newList);
    }

    return (
        <ScrollView>
            {!research &&
                list.map((item, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar
                            source={{ uri: getRandomPic() }}
                            avatarStyle={styles.avatar}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.firstName} {item.lastName}
                            </ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitle}>
                                {item.promo}
                            </ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron size={34} />
                    </ListItem>
                ))}

            {filteredList &&
                filteredList.map((item, i) => (
                    <ListItem key={i} bottomDivider>
                        <Avatar
                            source={{ uri: getRandomPic() }}
                            avatarStyle={styles.avatar}
                        />
                        <ListItem.Content>
                            <ListItem.Title>
                                {item.firstName} {item.lastName}
                            </ListItem.Title>
                            <ListItem.Subtitle>{item.promo}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron size={34} />
                    </ListItem>
                ))}
        </ScrollView>
    );
};

export default CustomListItem;

const styles = StyleSheet.create({
    avatar: {
        borderRadius: 50,
    },
    subtitle: {
        color: "#a7a7a7",
    },
});

const getRandomPic = () => {
    return (
        "https://picsum.photos/" +
        Math.floor(Math.random() * 200 + 1).toString()
    );
};

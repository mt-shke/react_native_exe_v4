import { StyleSheet } from "react-native";
import { Appbar, Avatar } from "react-native-paper";

const Header = (props) => {
    return (
        <Appbar.Header>
            <Appbar.Content title="Activity Tracker" />
            <Avatar.Image
                style={styles.avatar}
                size={36}
                source={{
                    uri: `https://i.pravatar.cc/150?img=${Math.ceil(
                        Math.random() * 70
                    )}`,
                }}
            />
        </Appbar.Header>
    );
};

export default Header;

const styles = StyleSheet.create({
    avatar: {
        marginRight: 14,
    },
});

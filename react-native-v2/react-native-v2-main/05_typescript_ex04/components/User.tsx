import { StyleSheet, Text, View } from "react-native";
import { IUser } from "../interfaces";

const User: React.FC<IUser> = ({ user }) => {
    return (
        <View style={styles.user}>
            <Text style={styles.text}>Username: {user.username}</Text>
            <Text style={styles.text}>Phone: {user.phone}</Text>
            <Text style={styles.text}>Mail: {user.mail}</Text>
            <Text style={styles.text}>Age: {user.age}</Text>
            <Text style={styles.text}>
                Is Logged: {user.isLogged ? "true" : "false"}
            </Text>
            <Text style={styles.text}>
                Is Admin:
                {user.isAdmin === undefined
                    ? "undefined"
                    : user.isAdmin
                    ? "true"
                    : "false"}
            </Text>
        </View>
    );
};

export default User;

const styles = StyleSheet.create({
    user: {
        alignSelf: "center",
        width: "90%",
        marginBottom: 50,
        flex: 1,
    },
    text: {
        flex: 1,
        marginBottom: 2,
        fontSize: 18,
    },
});

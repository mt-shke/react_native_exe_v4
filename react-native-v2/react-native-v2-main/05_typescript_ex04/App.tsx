import { StyleSheet, Text, View } from "react-native";
import User from "./components/User";
import { IUserData } from "./interfaces";

export default function App() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            {allUsers.map((elem, index) => (
                <User key={index} user={elem} />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 50,
    },
});

const allUsers: IUserData[] = [
    {
        username: "John",
        phone: "0123456",
        mail: "johndoe@gmail.com",
        age: 52,
        isLogged: false,
        isAdmin: true,
    },
    {
        username: "Roberto",
        phone: "6541332",
        mail: "robertolarcos@gmail.com",
        age: 46,
        isLogged: true,
        isAdmin: false,
    },
    {
        username: "Jane",
        phone: "9874652",
        mail: "janedoe@gmail.com",
        age: 28,
        isLogged: true,
        isAdmin: undefined,
    },
];
